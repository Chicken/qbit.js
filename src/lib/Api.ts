import { stat } from "fs/promises";
import { fileFrom, FormData } from "node-fetch";
import type { QBittorrent } from "./QBittorrent";

export interface RawBuildInfo {
    bitness: number;
    boost: string;
    libtorrent: string;
    openssl: string;
    qt: string;
    zlib: string;
}

export enum RawScanDirTarget {
    monitoredFolder = 0,
    defaultSavePath = 1,
}

export enum RawMaxRatioAction {
    pause = 0,
    remove = 1,
}

export enum RawBittorrentProtocol {
    both = 0,
    TCP = 1,
    uTP = 2,
}

export enum RawSchedulerDays {
    everyDay = 0,
    everyWeekday = 1,
    everyWeekend = 2,
    everyMonday = 3,
    everyTuesday = 4,
    everyWednesday = 5,
    everyThursday = 6,
    everyFriday = 7,
    everySaturday = 8,
    everySunday = 9,
}

export enum RawEncryptionOption {
    prefer = 0,
    on = 1,
    off = 2,
}

export enum RawProxyType {
    disabled = -1,
    httpWithouAuthentication = 1,
    socks5WithoutAuthentication = 2,
    httpWithAuthentication = 3,
    socks5WithAuthentication = 4,
    socks4WithoutAuthentication = 5,
}

export enum RawDynDnsService {
    DyDNS = 0,
    NOIP = 1,
}

export enum RawUploadChokingAlgorithm {
    roundRobin = 0,
    fastestUpload = 1,
    antiLeech = 2,
}

export enum RawUploadSlotsBehavior {
    fixedSlots = 0,
    uploadRateBased = 1,
}

export enum RawUtpTcpMixedMode {
    preferTcp = 0,
    peerProportional = 1,
}

export interface RawPreference {
    locale: string;
    create_subfolder_enabled: boolean;
    start_paused_enabled: boolean;
    auto_delete_mode: number;
    preallocate_all: boolean;
    incomplete_files_ext: boolean;
    auto_tmm_enabled: boolean;
    torrent_changed_tmm_enabled: boolean;
    save_path_changed_tmm_enabled: boolean;
    category_changed_tmm_enabled: boolean;
    save_path: string;
    temp_path_enabled: boolean;
    temp_path: string;
    scan_dirs: Record<string, string | RawScanDirTarget>;
    export_dir: string;
    export_dir_fin: string;
    mail_notification_enabled: boolean;
    mail_notification_sender: string;
    mail_notification_email: string;
    mail_notification_smtp: string;
    mail_notification_ssl_enabled: boolean;
    mail_notification_auth_enabled: boolean;
    mail_notification_username: string;
    mail_notification_password: string;
    autorun_enabled: boolean;
    autorun_program: string;
    queueing_enabled: boolean;
    max_active_downloads: number;
    max_active_torrents: number;
    max_active_uploads: number;
    dont_count_slow_torrents: boolean;
    slow_torrent_dl_rate_threshold: number;
    slow_torrent_ul_rate_threshold: number;
    slow_torrent_inactive_timer: number;
    max_ratio_enabled: boolean;
    max_ratio: number;
    max_ratio_act: RawMaxRatioAction;
    listen_port: number;
    upnp: boolean;
    random_port: boolean;
    dl_limit: number;
    up_limit: number;
    max_connec: number;
    max_connec_per_torrent: number;
    max_uploads: number;
    max_uploads_per_torrent: number;
    stop_tracker_timeout: number;
    enable_piece_extent_affinity: boolean;
    bittorrent_protocol: RawBittorrentProtocol;
    limit_utp_rate: boolean;
    limit_tcp_overhead: boolean;
    limit_lan_peers: boolean;
    alt_dl_limit: number;
    alt_up_limit: number;
    scheduler_enabled: boolean;
    schedule_from_hour: number;
    schedule_from_min: number;
    schedule_to_hour: number;
    schedule_to_min: number;
    scheduler_days: RawSchedulerDays;
    dht: boolean;
    pex: boolean;
    lsd: boolean;
    encryption: RawEncryptionOption;
    anonymous_mode: boolean;
    proxy_type: RawProxyType;
    proxy_ip: string;
    proxy_port: number;
    proxy_peer_connections: boolean;
    proxy_auth_enabled: boolean;
    proxy_username: string;
    proxy_password: string;
    proxy_torrents_only: boolean;
    ip_filter_enabled: boolean;
    ip_filter_path: string;
    ip_filter_trackers: boolean;
    web_ui_domain_list: string;
    web_ui_address: string;
    web_ui_port: number;
    web_ui_upnp: boolean;
    web_ui_username: string;
    web_ui_password: string;
    web_ui_csrf_protection_enabled: boolean;
    web_ui_clickjacking_protection_enabled: boolean;
    web_ui_secure_cookie_enabled: boolean;
    web_ui_max_auth_fail_count: number;
    web_ui_ban_duration: number;
    web_ui_session_timeout: number;
    web_ui_host_header_validation_enabled: boolean;
    bypass_local_auth: boolean;
    bypass_auth_subnet_whitelist_enabled: boolean;
    bypass_auth_subnet_whitelist: string;
    alternative_webui_enabled: boolean;
    alternative_webui_path: string;
    use_https: boolean;
    ssl_key: string;
    ssl_cert: string;
    web_ui_https_key_path: string;
    web_ui_https_cert_path: string;
    dyndns_enabled: boolean;
    dyndns_service: RawDynDnsService;
    dyndns_username: string;
    dyndns_password: string;
    dyndns_domain: string;
    rss_refresh_interval: number;
    rss_max_articles_per_feed: number;
    rss_processing_enabled: boolean;
    rss_auto_downloading_enabled: boolean;
    rss_download_repack_proper_episodes: boolean;
    rss_smart_episode_filters: string;
    add_trackers_enabled: boolean;
    add_trackers: string;
    web_ui_use_custom_http_headers_enabled: boolean;
    web_ui_custom_http_headers: string;
    max_seeding_time_enabled: boolean;
    max_seeding_time: number;
    announce_ip: string;
    announce_to_all_tiers: boolean;
    announce_to_all_trackers: boolean;
    async_io_threads: number;
    banned_IPs: string;
    checking_memory_use: number;
    current_interface_address: string;
    current_network_interface: string;
    disk_cache: number;
    disk_cache_ttl: number;
    embedded_tracker_port: number;
    enable_coalesce_read_write: boolean;
    enable_embedded_tracker: boolean;
    enable_multi_connections_from_same_ip: boolean;
    enable_os_cache: boolean;
    enable_upload_suggestions: boolean;
    file_pool_size: number;
    outgoing_ports_max: number;
    outgoing_ports_min: number;
    recheck_completed_torrents: boolean;
    resolve_peer_countries: boolean;
    save_resume_data_interval: number;
    send_buffer_low_watermark: number;
    send_buffer_watermark: number;
    send_buffer_watermark_factor: number;
    socket_backlog_size: number;
    upload_choking_algorithm: RawUploadChokingAlgorithm;
    upload_slots_behavior: RawUploadSlotsBehavior;
    upnp_lease_duration: number;
    utp_tcp_mixed_mode: RawUtpTcpMixedMode;
}

export interface RawLogOptions {
    normal: boolean;
    info: boolean;
    warning: boolean;
    critical: boolean;
    last_known_id: number;
}

export enum RawLogEntryType {
    normal = 1,
    info = 2,
    warning = 4,
    critical = 8,
}

export interface RawLogEntry {
    id: number;
    message: string;
    timestamp: number;
    type: RawLogEntryType;
}

export interface RawPeerLogEntry {
    id: number;
    ip: string;
    timestamp: number;
    blocked: boolean;
    reason: string;
}

export enum RawTorrentState {
    error = "error",
    missingFiles = "missingFiles",
    uploading = "uploading",
    pausedUP = "pausedUP",
    queuedUP = "queuedUP",
    stalledUP = "stalledUP",
    checkingUP = "checkingUP",
    forcedUP = "forcedUP",
    allocating = "allocating",
    downloading = "downloading",
    metaDL = "metaDL",
    pausedDL = "pausedDL",
    queuedDL = "queuedDL",
    stalledDL = "stalledDL",
    checkingDL = "checkingDL",
    forcedDL = "forcedDL",
    checkingResumeData = "checkingResumeData",
    moving = "moving",
    unknown = "unknown",
}

export interface RawTorrent {
    added_on: number;
    amount_left: number;
    auto_tmm: boolean;
    availability: number;
    category: string;
    completed: number;
    completion_on: number;
    content_path: string;
    dl_limit: number;
    dlspeed: number;
    download_path: string;
    downloaded: number;
    downloaded_session: number;
    eta: number;
    f_l_piece_prio: boolean;
    force_start: boolean;
    infohash_v1: string;
    infohash_v2: string;
    last_activity: number;
    magnet_uri: string;
    max_ratio: number;
    max_seeding_time: number;
    name: string;
    num_complete: number;
    num_incomplete: number;
    num_leechs: number;
    num_seeds: number;
    priority: number;
    progress: number;
    ratio: number;
    ratio_limit: number;
    save_path: string;
    seeding_time: number;
    seeding_time_limit: number;
    seen_complete: number;
    seq_dl: boolean;
    size: number;
    state: RawTorrentState;
    super_seeding: boolean;
    tags: string;
    time_active: number;
    total_size: number;
    tracker: string;
    trackers_count: number;
    up_limit: number;
    uploaded: number;
    uploaded_session: number;
    upspeed: number;
}

export interface RawCategory {
    name: string;
    savePath: string;
}

export enum RawConnectionStatus {
    connected = "connected",
    firewalled = "firewalled",
    disconnected = "disconnected",
}

export interface RawTransferInfo {
    connection_status: RawConnectionStatus;
    dht_nodes: number;
    dl_info_data: number;
    dl_info_speed: number;
    dl_rate_limit: number;
    up_info_data: number;
    up_info_speed: number;
    up_rate_limit: number;
}

export interface RawServerState extends RawTransferInfo {
    alltime_dl: number;
    alltime_ul: number;
    average_time_queue: number;
    free_space_on_disk: number;
    global_ration: string;
    queued_io_jobs: number;
    queueing: boolean;
    read_cache_hits: string;
    read_cache_overload: string;
    refresh_interval: number;
    total_buffers_size: number;
    total_peer_connections: number;
    total_queued_size: number;
    total_wasted_session: number;
    use_alt_speed_limits: boolean;
    write_cache_overload: string;
}

export interface RawMainData {
    rid: number;
    full_update: boolean;
    torrents?: Record<string, RawTorrent>;
    torrents_removed?: string[];
    categories?: Record<string, RawCategory>;
    categories_removed?: string[];
    tags?: string[];
    tags_removed?: string[];
    server_state?: RawServerState;
    trackers?: Record<string, string[]>;
    trackers_removed?: string[];
}

export enum RawConnectionType {
    uTP = "μTP",
    BT = "BT",
}

export interface RawPeer {
    client: string;
    connection: RawConnectionType;
    country: string;
    countr_code: string;
    dl_speed: number;
    downloaded: number;
    files: string;
    flags: string;
    flags_desc: string;
    ip: string;
    port: number;
    progress: number;
    relevance: number;
    up_speed: number;
    uploaded: number;
}

export interface RawTorrentPeerData {
    full_update: boolean;
    peers: Record<string, RawPeer>;
    rid: number;
    show_flags: boolean;
}

export enum RawTorrentListFilter {
    all = "all",
    downloading = "downloading",
    seeding = "seeding",
    completed = "completed",
    paused = "paused",
    active = "active",
    inactive = "inactive",
    resumed = "resumed",
    stalled = "stalled",
    stalled_uploading = "stalled_uploading",
    stalled_downloading = "stalled_downloading",
    errored = "errored",
}

export enum RawTorrentSortKey {
    added_on = "added_on",
    amount_left = "amount_left",
    auto_tmm = "auto_tmm",
    availability = "availability",
    category = "category",
    completed = "completed",
    completion_on = "completion_on",
    content_path = "content_path",
    dl_limit = "dl_limit",
    dlspeed = "dlspeed",
    downloaded = "downloaded",
    downloaded_session = "downloaded_session",
    eta = "eta",
    f_l_piece_prio = "f_l_piece_prio",
    force_start = "force_start",
    hash = "hash",
    last_activity = "last_activity",
    magnet_uri = "magnet_uri",
    max_ratio = "max_ratio",
    max_seeding_time = "max_seeding_time",
    name = "name",
    num_complete = "num_complete",
    num_incomplete = "num_incomplete",
    num_leechs = "num_leechs",
    num_seeds = "num_seeds",
    priority = "priority",
    progress = "progress",
    ratio = "ratio",
    ratio_limit = "ratio_limit",
    save_path = "save_path",
    seeding_time = "seeding_time",
    seeding_time_limit = "seeding_time_limit",
    seen_complete = "seen_complete",
    seq_dl = "seq_dl",
    size = "size",
    state = "state",
    super_seeding = "super_seeding",
    tags = "tags",
    time_active = "time_active",
    total_size = "total_size",
    tracker = "tracker",
    up_limit = "up_limit",
    uploaded = "uploaded",
    uploaded_session = "uploaded_session",
    upspeed = "upspeed",
}

export interface TorrentListOptions {
    filter: RawTorrentListFilter;
    category: string;
    tag: string;
    sort: RawTorrentSortKey;
    reverse: boolean;
    limit: number;
    offset: number;
    hashes: string;
}

export interface RawTorrentProperties {
    save_path: string;
    creation_date: number;
    piece_size: number;
    comment: string;
    download_path: string;
    infohash_v1: string;
    infohash_v2: string;
    total_wasted: number;
    total_uploaded: number;
    total_uploaded_session: number;
    total_downloaded: number;
    total_downloaded_session: number;
    up_limit: number;
    dl_limit: number;
    time_elapsed: number;
    seeding_time: number;
    nb_connections: number;
    nb_connections_limit: number;
    share_ratio: number;
    addition_date: number;
    completion_date: number;
    created_by: string;
    dl_speed_avg: number;
    dl_speed: number;
    eta: number;
    last_seen: number;
    peers: number;
    peers_total: number;
    pieces_have: number;
    pieces_num: number;
    reannounce: number;
    seeds: number;
    seeds_total: number;
    total_size: number;
    up_speed_avg: number;
    up_speed: number;
}

export enum RawTrackerStatus {
    disabled = 0,
    notContacted = 1,
    working = 2,
    updating = 3,
    notWorking = 4,
}

export interface RawTracker {
    url: string;
    status: RawTrackerStatus;
    tier: number;
    num_peers: number;
    num_seeds: number;
    num_leeches: number;
    num_downloaded: number;
    msg: string;
}

export interface RawWebSeed {
    url: string;
}

export enum RawTorrentFilePriority {
    doNotDownload = 0,
    normal = 1,
    high = 6,
    maximal = 7,
}

export interface RawTorrentFile {
    index: number;
    name: string;
    size: number;
    progress: number;
    priority: RawTorrentFilePriority;
    is_seed: boolean;
    piece_range: [number, number];
    availability: number;
}

export enum RawPieceState {
    notDownloaded = 0,
    nowDownloading = 1,
    alreadyDownloaded = 2,
}

export interface RawShareLimitsOptions {
    hashes: string[] | string | "all";
    ratioLimit?: number;
    seedingTimeLimit?: number;
}

export interface RawRssFeed {
    uid: string;
    url: string;
}

export interface RawRssArticle {
    date: string;
    description: string;
    id: string;
    isRead: boolean;
    link: string;
    title: string;
    torrentUrl: string;
}

export interface RawRssFeedWithArticles extends RawRssFeed {
    hasError: boolean;
    isLoading: boolean;
    lastBuildDate: string;
    title: string;
    articles: RawRssArticle[];
}

export interface RawRssRule {
    enabled: boolean;
    mustContain: string;
    mustNotContain: string;
    useRegex: boolean;
    episodeFilter: string;
    smartFilter: boolean;
    previouslyMatchedEpisodes: string[];
    affectedFeeds: string[];
    ignoreDays: number;
    lastMatch: string;
    addPaused: boolean | null;
    assignedCategory: string;
    savePath: string;
}

export enum RawSearchStatusType {
    Stopped = "Stopped",
    Running = "Running",
}

export interface RawSearchStatus {
    id: number;
    status: RawSearchStatusType;
    total: number;
}

export interface RawSearchResultOptions {
    id: number;
    limit?: number;
    offset?: number;
}

export interface RawSearchResult {
    descrLink: string;
    fileName: string;
    fileSize: number;
    fileUrl: string;
    nbLeechers: number;
    nbSeeders: number;
    siteUrl: string;
}

export interface RawSearchResults {
    results: RawSearchResult[];
    status: RawSearchStatusType;
    total: number;
}

export interface RawSearchPluginCategory {
    id: string;
    name: string;
}

export interface RawSearchPlugin {
    enabled: boolean;
    fullName: string;
    name: string;
    supportedCategories: RawSearchPluginCategory[];
    url: string;
    version: string;
}

export interface RawTorrentAddOptions {
    savepath: string;
    cookie: string;
    category: string;
    tags: string[];
    skip_checking: boolean;
    paused: boolean;
    root_folder: boolean;
    rename: string;
    upLimit: number;
    dlLimit: number;
    ratioLimit: number;
    seedingTimeLimit: number;
    autoTMM: boolean;
    sequantialDownload: boolean;
    firstLastPiecePrio: boolean;
}

function safeURL(str: string) {
    let url;
    try {
        url = new URL(str);
    } catch (e) {
        return null;
    }
    return url;
}

export class Api {
    public constructor(private qbit: QBittorrent) {}

    public async login(username: string, password: string) {
        const res = await this.qbit.fetch("/auth/login", {
            method: "POST",
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(
                password
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 403) throw new Error("IP Banned");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        const session = res.headers.get("set-cookie")?.split(";")?.[0];
        if (session === null || session === undefined) {
            throw new Error("Invalid credentials");
        }
        return session;
    }

    public async logout() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("/auth/logout");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getApplicationVersion() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/version");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text();
    }

    public async getApiVersion() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/webapiVersion");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text();
    }

    public async getBuildInfo() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/buildInfo");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawBuildInfo>;
    }

    public async shutdown() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/shutdown");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getPreferences() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/preferences");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawPreference>;
    }

    public async setPreferences(preferences: Partial<RawPreference>) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/preferences", {
            method: "POST",
            body: `json=${encodeURIComponent(JSON.stringify(preferences))}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getDefaultSavePath() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/defaultSavePath");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text();
    }

    public async getLog(opts: Partial<RawLogOptions> = {}) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `log/main?${Object.entries(opts)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&")}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawLogEntry[]>;
    }

    public async getPeerLog(last_known_id?: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `log/peers${last_known_id ? `?last_known_id=${last_known_id}` : ""}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawPeerLogEntry[]>;
    }

    public async getMainData(rid?: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`sync/maindata${rid ? `?rid=${rid}` : ""}`);
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawMainData>;
    }

    public async getTorrentPeers(hash: string, rid?: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `sync/torrentPeers?hash=${encodeURIComponent(hash)}${rid ? `&rid=${rid}` : ""}`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTorrentPeerData>;
    }

    public async getTransferInfo() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/info");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTransferInfo>;
    }

    public async isAlternativeSpeedLimitEnabled() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/speedLimitsMode");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return (await res.text()) === "1";
    }

    public async toggleAlternativeSpeedLimit() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`transfer/toggleSpeedLimitsMode`);
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getGlobalDownloadLimit() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/downloadLimit");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return parseFloat(await res.text());
    }

    public async setGlobalDownloadLimit(limit: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/setDownloadLimit", {
            method: "POST",
            body: `limit=${Math.round(limit)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getGlobalUploadLimit() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/uploadLimit");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return parseFloat(await res.text());
    }

    public async setGlobalUploadLimit(limit: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/setUploadLimit", {
            method: "POST",
            body: `limit=${Math.round(limit)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async banPeers(peers: string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/banPeers", {
            method: "POST",
            body: `peers=${encodeURIComponent(peers.join("|"))}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getTorrents(opts: Partial<TorrentListOptions> = {}) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/info?${Object.entries(opts)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&")}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTorrent[]>;
    }

    public async getTorrent(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/properties?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTorrentProperties>;
    }

    public async getTorrentTrackers(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/trackers?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTracker[]>;
    }

    public async getTorrentWebSeeds(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/webseeds?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawWebSeed[]>;
    }

    public async getTorrentFiles(hash: string, indexes?: number[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/files?hash=${encodeURIComponent(hash)}${
                indexes ? `&indexes=${encodeURIComponent(indexes.join("|"))}` : ""
            }`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTorrentFile[]>;
    }

    public async getTorrentPieceStates(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/pieceStates?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawPieceState[]>;
    }

    public async getTorrentPieceHashes(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/pieceHashes?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<string[]>;
    }

    public async pauseTorrents(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/pause?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async resumeTorrents(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/resume?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async deleteTorrents(hashes: string[] | string | "all", deleteFiles = false) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/delete?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&deleteFiles=${deleteFiles}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async recheckTorrents(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/recheck?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async reannounceTorrents(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/reannounce?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addTorrent(
        torrent: Buffer | string | (Buffer | string)[],
        opts?: Partial<RawTorrentAddOptions>
    ) {
        await this.qbit.checkLogin();
        const data = new FormData();
        const torrents = Array.isArray(torrent) ? torrent : [torrent];
        const links = [];
        for (const torrent of torrents) {
            if (Buffer.isBuffer(torrent)) {
                data.append(
                    "torrents",
                    new File([torrent], "upload.torrent", {
                        type: "application/x-bittorrent",
                    }),
                    "upload.torrent"
                );
            } else {
                const parsed = safeURL(torrent);
                if (parsed && ["http:", "https:", "magnet:"].includes(parsed.protocol)) {
                    links.push(torrent);
                } else {
                    const res = await stat(torrent).catch(() => null);
                    if (res)
                        data.append(
                            "torrents",
                            await fileFrom(torrent, "application/x-bittorrent")
                        );
                    else throw Error(`Invalid torrent string "${torrent}"`);
                }
            }
        }
        if (links.length > 0) data.set("urls", links.join("\n"));
        if (opts) {
            for (const [key, val] of Object.entries(opts)) {
                if (key === "tags") data.set(key, (val as string[]).join(","));
                else data.set(key, val.toString());
            }
        }
        // fix for bullshit formdata bugs
        data.set("fix", "fix");
        const res = await this.qbit.fetch("torrents/add", {
            method: "POST",
            body: data,
        });
        if (res.status === 415) throw new Error("Torrent file not valid");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addTorrentTrackers(hash: string, trackers: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/addTrackers?hash=${encodeURIComponent(hash)}&urls=${encodeURIComponent(
                Array.isArray(trackers) ? trackers.join("\n") : trackers
            )}`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async editTorrentTrackers(hash: string, origUrl: string, newUrl: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/editTrackers?hash=${encodeURIComponent(hash)}&origUrl=${encodeURIComponent(
                origUrl
            )}&newUrl=${encodeURIComponent(newUrl)}`
        );
        if (res.status === 400) throw new Error("New url is not valid");
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error("Old url is not used or new one is already used");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeTorrentTracker(hash: string, trackers: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/removeTrackers?hash=${encodeURIComponent(hash)}&urls=${encodeURIComponent(
                Array.isArray(trackers) ? trackers.join("\n") : trackers
            )}`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error("Trackers not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addTorrentPeers(hashes: string, peers: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/addPeers?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&peers=${encodeURIComponent(Array.isArray(peers) ? peers.join("|") : peers)}`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async increaseTorrentPriority(hashes: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/increasePrio?hashes=${encodeURIComponent(hashes)}`
        );
        if (res.status === 409) throw new Error("Torrent queueing is not enabled");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async decreaseTorrentPriority(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/decreasePrio?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status === 409) throw new Error("Torrent queueing is not enabled");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTopPriority(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/topPrio?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status === 409) throw new Error("Torrent queueing is not enabled");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setBottomPriority(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/bottomPrio?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status === 409) throw new Error("Torrent queueing is not enabled");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentFilePriority(
        hash: string,
        files: number[],
        priority: RawTorrentFilePriority
    ) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/filePrio?hash=${encodeURIComponent(hash)}&id=${encodeURIComponent(
                files.join("|")
            )}&priority=${priority}`
        );
        if (res.status === 400) throw new Error("Invalid file index or priority");
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409)
            throw new Error("File id not found or torrent metadata not yet downloaded");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getTorrentDownloadLimit(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/downloadLimit?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, number>>;
    }

    public async setTorrentDownloadLimit(hashes: string[] | string | "all", limit: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/setDownloadLimit`, {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&limit=${limit}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentShareLimits(opts: RawShareLimitsOptions) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setShareLimits", {
            method: "POST",
            body: Object.entries(opts)
                .map(
                    ([key, val]) =>
                        `${key}=${encodeURIComponent(Array.isArray(val) ? val.join("|") : val)}`
                )
                .join("&"),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getTorrentUploadLimit(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/uploadLimit?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, number>>;
    }

    public async setTorrentUploadLimit(hashes: string[] | string | "all", limit: number) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/setUploadLimit`, {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&limit=${limit}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentLocation(hashes: string[] | string | "all", location: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setLocation", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&location=${encodeURIComponent(location)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error("Invalid location");
        if (res.status === 403) throw new Error("No write perms to direcotry");
        if (res.status === 409) throw new Error("Unable to create directory");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentName(hash: string, name: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/rename", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&name=${encodeURIComponent(name)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error("Torrent name is invalid");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentCategory(hashes: string[] | string | "all", category: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setCategory", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&category=${encodeURIComponent(category)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Torrent category is invalid");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getCategories() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/categories");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, RawCategory>>;
    }

    public async createCategory(name: string, savePath = "") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/createCategory", {
            method: "POST",
            body: `category=${encodeURIComponent(name)}&savePath=${encodeURIComponent(savePath)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400 || res.status === 409) throw new Error("Category name is invalid");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async editCategory(name: string, savePath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/editCategory", {
            method: "POST",
            body: `category=${encodeURIComponent(name)}&savePath=${encodeURIComponent(savePath)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error("Category name is invalid");
        if (res.status === 409) throw new Error("Category editing failed");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeCategories(names: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/removeCategories", {
            method: "POST",
            body: `categories=${encodeURIComponent(
                Array.isArray(names) ? names.join("\n") : names
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addTorrentTags(hashes: string[] | string | "all", tags: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/addTags", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&tags=${encodeURIComponent(Array.isArray(tags) ? tags.join(",") : tags)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeTorrentTags(hashes: string[] | string | "all", tags: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/removeTags", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&tags=${encodeURIComponent(Array.isArray(tags) ? tags.join(",") : tags)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getTags() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/tags");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<string[]>;
    }

    public async createTags(names: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/createTags", {
            method: "POST",
            body: `tags=${encodeURIComponent(Array.isArray(names) ? names.join(",") : names)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async deleteTags(names: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/deleteTags", {
            method: "POST",
            body: `tags=${encodeURIComponent(Array.isArray(names) ? names.join(",") : names)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentAutoManagement(hashes: string[] | string | "all", enabled: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setAutoManagement", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&enabled=${enabled}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async toggleTorrentSequentialDownload(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/toggleSequentialDownload", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async toggleTorrentFirstLastPiecePriority(hashes: string[] | string | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/toggleFirstLastPiecePrio", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentForceStart(hashes: string[] | string | "all", enabled: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setForceStart", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&value=${enabled}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentSuperSeeding(hashes: string[] | string | "all", enabled: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setSuperSeeding", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&value=${enabled}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async renameTorrentFile(hash: string, oldPath: string, newPath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/renameFile", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&oldPath=${encodeURIComponent(
                oldPath
            )}&newPath=${encodeURIComponent(newPath)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400 || res.status === 409) throw new Error("Invalid path");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/renameFolder", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&oldPath=${encodeURIComponent(
                oldPath
            )}&newPath=${encodeURIComponent(newPath)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400 || res.status === 409) throw new Error("Invalid path");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addRssFolder(path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/addFolder", {
            method: "POST",
            body: `path=${encodeURIComponent(path)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Failed to add folder");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addRssFeed(url: string, path?: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/addFeed", {
            method: "POST",
            body: `url=${encodeURIComponent(url)}${
                path ? `&path=${encodeURIComponent(path)}` : ""
            }`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Failed to add feed");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeRssItem(path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/removeItem", {
            method: "POST",
            body: `path=${encodeURIComponent(path)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Failed to remove item");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async moveRssItem(itemPath: string, destPath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/moveItem", {
            method: "POST",
            body: `itemPath=${encodeURIComponent(itemPath)}&destPath=${encodeURIComponent(
                destPath
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Failed to move item");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getRssItems(
        withdata = false
    ): Promise<Record<string, RawRssFeed | RawRssFeedWithArticles>> {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`rss/items?withdata=${withdata}`);
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, RawRssFeed | RawRssFeedWithArticles>>;
    }

    public async markRssAsRead(itemPath: string, articleId?: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/markAsRead", {
            method: "POST",
            body: `itemPath=${encodeURIComponent(itemPath)}${
                articleId ? `&articleId=${encodeURIComponent(articleId)}` : ""
            }`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async refreshRssItem(itemPath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/refreshItem", {
            method: "POST",
            body: `itemPath=${encodeURIComponent(itemPath)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setRssRule(ruleName: string, ruleDef: RawRssRule) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/setRule", {
            method: "POST",
            body: `ruleName=${encodeURIComponent(ruleName)}&ruleDef=${encodeURIComponent(
                JSON.stringify(ruleDef)
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async renameRssRule(ruleName: string, newRuleName: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/renameRule", {
            method: "POST",
            body: `ruleName=${encodeURIComponent(ruleName)}&newRuleName=${encodeURIComponent(
                newRuleName
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeRssRule(ruleName: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/removeRule", {
            method: "POST",
            body: `ruleName=${encodeURIComponent(ruleName)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getRssRules() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/rules");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, RawRssRule>>;
    }

    public async getRssRuleArticles(ruleName: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/matchingArticles", {
            method: "POST",
            body: `ruleName=${encodeURIComponent(ruleName)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, string[]>>;
    }

    public async startSearch(
        query: string,
        plugins: string[] | string | "all" | "enabled",
        category: string | "all"
    ) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/start", {
            method: "POST",
            body: `pattern=${encodeURIComponent(query)}&plugins=${encodeURIComponent(
                Array.isArray(plugins) ? plugins.join("|") : plugins
            )}&category=${encodeURIComponent(category)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error("Reached max number of concurrent queries");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        const { id } = (await res.json()) as { id: string };
        return id;
    }

    public async stopSearch(id: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/stop", {
            method: "POST",
            body: `id=${encodeURIComponent(id)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Search not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getSearchStatus(id?: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `search/status${id ? `?id=${encodeURIComponent(id)}` : ""}`
        );
        if (res.status === 404) throw new Error("Search not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawSearchStatus[]>;
    }

    public async getSearchResults(opts: RawSearchResultOptions) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `search/results?${Object.entries(opts)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&")}`
        );
        if (res.status === 404) throw new Error("Search not found");
        if (res.status === 409) throw new Error("Offset out of range");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawSearchResults>;
    }

    public async deleteSearch(id: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/delete", {
            method: "POST",
            body: `id=${encodeURIComponent(id)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Search not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async getSearchPlugins() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/plugins");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawSearchPlugin[]>;
    }

    public async installSearchPlugin(sources: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/installPlugin", {
            method: "POST",
            body: `sources=${encodeURIComponent(
                Array.isArray(sources) ? sources.join("|") : sources
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async uninstallSearchPlugin(names: string[] | string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/uninstallPlugin", {
            method: "POST",
            body: `names=${encodeURIComponent(Array.isArray(names) ? names.join("|") : names)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async enableSearchPlugin(names: string[] | string, enable: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/enablePlugin", {
            method: "POST",
            body: `names=${encodeURIComponent(
                Array.isArray(names) ? names.join("|") : names
            )}&enable=${enable}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async updateSearchPlugins() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("search/updatePlugins");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }
}
