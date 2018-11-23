CREATE TABLE IF NOT EXISTS meta_events (
    topic TEXT,
    name TEXT,
    parameters JSON,
    CONSTRAINT unique_meta_event UNIQUE(topic)
)
