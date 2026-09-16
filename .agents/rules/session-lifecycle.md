# Session Lifecycle & Project Rules

This workspace follows the guidelines in `AGENTS.md`.

## Mandatory Triggers

### When the user says "terminate":
1. Run `docker compose stop` to stop all running Docker containers.
2. Generate/update `handoff.md` at the project root with:
   - Summary of completed work in this session
   - Current status of the services and builds
   - Modified files and key architectural/design decisions
   - Next steps for the next session
3. Provide a brief confirmation message that containers are stopped and handoff is ready.

### When the user says "start":
1. Read `handoff.md` from the project root.
2. Run `docker compose up -d` to spin up PostgreSQL and MinIO containers.
3. Give the user a very quick, concise recap of the previous session and current status.
