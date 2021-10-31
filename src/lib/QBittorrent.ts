import EventEmitter from "events";
import http from "http";
import https from "https";
import fetch, { RequestInit } from "node-fetch";
import { URL } from "node:url";
import { Application } from "./Application.js";

export interface ClientOptions {
    host: string;
    user: string;
    password: string;
    insecure: boolean;
}

export interface TransferInfo {
    status: "connected" | "firewalled" | "disconnected";
    dht: number;
    download: {
        session: number;
        speed: number;
        limit: number;
    };
    upload: {
        session: number;
        speed: number;
        limit: number;
    };
}

interface RawTransferInfo {
    connection_status: "connected" | "firewalled" | "disconnected";
    dht_nodes: number;
    dl_info_data: number;
    dl_info_speed: number;
    dl_rate_limit: number;
    up_info_data: number;
    up_info_speed: number;
    up_rate_limit: number;
}

export class QBittorrent extends EventEmitter {
    public application;
    public destroyed = false;
    private user;
    private password;
    private host;
    private agent;
    private defer;
    private session = "";
    private exp = 0;

    public constructor(
        options: ClientOptions = {
            host: "http://localhost:8080",
            user: "admin",
            password: "adminadmin",
            insecure: false,
        }
    ) {
        super();

        const parsedHost = new URL(options.host);
        if (!["http:", "https:"].includes(parsedHost.protocol))
            throw new Error(`Invalid protocol "${parsedHost.protocol}"!`);
        this.host = parsedHost.href;

        this.agent =
            parsedHost.protocol === "http:"
                ? new http.Agent()
                : new https.Agent({ rejectUnauthorized: !options.insecure });

        this.defer = this.login(options.user, options.password);
        this.user = options.user;
        this.password = options.password;
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
     */
    public async checkLogin() {
        if (this.destroyed) throw new Error("Client destroyed.");
        await this.defer;
        if (Date.now() > this.exp) {
            this.defer = this.login(this.user, this.password);
            await this.defer;
        }
    }

    /**
     * Wrapper for node-fetch
     * Adds session cookies, base path and http agent
     * @param url api url to fetch
     * @param opts fetch options
     */
    public async fetch(url: string, opts?: RequestInit) {
        const res = await fetch(`${this.host}api/v2${url}`, {
            ...opts,
            headers: {
                ...opts?.headers,
                Cookie: this.session,
                Referrer: this.host,
            },
            agent: this.agent,
        });
        if (!res.ok) throw new Error(`Unexpected status "${res.status}"`);
        return res;
    }

    /**
     * Log out and destroy the client
     */
    public async logout() {
        await this.checkLogin();
        this.destroyed = true;
        await this.fetch("/auth/logout");
    }

    /**
     * Get qBittorrent transfer info
     */
    public async getTransferInfo(): Promise<TransferInfo> {
        await this.checkLogin();
        const data = (await (await this.fetch("/transfer/info")).json()) as RawTransferInfo;
        return {
            status: data.connection_status,
            dht: data.dht_nodes,
            download: {
                session: data.dl_info_data,
                speed: data.dl_info_speed,
                limit: data.dl_rate_limit ? data.dl_rate_limit : Infinity,
            },
            upload: {
                session: data.up_info_data,
                speed: data.up_info_speed,
                limit: data.up_rate_limit ? data.up_rate_limit : Infinity,
            },
        };
    }

    /**
     * Refresh the session
     * @param user qBittorrent username
     * @param pass qBittorrent password
     */
    private async login(user: string, pass: string) {
        this.session = "";
        this.exp = 0;
        const res = await this.fetch("/auth/login", {
            method: "POST",
            body: `username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const session = res.headers.get("set-cookie")?.split(";")?.[0];
        if (!session) {
            throw new Error("Invalid credentials");
        }
        this.session = session;
        this.exp = Date.now() + 55 * 60 * 1000;
    }
}
