import type { RawBuildInfo } from "./Api";
import type { QBittorrent } from "./QBittorrent";

export interface BuildInfo extends RawBuildInfo {}

export class Application {
    /**
     * Create a qBittorrent application manager
     */
    public constructor(public qbit: QBittorrent) {}

    /**
     * Shutdown the qBittorrent instance and destroy the client.
     */
    public async shutdown() {
        await this.qbit.api.shutdown();
        this.qbit.destroyed = true;
    }

    /**
     * Get the version
     * @returns qBittorrent version
     */
    public async getVersion() {
        return this.qbit.api.getApplicationVersion();
    }

    /**
     * Get the api version
     * @returns qBittorrent api version
     */
    public async getApiVersion() {
        return this.qbit.api.getApiVersion();
    }

    /**
     * Get qBittorrent build info
     * @returns qBittorrent build info
     */
    public async getBuildInfo() {
        return this.qbit.api.getBuildInfo() as Promise<BuildInfo>;
    }
}
