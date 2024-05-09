import fetch, { RequestInit } from "node-fetch";
import { EventEmitter } from "node:events";
import * as http from "node:http";
import * as https from "node:https";
import { URL } from "node:url";
import { Api } from "./Api.js";
import { Application } from "./Application.js";

export const SUPPORTED_QBIT_API_VERSION = "2.9.3";

export class QBittorrent extends EventEmitter {
    public application;
    public api;
    /** @private */
    public destroyed = false;
    private user?: string;
    private password?: string;
    private host;
    private agent;
    private defer?: Promise<void>;
    private session = "";

    /**
     * Create a new qBittorrent client
     * @param host qBittorrent host
     * @param insecure if to allow self signed certs
     */
    public constructor(host: string, insecure = false) {
        super();

        const parsedHost = new URL(host);
        if (!["http:", "https:"].includes(parsedHost.protocol))
            throw new Error(`Invalid protocol "${parsedHost.protocol}"!`);
        this.host = parsedHost.href;

        this.agent =
            parsedHost.protocol === "http:"
                ? new http.Agent()
                : new https.Agent({ rejectUnauthorized: !insecure });

        this.api = new Api(this);
        this.application = new Application(this);

        // TODO: main sync loop and events
        // TODO: intents for which intervals to do (main, peer block, torrent peers, log)
        // TODO: torrents, rss and settings managers
        // TODO: format responses
        // TODO: maintain a cache with sync loop
        // TODO: abstract objects for things
    }

    /**
     * Function to run before any action.
     * Checks if the client is destroyed
     * or not logged in yet
     * @private
     */
    public async checkLogin() {
        if (this.destroyed) throw new Error("Client destroyed.");
        await this.defer;
        if (!this.session || !this.user || !this.password) throw new Error("Not logged in");
    }

    /**
     * Wrapper for node-fetch
     * Adds session cookies, base path and http agent
     * @private
     * @param url api url to fetch
     * @param opts fetch options
     * @param retryOnForbidden if to retry on 403
     */
    public async fetch(url: string, opts?: RequestInit, retryOnForbidden = true) {
        const tries = 2;
        for (let i = 1; i <= tries; i++) {
            const res = await fetch(`${this.host}api/v2/${url}`, {
                ...opts,
                headers: {
                    ...opts?.headers,
                    Cookie: this.session,
                    Referrer: this.host,
                },
                agent: this.agent,
            });
            if (retryOnForbidden && res.status === 403) {
                if (i === tries) throw new Error("Invalid credentials");
                if (!this.session || !this.user || !this.password) throw new Error("Not logged in");
                this.defer = this.sessionLogin(this.user, this.password);
                await this.defer;
                continue;
            }
            return res;
        }
        throw new Error("unreachable code");
    }

    /**
     * Log out and destroy the client
     */
    public async logout() {
        this.destroyed = true;
        await this.api.logout();
    }

    /**
     * Login to qBittorrent
     */
    public async login(username: string, password: string) {
        if (this.destroyed) throw new Error("Client destroyed.");
        this.defer = this.sessionLogin(username, password);
        this.user = username;
        this.password = password;
        await this.defer;
        const apiVersion = await this.api.getApiVersion();
        if (apiVersion !== SUPPORTED_QBIT_API_VERSION) {
            process.emitWarning(`Unsupported API version ${apiVersion}`);
        }
    }

    private async sessionLogin(username: string, password: string) {
        const session = await this.api.login(username, password);
        this.session = session;
    }
}
