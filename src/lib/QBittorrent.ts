import EventEmitter from "node:events";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";
import fetch, { RequestInit } from "node-fetch";
import { Api } from "./Api.js";
import { Application } from "./Application.js";

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
    private exp = 0;

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
        // TODO: torrents, rss and settings managers
        // TODO: format responses
        // TODO: maintain a cache with sync loop
        // TODO: abstract objects for things
    }

    /**
     * Function to run before any action.
     * Checks if the client is destroyed,
     * not logged in yet or session expired
     * and logs automaticly back in if is.
     * @private
     */
    public async checkLogin() {
        if (this.destroyed) throw new Error("Client destroyed.");
        await this.defer;
        if (!this.session || !this.user || !this.password) throw new Error("Not logged in");
        if (Date.now() > this.exp) {
            this.defer = this.sessionLogin(this.user, this.password);
            await this.defer;
        }
    }

    /**
     * Wrapper for node-fetch
     * Adds session cookies, base path and http agent
     * @private
     * @param url api url to fetch
     * @param opts fetch options
     */
    public async fetch(url: string, opts?: RequestInit) {
        const res = await fetch(`${this.host}api/v2/${url}`, {
            ...opts,
            headers: {
                ...opts?.headers,
                Cookie: this.session,
                Referrer: this.host,
            },
            agent: this.agent,
        });
        return res;
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
        this.defer = this.sessionLogin(username, password);
        this.user = username;
        this.password = password;
        await this.defer;
    }

    private async sessionLogin(username: string, password: string) {
        const session = await this.api.login(username, password);
        this.session = session;
        this.exp = Date.now() + 55 * 60 * 1000;
    }
}
