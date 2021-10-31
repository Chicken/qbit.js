import type { QBittorrent } from "./QBittorrent";

export interface BuildInfo {
    bitness: number;
    boost: string;
    libtorrent: string;
    openssl: string;
    qt: string;
    zlib: string;
}

export class Application {
    /**
     * Create a qBittorrent application manager
     */
    public constructor(public qbit: QBittorrent) {}

    /**
     * Shutdown the qBittorrent instance and destroy the client.
     */
    public async shutdown() {
        await this.qbit.checkLogin();
        this.qbit.destroyed = true;
        await this.qbit.fetch("/app/shutdown");
    }

    /**
     * Get the version
     * @returns qBittorrent version
     */
    public async getVersion() {
        await this.qbit.checkLogin();
        return (await this.qbit.fetch("/app/version")).text();
    }

    /**
     * Get the api version
     * @returns qBittorrent api version
     */
    public async getApiVersion() {
        await this.qbit.checkLogin();
        return (await this.qbit.fetch("/app/webapiVersion")).text();
    }

    /**
     * Get qBittorrent build info
     * @returns qBittorrent build info
     */
    public async getBuildInfo() {
        await this.qbit.checkLogin();
        return (await this.qbit.fetch("/app/buildInfo")).json() as Promise<BuildInfo>;
    }
}
