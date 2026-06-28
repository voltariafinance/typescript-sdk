<!-- voltaria-readme-assembled -->
# Voltaria TypeScript SDK

## Quickstart

```bash
npm install voltaria-sdk
```

Construct the client with just your API key — the environment is derived from the
key prefix, so you don't configure a base URL:

```typescript
import { VoltariaClient } from "voltaria-sdk";

const client = new VoltariaClient("live_...");        // production
// const client = new VoltariaClient("sandbox_...");  // sandbox

const loans = await client.loans.listLoans();
```

| Key prefix | Environment | Base URL                          |
| ---------- | ----------- | --------------------------------- |
| `live_`    | Production  | `https://api.voltaria.io`         |
| `sandbox_` | Sandbox     | `https://api.sandbox.voltaria.io` |

Pass `{ environment }` or `{ baseUrl }` to override routing.

Full API documentation: https://docs.voltaria.io
