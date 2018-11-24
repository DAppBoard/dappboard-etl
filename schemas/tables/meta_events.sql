CREATE TABLE IF NOT EXISTS meta_events (
    topic TEXT,
    address TEXT,
    name TEXT,
    parameters JSON,
    CONSTRAINT unique_meta_event UNIQUE(topic, address)
);

CREATE INDEX meta_events_topic ON meta_events USING btree (topic);
CREATE INDEX meta_events_address ON meta_events USING btree (address);
