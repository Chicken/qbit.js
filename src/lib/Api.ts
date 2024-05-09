import { File, FormData } from "node-fetch";
import { QBittorrent } from "./QBittorrent.js";
import { DeepPartial, Values } from "./typeHelpers.js";

// MARK: Types

export type RawBuildInfo = {
    bitness: number;
    boost: string;
    libtorrent: string;
    openssl: string;
    qt: string;
    zlib: string;
};

export const RawScanDirTarget = {
    monitoredFolder: 0,
    defaultSavePath: 1,
} as const;
export type RawScanDirTarget = Values<typeof RawScanDirTarget>;

export const RawMaxRatioAction = {
    pause: 0,
    remove: 1,
    deleteFiles: 3,
    enableSuperSeeding: 2,
} as const;
export type RawMaxRatioAction = Values<typeof RawMaxRatioAction>;

export const RawBittorrentProtocol = {
    both: 0,
    TCP: 1,
    uTP: 2,
} as const;
export type RawBittorrentProtocol = Values<typeof RawBittorrentProtocol>;

export const RawSchedulerDays = {
    everyDay: 0,
    everyWeekday: 1,
    everyWeekend: 2,
    everyMonday: 3,
    everyTuesday: 4,
    everyWednesday: 5,
    everyThursday: 6,
    everyFriday: 7,
    everySaturday: 8,
    everySunday: 9,
} as const;
export type RawSchedulerDays = Values<typeof RawSchedulerDays>;

export const RawEncryptionOption = {
    on: 0,
    forced: 1,
    off: 2,
} as const;
export type RawEncryptionOption = Values<typeof RawEncryptionOption>;

export const RawProxyType = {
    none: "None",
    http: "HTTP",
    socks4: "SOCKS4",
    socks5: "SOCKS5",
} as const;
export type RawProxyType = Values<typeof RawProxyType>;

export const RawDynDnsService = {
    dynDns: 0,
    noIp: 1,
    none: -1,
} as const;
export type RawDynDnsService = Values<typeof RawDynDnsService>;

export const RawUploadChokingAlgorithm = {
    roundRobin: 0,
    fastestUpload: 1,
    antiLeech: 2,
} as const;
export type RawUploadChokingAlgorithm = Values<typeof RawUploadChokingAlgorithm>;

export const RawUploadSlotsBehavior = {
    fixedSlots: 0,
    uploadRateBased: 1,
} as const;
export type RawUploadSlotsBehavior = Values<typeof RawUploadSlotsBehavior>;

export const RawUtpTcpMixedMode = {
    preferTcp: 0,
    peerProportional: 1,
} as const;
export type RawUtpTcpMixedMode = Values<typeof RawUtpTcpMixedMode>;

export const RawFileLogAgeType = {
    days: 0,
    months: 1,
    years: 2,
} as const;
export type RawFileLogAgeType = Values<typeof RawFileLogAgeType>;

export const RawTorrentContentLayout = {
    original: "Original",
    subFolder: "Subfolder",
    noSubFolder: "NoSubfolder",
} as const;
export type RawTorrentContentLayout = Values<typeof RawTorrentContentLayout>;

export const RawTorrentStopCondition = {
    none: "None",
    metadataReceived: "MetadataReceived",
    filesChecked: "FilesChecked",
} as const;
export type RawTorrentStopCondition = Values<typeof RawTorrentStopCondition>;

export const RawTorrentFileAutoDeleteMode = {
    never: 0,
    ifAdded: 1,
    always: 2,
} as const;
export type RawTorrentFileAutoDeleteMode = Values<typeof RawTorrentFileAutoDeleteMode>;

export const RawResumeDataStorageType = {
    legacy: "Legacy",
    sqlite: "SQLite",
} as const;
export type RawResumeDataStorageType = Values<typeof RawResumeDataStorageType>;

export const RawDiskIOType = {
    default: 0,
    memoryMapped: 1,
    posixCompliant: 2,
} as const;
export type RawDiskIOType = Values<typeof RawDiskIOType>;

export const RawDiskIOReadMode = {
    disableOSCache: 0,
    enableOSCache: 1,
} as const;
export type RawDiskIOReadMode = Values<typeof RawDiskIOReadMode>;

export const RawDiskIOWriteMode = {
    disableOSCache: 0,
    enableOSCache: 1,
    writeThrough: 2,
} as const;
export type RawDiskIOWriteMode = Values<typeof RawDiskIOWriteMode>;

export type RawPreference = {
    // behavior
    locale: string;
    performance_warning: boolean;

    file_log_enabled: boolean;
    file_log_path: string;
    file_log_backup_enabled: boolean;
    /** KiB */
    file_log_max_size: number;
    file_log_delete_old: boolean;
    file_log_age: number;
    file_log_age_type: RawFileLogAgeType;

    // downloads
    torrent_content_layout: RawTorrentContentLayout;
    add_to_top_of_queue: boolean;
    start_paused_enabled: boolean;
    torrent_stop_condition: RawTorrentStopCondition;
    merge_trackers: boolean;
    auto_delete_mode: RawTorrentFileAutoDeleteMode;
    preallocate_all: boolean;
    incomplete_files_ext: boolean;

    auto_tmm_enabled: boolean;
    torrent_changed_tmm_enabled: boolean;
    save_path_changed_tmm_enabled: boolean;
    category_changed_tmm_enabled: boolean;
    use_subcategories: boolean;
    save_path: string;
    temp_path_enabled: boolean;
    temp_path: string;
    use_category_paths_in_manual_mode: boolean;
    export_dir: string;
    export_dir_fin: string;

    /** deprecated */
    scan_dirs: Record<string, string | RawScanDirTarget>;

    excluded_file_names_enabled: boolean;
    /** newline seperated */
    excluded_file_names: string;

    mail_notification_enabled: boolean;
    mail_notification_sender: string;
    mail_notification_email: string;
    mail_notification_smtp: string;
    mail_notification_ssl_enabled: boolean;
    mail_notification_auth_enabled: boolean;
    mail_notification_username: string;
    mail_notification_password: string;

    autorun_on_torrent_added_enabled: boolean;
    autorun_on_torrent_added_program: string;
    autorun_enabled: boolean;
    autorun_program: string;

    // connection
    listen_port: number;
    /** deprecated */
    random_port: boolean;
    upnp: boolean;
    /** -1 disabled, yes typoed */
    max_connec: number;
    /** -1 disabled, yes typoed */
    max_connec_per_torrent: number;
    /** -1 disabled */
    max_uploads: number;
    /** -1 disabled */
    max_uploads_per_torrent: number;

    i2p_enabled: boolean;
    i2p_address: string;
    i2p_port: number;
    i2p_mixed_mode: boolean;
    i2p_inbound_quantity: number;
    i2p_outbound_quantity: number;
    i2p_inbound_length: number;
    i2p_outbound_length: number;

    proxy_type: RawProxyType;
    proxy_ip: string;
    proxy_port: number;
    proxy_auth_enabled: boolean;
    proxy_username: string;
    proxy_password: string;
    proxy_hostname_lookup: boolean;
    proxy_bittorrent: boolean;
    proxy_peer_connections: boolean;
    proxy_rss: boolean;
    proxy_misc: boolean;

    ip_filter_enabled: boolean;
    ip_filter_path: string;
    ip_filter_trackers: boolean;
    /** newline seperated */
    banned_IPs: string;

    // speed
    /** 0 unlimited, B/s */
    dl_limit: number;
    /** 0 unlimited, B/s */
    up_limit: number;
    /** 0 unlimited, B/s */
    alt_dl_limit: number;
    /** 0 unlimited, B/s */
    alt_up_limit: number;
    bittorrent_protocol: RawBittorrentProtocol;
    limit_utp_rate: boolean;
    limit_tcp_overhead: boolean;
    limit_lan_peers: boolean;

    scheduler_enabled: boolean;
    /** hour & min need to be set at once */
    schedule_from_hour: number;
    /** hour & min need to be set at once */
    schedule_from_min: number;
    /** hour & min need to be set at once */
    schedule_to_hour: number;
    /** hour & min need to be set at once */
    schedule_to_min: number;
    scheduler_days: RawSchedulerDays;

    // bittorrent
    dht: boolean;
    pex: boolean;
    lsd: boolean;
    encryption: RawEncryptionOption;
    anonymous_mode: boolean;

    max_active_checking_torrents: number;
    queueing_enabled: boolean;
    max_active_downloads: number;
    max_active_torrents: number;
    max_active_uploads: number;
    dont_count_slow_torrents: boolean;
    /** KiB/s */
    slow_torrent_dl_rate_threshold: number;
    /** KiB/s */
    slow_torrent_ul_rate_threshold: number;
    /** seconds */
    slow_torrent_inactive_timer: number;

    /** enabled & value have to be set at once, calculated from value in response */
    max_ratio_enabled: boolean;
    /** enabled & value have to be set at once, -1 disabled */
    max_ratio: number;
    /** enabled & value have to be set at once, calculated from value in response */
    max_seeding_time_enabled: boolean;
    /** enabled & value have to be set at once, -1 disabled */
    max_seeding_time: number;
    /** enabled & value have to be set at once, calculated from value in response */
    max_inactive_seeding_time_enabled: boolean;
    /** enabled & value have to be set at once, -1 disabled */
    max_inactive_seeding_time: number;
    max_ratio_act: RawMaxRatioAction;

    add_trackers_enabled: boolean;
    /** newline seperated */
    add_trackers: string;

    // web ui
    /** semicolon seperated */
    web_ui_domain_list: string;
    web_ui_address: string;
    web_ui_port: number;
    web_ui_upnp: boolean;
    use_https: boolean;
    web_ui_https_cert_path: string;
    web_ui_https_key_path: string;
    web_ui_username: string;
    /** only for setting */
    web_ui_password?: string;
    bypass_local_auth: boolean;
    bypass_auth_subnet_whitelist_enabled: boolean;
    /** newline seperated */
    bypass_auth_subnet_whitelist: string;
    web_ui_max_auth_fail_count: number;
    /** seconds */
    web_ui_ban_duration: number;
    /** seconds */
    web_ui_session_timeout: number;
    alternative_webui_enabled: boolean;
    alternative_webui_path: string;
    web_ui_clickjacking_protection_enabled: boolean;
    web_ui_csrf_protection_enabled: boolean;
    web_ui_secure_cookie_enabled: boolean;
    web_ui_host_header_validation_enabled: boolean;
    web_ui_use_custom_http_headers_enabled: boolean;
    /** newline seperated */
    web_ui_custom_http_headers: string;
    web_ui_reverse_proxy_enabled: boolean;
    /** semicolon seperated */
    web_ui_reverse_proxies_list: string;

    dyndns_enabled: boolean;
    dyndns_service: RawDynDnsService;
    dyndns_username: string;
    dyndns_password: string;
    dyndns_domain: string;

    // rss
    /** minutes */
    rss_refresh_interval: number;
    rss_max_articles_per_feed: number;
    rss_processing_enabled: boolean;
    rss_auto_downloading_enabled: boolean;
    rss_download_repack_proper_episodes: boolean;
    /** newline seperated */
    rss_smart_episode_filters: string;

    // advanced
    resume_data_storage_type: RawResumeDataStorageType;
    /** MiB */
    memory_working_set_limit: number;
    /** empty = any */
    current_network_interface: string;
    /** automaticaly filled, not available to be set */
    current_interface_name: string;
    current_interface_address: string;
    /** minutes */
    save_resume_data_interval: number;
    /** bytes */
    torrent_file_size_limit: number;
    recheck_completed_torrents: boolean;
    /** milliseconds */
    refresh_interval: number;
    resolve_peer_countries: boolean;
    reannounce_when_address_changed: boolean;
    bdecode_depth_limit: number;
    bdecode_token_limit: number;
    async_io_threads: number;
    hashing_threads: number;
    file_pool_size: number;
    /** MiB */
    checking_memory_use: number;
    /** MiB */
    disk_cache: number;
    /** seconds */
    disk_cache_ttl: number;
    /** bytes */
    disk_queue_size: number;
    disk_io_type: RawDiskIOType;
    disk_io_read_mode: RawDiskIOReadMode;
    disk_io_write_mode: RawDiskIOWriteMode;
    enable_coalesce_read_write: boolean;
    enable_piece_extent_affinity: boolean;
    enable_upload_suggestions: boolean;
    /** KiB */
    send_buffer_watermark: number;
    /** KiB */
    send_buffer_low_watermark: number;
    /** percentage 0 - 100 */
    send_buffer_watermark_factor: number;
    /** connections per second */
    connection_speed: number;
    /** KiB, 0 = system default */
    socket_send_buffer_size: number;
    /** KiB, 0 = system default */
    socket_receive_buffer_size: number;
    socket_backlog_size: number;
    /** 0 = disabled */
    outgoing_ports_min: number;
    /** 0 = disabled */
    outgoing_ports_max: number;
    /** 0 = permanent */
    upnp_lease_duration: number;
    peer_tos: number;
    utp_tcp_mixed_mode: RawUtpTcpMixedMode;
    idn_support_enabled: boolean;
    enable_multi_connections_from_same_ip: boolean;
    validate_https_tracker_certificate: boolean;
    ssrf_mitigation: boolean;
    block_peers_on_privileged_ports: boolean;
    enable_embedded_tracker: boolean;
    embedded_tracker_port: number;
    embedded_tracker_port_forwarding: boolean;
    upload_slots_behavior: RawUploadSlotsBehavior;
    upload_choking_algorithm: RawUploadChokingAlgorithm;
    announce_to_all_trackers: boolean;
    announce_to_all_tiers: boolean;
    announce_ip: string;
    max_concurrent_http_announces: number;
    stop_tracker_timeout: number;
    /** percentage 0 - 100 */
    peer_turnover: number;
    /** percentage 0 - 100 */
    peer_turnover_cutoff: number;
    /** seconds */
    peer_turnover_interval: number;
    request_queue_size: number;
};

export type RawLogOptions = {
    normal: boolean;
    info: boolean;
    warning: boolean;
    critical: boolean;
    last_known_id: number;
};

export const RawLogEntryType = {
    normal: 1,
    info: 2,
    warning: 4,
    critical: 8,
} as const;
export type RawLogEntryType = Values<typeof RawLogEntryType>;

export type RawLogEntry = {
    id: number;
    message: string;
    timestamp: number;
    type: RawLogEntryType;
};

export type RawPeerLogEntry = {
    id: number;
    ip: string;
    timestamp: number;
    blocked: boolean;
    reason: string;
};

export const RawTorrentState = {
    error: "error",
    missingFiles: "missingFiles",
    uploading: "uploading",
    pausedUP: "pausedUP",
    queuedUP: "queuedUP",
    stalledUP: "stalledUP",
    checkingUP: "checkingUP",
    forcedUP: "forcedUP",
    downloading: "downloading",
    metaDL: "metaDL",
    forcedMetaDL: "forcedMetaDL",
    pausedDL: "pausedDL",
    queuedDL: "queuedDL",
    stalledDL: "stalledDL",
    checkingDL: "checkingDL",
    forcedDL: "forcedDL",
    checkingResumeData: "checkingResumeData",
    moving: "moving",
    unknown: "unknown",
} as const;
export type RawTorrentState = Values<typeof RawTorrentState>;

export type RawTorrent = {
    /** exists for torrent info but not main sync data, use infohash_v1 and infohash_v2 instead */
    hash?: string;
    infohash_v1: string;
    infohash_v2: string;
    name: string;
    magnet_uri: string;
    /** bytes */
    size: number;
    /** percentage 0-1 */
    progress: number;
    /** B/s */
    dlspeed: number;
    /** B/s */
    upspeed: number;
    priority: number;
    num_seeds: number;
    num_complete: number;
    num_leechs: number;
    num_incomplete: number;
    state: RawTorrentState;
    /** seconds, max is 100 days */
    eta: number;
    seq_dl: boolean;
    f_l_piece_prio: boolean;
    category: string;
    /** comma seperated */
    tags: string;
    super_seeding: boolean;
    force_start: boolean;
    save_path: string;
    download_path: string;
    content_path: string;
    /** seconds since unix epoch */
    added_on: number;
    /** seconds since unix epoch */
    completion_on: number;
    /** first tracker that works */
    tracker: string;
    trackers_count: number;
    /** B/s, 0 = unlimited */
    dl_limit: number;
    /** B/s, 0 = unlimited */
    up_limit: number;
    /** bytes */
    downloaded: number;
    /** bytes */
    uploaded: number;
    /** bytes */
    downloaded_session: number;
    /** bytes */
    uploaded_session: number;
    /** bytes */
    amount_left: number;
    /** bytes */
    completed: number;
    /** calculated from ratio_limit and global limit, -1 no limit */
    max_ratio: number;
    /** calculated from seeding_time_limit and global limit, seconds, -1 no limit */
    max_seeding_time: number;
    /** calculated from inactive_seeding_time_limit and global limit, seconds, -1 no limit */
    max_inactive_seeding_time: number;
    /** max 9999 */
    ratio: number;
    /** -2 = global limit, -1 = no limit */
    ratio_limit: number;
    /** seconds, -2 = global limit, -1 = no limit */
    seeding_time_limit: number;
    /** seconds, -2 = global limit, -1 = no limit */
    inactive_seeding_time_limit: number;
    /** seconds since unix epoch */
    seen_complete: number;
    auto_tmm: boolean;
    /** seconds */
    time_active: number;
    /** seconds */
    seeding_time: number;
    /** seconds since unix epoch */
    last_activity: number;
    /** amount of distributed copies */
    availability: number;
    /** bytes */
    total_size: number;
};

export type RawCategory = {
    name: string;
    savePath: string;
    download_path: string | false | undefined;
};

export const RawConnectionStatus = {
    connected: "connected",
    firewalled: "firewalled",
    disconnected: "disconnected",
} as const;
export type RawConnectionStatus = Values<typeof RawConnectionStatus>;

export type RawTransferInfo = {
    connection_status: RawConnectionStatus;
    dht_nodes: number;
    /** bytes */
    dl_info_data: number;
    /** B/s */
    dl_info_speed: number;
    /** B/s, 0 = unlimited */
    dl_rate_limit: number;
    /** bytes */
    up_info_data: number;
    /** B/s */
    up_info_speed: number;
    /** B/s, 0 = unlimited */
    up_rate_limit: number;
};

export type RawServerState = RawTransferInfo & {
    /** bytes */
    alltime_dl: number;
    /** bytes */
    alltime_ul: number;
    /** milliseconds */
    average_time_queue: number;
    /** bytes */
    free_space_on_disk: number;
    /** number as a string */
    global_ratio: string;
    queued_io_jobs: number;
    queueing: boolean;
    /** number as a string, percentage 0 - 100 */
    read_cache_hits: string;
    /** number as a string, percentage 0 - 100 */
    read_cache_overload: string;
    /** seconds */
    refresh_interval: number;
    /** bytes */
    total_buffers_size: number;
    total_peer_connections: number;
    /** bytes */
    total_queued_size: number;
    /** bytes */
    total_wasted_session: number;
    use_alt_speed_limits: boolean;
    use_subcategories: boolean;
    /** number as a string, percentage 0 - 100 */
    write_cache_overload: string;
};

export type RawMainData =
    | {
          rid: number;
          full_update: undefined;
          server_state?: Partial<RawServerState>;
          categories?: Record<string, Partial<RawCategory>>;
          categories_removed?: string[];
          tags?: string[];
          tags_removed?: string[];
          torrents?: Record<string, Partial<RawTorrent>>;
          torrents_removed?: string[];
          trackers?: Record<string, string[]>;
          trackers_removed?: string[];
      }
    | {
          rid: number;
          full_update: true;
          server_state: RawServerState;
          categories?: Record<string, RawCategory>;
          tags?: string[];
          torrents?: Record<string, RawTorrent>;
          trackers?: Record<string, string[]>;
      };

export const RawConnectionType = {
    uTP: "μTP",
    BT: "BT",
    Web: "Web",
} as const;
export type RawConnectionType = Values<typeof RawConnectionType>;

export type RawPeer = {
    ip: string;
    port: number;
    client: string;
    peer_id_client: string;
    /** percentage 0 - 1 */
    progress: number;
    /** B/s */
    dl_speed: number;
    /** B/s */
    up_speed: number;
    /** bytes */
    downloaded: number;
    /** bytes */
    uploaded: number;
    connection: RawConnectionType;
    flags: string;
    flags_desc: string;
    relevance: number;
    /** newline seperated */
    files?: string;
    countr_code?: string;
    country?: string;
};

export type RawTorrentPeerData =
    | {
          full_update: undefined;
          rid: number;
          peers?: Record<string, Partial<RawPeer>>;
          peers_removed?: string[];
          show_flags?: boolean;
      }
    | {
          full_update: true;
          rid: number;
          peers: Record<string, RawPeer>;
          show_flags: boolean;
      };

export const RawTorrentListFilter = {
    all: "all",
    downloading: "downloading",
    seeding: "seeding",
    completed: "completed",
    resumed: "resumed",
    paused: "paused",
    active: "active",
    inactive: "inactive",
    stalled: "stalled",
    stalledUploading: "stalled_uploading",
    stalledDownloading: "stalled_downloading",
    checking: "checking",
    moving: "moving",
    errored: "errored",
} as const;
export type RawTorrentListFilter = Values<typeof RawTorrentListFilter>;

/** every key of the serialized torrent is sortable */
export const RawTorrentSortKey = {
    hash: "hash",
    infohash_v1: "infohash_v1",
    infohash_v2: "infohash_v2",
    name: "name",
    magnet_uri: "magnet_uri",
    size: "size",
    progress: "progress",
    dlspeed: "dlspeed",
    upspeed: "upspeed",
    priority: "priority",
    num_seeds: "num_seeds",
    num_complete: "num_complete",
    num_leechs: "num_leechs",
    num_incomplete: "num_incomplete",
    state: "state",
    eta: "eta",
    seq_dl: "seq_dl",
    f_l_piece_prio: "f_l_piece_prio",
    category: "category",
    tags: "tags",
    super_seeding: "super_seeding",
    force_start: "force_start",
    save_path: "save_path",
    download_path: "download_path",
    content_path: "content_path",
    added_on: "added_on",
    completion_on: "completion_on",
    tracker: "tracker",
    trackers_count: "trackers_count",
    dl_limit: "dl_limit",
    up_limit: "up_limit",
    downloaded: "downloaded",
    uploaded: "uploaded",
    downloaded_session: "downloaded_session",
    uploaded_session: "uploaded_session",
    amount_left: "amount_left",
    completed: "completed",
    max_ratio: "max_ratio",
    max_seeding_time: "max_seeding_time",
    max_inactive_seeding_time: "max_inactive_seeding_time",
    ratio: "ratio",
    ratio_limit: "ratio_limit",
    seeding_time_limit: "seeding_time_limit",
    inactive_seeding_time_limit: "inactive_seeding_time_limit",
    seen_complete: "seen_complete",
    auto_tmm: "auto_tmm",
    time_active: "time_active",
    seeding_time: "seeding_time",
    last_activity: "last_activity",
    availability: "availability",
    total_size: "total_size",
} satisfies { [TKey in keyof RawTorrent]: TKey };
export type RawTorrentSortKey = Values<typeof RawTorrentSortKey>;

export type RawTorrentListOptions = {
    filter: RawTorrentListFilter;
    category: string;
    /** empty means list untagged */
    tag: string;
    sort: RawTorrentSortKey;
    reverse: boolean;
    limit: number;
    offset: number;
    /** becomes a pipe seperated string */
    hashes: string[];
};

export type RawTorrentProperties = {
    infohash_v1: string;
    infohash_v2: string;
    name: string;
    hash: string;
    /** seconds */
    time_elapsed: number;
    /** seconds */
    seeding_time: number;
    /** seconds, max is 100 days */
    eta: number;
    nb_connections: number;
    /** -1 no limit */
    nb_connections_limit: number;
    /** bytes */
    total_downloaded: number;
    /** bytes */
    total_downloaded_session: number;
    /** bytes */
    total_uploaded: number;
    /** bytes */
    total_uploaded_session: number;
    /** B/s */
    dl_speed: number;
    /** B/s */
    dl_speed_avg: number;
    /** B/s */
    up_speed: number;
    /** B/s */
    up_speed_avg: number;
    /** B/s, 0 = unlimited */
    dl_limit: number;
    /** B/s, 0 = unlimited */
    up_limit: number;
    /** bytes */
    total_wasted: number;
    seeds: number;
    seeds_total: number;
    peers: number;
    peers_total: number;
    share_ratio: number;
    /** seconds until next reannounce */
    reannounce: number;
    /** bytes */
    total_size: number;
    pieces_num: number;
    /** bytes */
    piece_size: number;
    pieces_have: number;
    created_by: string;
    is_private: boolean;
    /** seconds since unix epoch */
    addition_date: number;
    /** -1 invalid */
    last_seen: number;
    /** -1 invalid */
    completion_date: number;
    /** -1 invalid */
    creation_date: number;
    save_path: string;
    download_path: string;
    comment: string;
};

export const RawTrackerStatus = {
    /** only for DHT, PeX and LSD */
    disabled: 0,
    notContacted: 1,
    working: 2,
    updating: 3,
    notWorking: 4,
} as const;
export type RawTrackerStatus = Values<typeof RawTrackerStatus>;

export type RawTracker = {
    url: string;
    /** -1 for DHT, PeX and LSD */
    tier: number;
    status: RawTrackerStatus;
    msg: string;
    num_peers: number;
    num_seeds: number;
    num_leeches: number;
    num_downloaded: number;
};

export type RawWebSeed = {
    url: string;
};

export const RawTorrentFilePriority = {
    ignored: 0,
    normal: 1,
    high: 6,
    maximum: 7,
    mixed: -1,
} as const;
export type RawTorrentFilePriority = Values<typeof RawTorrentFilePriority>;

export type RawTorrentFile = {
    index: number;
    /** percentage 0 - 1 */
    progress: number;
    priority: RawTorrentFilePriority;
    /** bytes */
    size: number;
    /** -1 seeding */
    availability: number;
    /** path */
    name: string;
    /** start inclusive, end exclusive */
    piece_range: [number, number];
    /** true on the first file if torrent is finished */
    is_seed: true | undefined;
};

export const RawPieceState = {
    notDownloaded: 0,
    nowDownloading: 1,
    alreadyDownloaded: 2,
} as const;
export type RawPieceState = Values<typeof RawPieceState>;

export type RawShareLimitsOptions = {
    /** -2 = global, -1 = no limit */
    ratioLimit: number;
    /** -2 = global, -1 = no limit */
    seedingTimeLimit: number;
    /** -2 = global, -1 = no limit */
    inactiveSeedingTimeLimit: number;
};

export type RawRssFeed = {
    uid: string;
    url: string;
};

export type RawRssArticle = {
    id: string;
    date: string;
    isRead?: true;
    torrentURL: string | null;
    [key: string]: unknown;
};

export type RawRssFeedWithArticles = RawRssFeed & {
    title: string;
    lastBuildDate: string;
    isLoading: boolean;
    hasError: boolean;
    articles: RawRssArticle[];
};

/** a tree like structure with folders,  */
export type RawRssFeeds<TWithData extends boolean> = {
    [path: string]:
        | RawRssFeeds<TWithData>
        | (TWithData extends true ? RawRssFeedWithArticles : RawRssFeed);
};

export const RawRssTorrentOperatingMode = {
    autoManaged: "AutoManaged",
    forced: "Forced",
} as const;
export type RawRssTorrentOperatingMode = Values<typeof RawRssTorrentOperatingMode>;

export type RawRssTorrentParams = {
    category: string;
    tags: string[];
    save_path: string[];
    download_path: string;
    operating_mode: RawRssTorrentOperatingMode;
    skip_checking: boolean;

    /** B/s, -1 = global limit, 0 = unlimited */
    upload_limit: number;
    /** B/s, -1 = global limit, 0 = unlimited */
    download_limit: number;
    /** seconds, -2 = global limit, -1 = no limit */
    seeding_time_limit: number;
    /** seconds, -2 = global limit, -1 = no limit */
    inactive_seeding_time_limit: number;
    /** -2 = global limit, -1 = no limit */
    ratio_limit: number;

    add_to_top_of_queue?: boolean;
    /** add paused, null = global, false = never, true = always */
    stopped?: boolean;
    stop_condition?: RawTorrentStopCondition;
    content_layout?: RawTorrentContentLayout;
    use_auto_tmm?: boolean;
    use_download_path?: boolean;
};

export type RawRssRule = {
    enabled: boolean;
    priority: number;
    useRegex: boolean;
    mustContain: string;
    mustNotContain: string;
    episodeFilter: string;
    /** rss feed urls */
    affectedFeeds: string[];
    /** RFC2822 date */
    lastMatch: string;
    ignoreDays: number;
    smartFilter: boolean;
    /** always empty ? */
    previouslyMatchedEpisodes: string[];

    torrentParams: RawRssTorrentParams;

    /** deprecated, use torrentParams */
    savePath?: string;
    /** deprecated, use torrentParams */
    assignedCategory?: string;
    /** deprecated, use torrentParams */
    addPaused?: boolean | null;
    /** deprecated, use torrentParams */
    torrentContentLayout?: RawTorrentContentLayout | null;
    /** deprecated, use torrentParams */
    createSubfolder?: boolean | null;
};

export const RawSearchStatusType = {
    Stopped: "Stopped",
    Running: "Running",
} as const;
export type RawSearchStatusType = Values<typeof RawSearchStatusType>;

export type RawSearchStatus = {
    id: number;
    status: RawSearchStatusType;
    total: number;
};

export type RawSearchResultOptions = {
    id: number;
    limit?: number;
    offset?: number;
};

export type RawSearchResult = {
    fileName: string;
    fileUrl: string;
    /** bytes */
    fileSize: number;
    nbSeeders: number;
    nbLeechers: number;
    siteUrl: string;
    descrLink: string;
};

export type RawSearchResults = {
    status: RawSearchStatusType;
    results: RawSearchResult[];
    total: number;
};

export type RawSearchPluginCategory = {
    id: string;
    name: string;
};

export type RawSearchPlugin = {
    /** basicly id */
    name: string;
    version: string;
    fullName: string;
    url: string;
    supportedCategories: RawSearchPluginCategory[];
    enabled: boolean;
};

export type RawTorrentAddOptions = {
    cookie: string;
    skip_checking: boolean;
    sequantialDownload: boolean;
    firstLastPiecePrio: boolean;
    addToTopOfQueue: boolean;
    paused: boolean;
    savepath: string;
    downloadPath: string;
    useDownloadPath: boolean;
    category: string;
    /** becomes a comma seperated list */
    tags: string[];
    rename: string;
    /** B/s, -1 unlimited */
    upLimit: number;
    /** B/s, -1 unlimited */
    dlLimit: number;
    ratioLimit: number;
    /** seconds */
    seedingTimeLimit: number;
    /** seconds */
    inactiveSeedingTimeLimit: number;
    autoTMM: boolean;
    stopCondition: RawTorrentStopCondition;
    contentLayout: RawTorrentContentLayout;
};

export const SpeedLimitsMode = {
    global: "0",
    alternative: "1",
} as const;
export type RawSpeedLimitsMode = Values<typeof SpeedLimitsMode>;

export type RawAddedPeerStats = {
    added: number;
    failed: number;
};

export type RawCreateCategoryOptions = {
    category: string;
    savePath?: string;
    downloadPathEnabled?: boolean;
    /** downloadPathEnabled has to be set for this to take effect */
    downloadPath?: string;
};

export type RawEditCategoryOptions = {
    category: string;
    savePath: string;
    downloadPathEnabled?: boolean;
    /** downloadPathEnabled has to be set for this to take effect */
    downloadPath?: string;
};

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

    // MARK: Authentication

    public async login(username: string, password: string) {
        const res = await this.qbit.fetch(
            "auth/login",
            {
                method: "POST",
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(
                    password
                )}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
            false
        );
        if (res.status === 403) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        const session = res.headers.get("set-cookie")?.split(";")?.[0];
        if (session === null || session === undefined) {
            throw new Error("Invalid credentials");
        }
        return session;
    }

    public async logout() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("auth/logout", {
            method: "POST",
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    // MARK: Application

    public async getApplicationVersion() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/version");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return (await res.text()).trim();
    }

    public async getApiVersion() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/webapiVersion");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return (await res.text()).trim();
    }

    public async getBuildInfo() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/buildInfo");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawBuildInfo>;
    }

    public async shutdown() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/shutdown", {
            method: "POST",
        });
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
        const res = await this.qbit.fetch("app/setPreferences", {
            method: "POST",
            body: `json=${encodeURIComponent(JSON.stringify(preferences))}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** unnecessary, getPreferences already returns save_path */
    public async getDefaultSavePath() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/defaultSavePath");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text();
    }

    public async getNetworkInterfaces() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("app/networkInterfaceList");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json().then((ifs) => (ifs as { value: string }[]).map((iface) => iface.value));
    }

    public async getNetworkInterfaceAddresses(iface: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`app/networkInterfaceAddressList?iface=${iface}`);
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<string[]>;
    }

    // MARK: Log

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

    // MARK: Sync

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

    // MARK: Transfer info

    public async getTransferInfo() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/info");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTransferInfo>;
    }

    public async getGlobalUploadLimit() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/uploadLimit");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return parseFloat(await res.text());
    }

    public async getGlobalDownloadLimit() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/downloadLimit");
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

    public async getSpeedLimitsMode() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/speedLimitsMode");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text() as Promise<RawSpeedLimitsMode>;
    }

    public async setSpeedLimitsMode(mode: RawSpeedLimitsMode) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/setSpeedLimitsMode", {
            method: "POST",
            body: `mode=${mode}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async toggleSpeedLimitsMode() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/toggleSpeedLimitsMode", {
            method: "POST",
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async banPeers(peers: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("transfer/banPeers", {
            method: "POST",
            body: `peers=${encodeURIComponent(Array.isArray(peers) ? peers.join("|") : peers)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    // MARK: Torrent management

    public async getTorrentCount() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/count");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        const num = parseInt(await res.text(), 10);
        if (isNaN(num)) throw new Error("Invalid response");
        return num;
    }

    public async getTorrents(opts: Partial<RawTorrentListOptions> = {}) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/info?${Object.entries(opts)
                .map(
                    ([key, val]) =>
                        `${key}=${Array.isArray(val) ? val.map((v) => encodeURIComponent(v)).join("|") : encodeURIComponent(val.toString())}`
                )
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

    public async getTorrentFiles(hash: string, indexes?: number | number[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/files?hash=${encodeURIComponent(hash)}${
                indexes
                    ? `&indexes=${encodeURIComponent(Array.isArray(indexes) ? indexes.join("|") : indexes)}`
                    : ""
            }`
        );
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawTorrentFile[]>;
    }

    public async getTorrentPieceHashes(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/pieceHashes?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<string[]>;
    }

    public async getTorrentPieceStates(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/pieceStates?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawPieceState[]>;
    }

    /**
     * returns true if something was added
     * http(s) urls always return true
     * @param torrents file buffers, links to torrent files or magnet uris
     * @param opts options for the added torrents
     */
    public async addTorrent(
        torrent: Buffer | string | (Buffer | string)[],
        opts?: Partial<RawTorrentAddOptions>
    ): Promise<boolean> {
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
                    throw Error(`Invalid torrent string "${torrent}"`);
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
        // fix for formdata bugs
        data.set("fix", "fix");
        const res = await this.qbit.fetch("torrents/add", {
            method: "POST",
            body: data,
        });
        if (res.status === 415) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return (await res.text()) === "Ok.";
    }

    public async addTorrentTrackers(hash: string, trackers: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/addTrackers", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&urls=${encodeURIComponent(
                Array.isArray(trackers) ? trackers.join("\n") : trackers
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.text();
    }

    public async editTorrentTrackers(hash: string, origUrl: string, newUrl: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/editTracker", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&origUrl=${encodeURIComponent(
                origUrl
            )}&newUrl=${encodeURIComponent(newUrl)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeTorrentTracker(hash: string, trackers: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/removeTrackers", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&urls=${encodeURIComponent(
                Array.isArray(trackers) ? trackers.join("|") : trackers
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async addTorrentPeers(hashes: string | string[] | "all", peers: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/addPeers", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&peers=${encodeURIComponent(Array.isArray(peers) ? peers.join("|") : peers)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, RawAddedPeerStats>>;
    }

    public async pauseTorrents(hashes: string | string[] | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/pause", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async resumeTorrents(hashes: string | string[] | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/resume", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentFilePriority(
        hash: string,
        fileIndexes: number | number[],
        priority: RawTorrentFilePriority
    ) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/filePrio", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&id=${encodeURIComponent(
                Array.isArray(fileIndexes) ? fileIndexes.join("|") : fileIndexes
            )}&priority=${priority}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** 0 is unlimited, -1 not found */
    public async getTorrentUploadLimit(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/uploadLimit?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, number>>;
    }

    /** 0 is unlimited, -1 not found */
    public async getTorrentDownloadLimit(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            `torrents/downloadLimit?hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}`
        );
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, number>>;
    }

    /** 0 is unlimited */
    public async setTorrentUploadLimit(hashes: string | string[] | "all", limit: number) {
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

    /** 0 is unlimited */
    public async setTorrentDownloadLimit(hashes: string | string[] | "all", limit: number) {
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

    public async setTorrentShareLimits(
        hashes: string | string[] | "all",
        opts: RawShareLimitsOptions
    ) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setShareLimits", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}&${Object.entries(
                opts
            )
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&")}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async toggleTorrentSequentialDownload(hashes: string | string[] | "all") {
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

    public async setTorrentSuperSeeding(hashes: string | string[] | "all", enabled: boolean) {
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

    public async setTorrentForceStart(hashes: string | string[] | "all", enabled: boolean) {
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

    public async deleteTorrents(hashes: string | string[] | "all", deleteFiles: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/delete", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&deleteFiles=${deleteFiles}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async increaseTorrentPriority(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/increasePrio", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async decreaseTorrentPriority(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/decreasePrio", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentTopPriority(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/topPrio", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentBottomPriority(hashes: string | string[]) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/bottomPrio", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentLocation(hashes: string | string[] | "all", location: string) {
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
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentSavePath(hashes: string | string[] | "all", path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            "torrents/setSavePath",
            {
                method: "POST",
                body: `id=${encodeURIComponent(
                    Array.isArray(hashes) ? hashes.join("|") : hashes
                )}&path=${encodeURIComponent(path)}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
            false
        );
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 403) throw new Error(await res.text());
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentDownloadPath(hashes: string | string[] | "all", path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(
            "torrents/setDownloadPath",
            {
                method: "POST",
                body: `id=${encodeURIComponent(
                    Array.isArray(hashes) ? hashes.join("|") : hashes
                )}&path=${encodeURIComponent(path)}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
            false
        );
        if (res.status === 403) throw new Error(await res.text());
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async renameTorrent(hash: string, name: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/rename", {
            method: "POST",
            body: `hash=${encodeURIComponent(hash)}&name=${encodeURIComponent(name)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setTorrentAutoManagement(hashes: string | string[] | "all", enabled: boolean) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/setAutoManagement", {
            method: "POST",
            body: `hashes=${encodeURIComponent(
                Array.isArray(hashes) ? hashes.join("|") : hashes
            )}&enable=${enabled}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async recheckTorrents(hashes: string | string[] | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/recheck", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async reannounceTorrents(hashes: string | string[] | "all") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/reannounce", {
            method: "POST",
            body: `hashes=${encodeURIComponent(Array.isArray(hashes) ? hashes.join("|") : hashes)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** empty to uncategorize */
    public async setTorrentCategory(hashes: string | string[] | "all", category: string) {
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
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async createCategory(opts: RawCreateCategoryOptions) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/createCategory", {
            method: "POST",
            body: Object.entries(opts)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&"),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async editCategory(opts: RawEditCategoryOptions) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/editCategory", {
            method: "POST",
            body: Object.entries(opts)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&"),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 400) throw new Error(await res.text());
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async removeCategories(names: string | string[]) {
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

    public async getCategories() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/categories");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<Record<string, RawCategory>>;
    }

    public async addTorrentTags(hashes: string | string[] | "all", tags: string | string[]) {
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

    /** empty to remove all */
    public async removeTorrentTags(hashes: string | string[] | "all", tags: string | string[]) {
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

    public async createTags(names: string | string[]) {
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

    public async deleteTags(names: string | string[]) {
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

    public async getTags() {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("torrents/tags");
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<string[]>;
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
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
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
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async exportTorrent(hash: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`torrents/export?hash=${encodeURIComponent(hash)}`);
        if (res.status === 404) throw new Error("Torrent not found");
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.blob();
    }

    // MARK: RSS

    /** path uses \ seperator, parent folders must exists */
    public async addRssFolder(path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/addFolder", {
            method: "POST",
            body: `path=${encodeURIComponent(path)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** if path is empty, uses the name from the feed, if path is given seperator is \ and must inlude a name */
    public async addRssFeed(url: string, path = "") {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/addFeed", {
            method: "POST",
            body: `url=${encodeURIComponent(url)}&path=${encodeURIComponent(path)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    public async setRssFeedUrl(path: string, url: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/setFeedURL", {
            method: "POST",
            body: `path=${encodeURIComponent(path)}&url=${encodeURIComponent(url)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** remove rss feed or folder and it's contents */
    public async removeRssItem(path: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/removeItem", {
            method: "POST",
            body: `path=${encodeURIComponent(path)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** move rss feed or folder and it's contents */
    public async moveRssItem(srcPath: string, destPath: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/moveItem", {
            method: "POST",
            body: `itemPath=${encodeURIComponent(srcPath)}&destPath=${encodeURIComponent(
                destPath
            )}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** get the tree of folders and rss feeds */
    public async getRssItems<TWithData extends boolean>(withdata: TWithData) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch(`rss/items?withdata=${withdata.toString()}`);
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawRssFeeds<TWithData>>;
    }

    /** mark rss feed, folder or article as read, path has to be to a feed when marking article */
    public async markRssItemAsRead(path: string, articleId?: string) {
        await this.qbit.checkLogin();
        const res = await this.qbit.fetch("rss/markAsRead", {
            method: "POST",
            body: `itemPath=${encodeURIComponent(path)}${
                articleId ? `&articleId=${encodeURIComponent(articleId)}` : ""
            }`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }

    /** refresh rss feed or folder, empty string = root folder (all) */
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

    /** everything is optional but should be given or they will be overriden by default values */
    public async setRssRule(ruleName: string, ruleDef: DeepPartial<RawRssRule>) {
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

    // MARK: Search

    /** returns search id, multi and enabled are identical as plugins */
    public async startSearch(
        query: string,
        category: string | "all",
        plugins: string | string[] | "all" | "enabled" | "multi"
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
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        const { id } = (await res.json()) as { id: number };
        return id;
    }

    public async stopSearch(id: number) {
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

    public async getSearchStatus(id?: number) {
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
        if (res.status === 409) throw new Error(await res.text());
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
        return res.json() as Promise<RawSearchResults>;
    }

    public async deleteSearch(id: number) {
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

    public async installSearchPlugin(sources: string | string[]) {
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

    public async uninstallSearchPlugin(names: string | string[]) {
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

    public async enableSearchPlugin(names: string | string[], enable: boolean) {
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
        const res = await this.qbit.fetch("search/updatePlugins", {
            method: "POST",
        });
        if (res.status !== 200) throw new Error(`Unexpected status "${res.status}"`);
    }
}
