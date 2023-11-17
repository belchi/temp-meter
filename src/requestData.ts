export interface Channel {
    id: number,
    name: string,
    field1: string,
    created_at: string,
    updated_at: string
}

export interface Feed {
    entry_id: number,
    created_at: string,
    field1: string
}

export interface Items {
    channel: Channel,
    feeds: Feed[]
}
