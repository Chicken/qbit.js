import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import { URL } from "node:url";
import { Agent, fetch, type RequestInit } from "undici";
import { Api, type RawLogEntry, type RawMainData } from "./Api.js";
import { Application } from "./Application.js";
import { semVerCompatible, semver } from "./Util.js";
import { type Values } from "./typeHelpers.js";

export const SUPPORTED_QBIT_API_VERSION = semver("2.15.1");

export const Intent = {
    Main: "main",
    NormalLog: "normallog",
    InfoLog: "infolog",
    WarningLog: "warninglog",
    CriticalLog: "criticallog",
} as const;
export type Intent = Values<typeof Intent>;

export type QBittorrentOptions = {
    host: string;
    apiKey: string;
    intents?: Intent[];
    /** default 1000 ms */
    updateInterval?: number;
    /** default false, accept invalid ssl/tls certificates */
    insecure?: boolean;
};

export const QBittorrentEvents = {
    MainData: "maindata",
    Log: "log",
    Error: "error",
} as const;

type QBittorrentEventDefinition = {
    [QBittorrentEvents.MainData]: [RawMainData];
    [QBittorrentEvents.Log]: [RawLogEntry];
    [QBittorrentEvents.Error]: [Error];
};

/** Thrown when the server responds with 404 and body "Endpoint does not exist". */
export class EndpointNotFoundError extends Error {
    public constructor(endpoint: string) {
        super(`Endpoint does not exist: ${endpoint}`);
        this.name = "EndpointNotFoundError";
    }
}

export class QBittorrent extends AsyncEventEmitter<QBittorrentEventDefinition> {
    public application;
    public api;
    /** @private */
    public destroyed = false;
    private apiKey;
    private host;
    private intents: Intent[];
    private updateInterval: number;
    private agent;

    private lastMainDataId = 0;
    private lastLogId = 0;

    public constructor(options: QBittorrentOptions) {
        super();

        const parsedHost = new URL(options.host);
        if (!["http:", "https:"].includes(parsedHost.protocol))
            throw new Error(`Invalid protocol "${parsedHost.protocol}"!`);
        this.host = parsedHost.href;
        this.apiKey = options.apiKey;
        this.intents = options.intents ?? [];
        this.updateInterval = options.updateInterval ?? 1000;

        this.agent = new Agent({
            connect: { rejectUnauthorized: !options.insecure },
        });

        this.api = new Api(this);
        this.application = new Application(this);

        // TODO: main sync loop and events
        // TODO: intents for which intervals to do (main, peer block, torrent peers, log)
        // TODO: torrents, rss and settings managers
        // TODO: format responses
        // TODO: maintain a cache with sync loop
        // TODO: abstract objects for things
    }

    /** @private */
    public checkAlive() {
        if (this.destroyed) throw new Error("Client destroyed.");
    }

    /**
     * Wrapper for fetch. Adds Bearer auth header, base path and dispatcher.
     * Throws EndpointNotFoundError when the server responds with the
     * "Endpoint does not exist" 404 body so callers can distinguish from
     * resource-not-found 404s.
     * @private
     */
    public async fetch(url: string, opts?: RequestInit) {
        this.checkAlive();
        const res = await fetch(`${this.host}api/v2/${url}`, {
            ...opts,
            headers: {
                ...opts?.headers,
                Authorization: `Bearer ${this.apiKey}`,
                Referrer: this.host,
            },
            dispatcher: this.agent,
        });
        if (res.status === 404) {
            const body = await res.clone().text();
            if (body === "Endpoint does not exist") {
                throw new EndpointNotFoundError(url);
            }
        }
        return res;
    }

    /**
     * Start sync loops if intents were configured, and warn if the server
     * speaks an older API version than what this library targets.
     */
    public async start() {
        this.checkAlive();
        const apiVersion = await this.api.getApiVersion();
        if (!semVerCompatible(SUPPORTED_QBIT_API_VERSION, semver(apiVersion))) {
            process.emitWarning(`Unsupported API version ${apiVersion}`);
        }

        if (this.intents.includes(Intent.Main)) {
            setInterval(this.catchSyncError(this.mainSync.bind(this)), this.updateInterval);
        }
        if (
            [Intent.NormalLog, Intent.InfoLog, Intent.WarningLog, Intent.CriticalLog].some((i) =>
                this.intents.includes(i)
            )
        ) {
            setInterval(this.catchSyncError(this.logSync.bind(this)), this.updateInterval);
        }
    }

    /** Destroy the client. */
    public destroy() {
        this.destroyed = true;
    }

    private catchSyncError(syncFunc: () => Promise<void>) {
        return async () => {
            try {
                await syncFunc();
            } catch (e) {
                this.emit(
                    QBittorrentEvents.Error,
                    e instanceof Error ? e : new Error(`Unknown error: ${String(e)}`)
                );
            }
        };
    }

    private async mainSync() {
        const mainData = await this.api.getMainData(this.lastMainDataId);
        this.lastMainDataId = mainData.rid;
        this.emit(QBittorrentEvents.MainData, mainData);
    }

    private async logSync() {
        const logs = await this.api.getLog({
            normal: this.intents.includes(Intent.NormalLog),
            info: this.intents.includes(Intent.InfoLog),
            warning: this.intents.includes(Intent.WarningLog),
            critical: this.intents.includes(Intent.CriticalLog),
            last_known_id: this.lastLogId,
        });
        if (this.lastLogId !== 0) {
            logs.forEach((log) => this.emit(QBittorrentEvents.Log, log));
        }
        this.lastLogId = logs.at(-1)?.id ?? 0;
    }
}
