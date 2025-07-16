## CQRS PoC

This project demonstrates the Command Query Responsibility Segregation (CQRS) pattern using Node.js and Apache Kafka. It separates write (command) and read (query) operations into different services, communicating via Kafka events.

### Architecture

- **Command Service**: Accepts write requests (commands) via HTTP and publishes events to Kafka.
- **Query Service**: Subscribes to Kafka events and updates a read-optimized in-memory store.
- **Read API**: Exposes HTTP endpoints to query the current state from the read store.
- **Kafka**: Acts as the event bus between services.

```
Client → Command Service → Kafka → Query Service → Read API
```

### How it works

1. The client sends a command (e.g., createUser) to the Command Service.
2. The Command Service publishes an event to Kafka.
3. The Query Service consumes the event and updates its read store.
4. The client can query the Read API to get the current state.

---

## Setup & Run

### 1. Start Kafka and Zookeeper (using Docker Compose)

If you have Docker and Docker Compose installed, start the services:

```bash
docker compose up -d
```

This will start Zookeeper and Kafka containers. Kafka will be available at `localhost:9092`.

### 2. Install dependencies

In each service directory, run:

```bash
cd command-service && npm install
cd ../query-service && npm install
cd ../read-api && npm install
```

### 3. Run the services

Open three terminals and run each service:

```bash
# Terminal 1
cd command-service
npm start

# Terminal 2
cd query-service
npm start

# Terminal 3
cd read-api
npm start
```

---

## Test the PoC

Send a command to create a user:

```bash
curl -X POST http://localhost:3001/commands \
  -H "Content-Type: application/json" \
  -d '{"type":"createUser","payload":{"id":1,"name":"Alice"}}'
```

Query the current users:

```bash
curl http://localhost:3002/users
```

---

## Notes

- This PoC uses an in-memory store for simplicity. For production, use a persistent database for the read side.
- Kafka and Zookeeper must be running before starting the Node.js services.
