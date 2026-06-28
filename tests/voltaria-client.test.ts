import { describe, expect, it } from "vitest";

import { VoltariaEnvironment } from "../generated/environments.js";
import { InvalidApiKeyError, VoltariaClient } from "../src/index.js";

// The generated client stores the resolved options on `_options` (protected).
// Reach in for assertions — this is a white-box test of routing only.
function resolved(client: VoltariaClient): { environment?: string; baseUrl?: string } {
    return (client as unknown as { _options: { environment?: string; baseUrl?: string } })._options;
}

describe("VoltariaClient prefix-based routing", () => {
    it("routes live_ keys to production", () => {
        const client = new VoltariaClient("live_abc123");
        expect(resolved(client).environment).toBe(VoltariaEnvironment.Production);
    });

    it("routes sandbox_ keys to sandbox", () => {
        const client = new VoltariaClient("sandbox_abc123");
        expect(resolved(client).environment).toBe(VoltariaEnvironment.Sandbox);
    });

    it("throws InvalidApiKeyError on an unrecognized prefix", () => {
        expect(() => new VoltariaClient("bogus_abc123")).toThrow(InvalidApiKeyError);
    });

    it("throws InvalidApiKeyError on an empty key", () => {
        expect(() => new VoltariaClient("")).toThrow(InvalidApiKeyError);
    });

    it("lets an explicit baseUrl override prefix routing", () => {
        const client = new VoltariaClient("live_abc123", {
            baseUrl: "https://staging.voltaria.io",
        });
        expect(resolved(client).baseUrl).toBe("https://staging.voltaria.io");
        expect(resolved(client).environment).toBeUndefined();
    });

    it("lets an explicit environment override prefix routing", () => {
        const client = new VoltariaClient("live_abc123", {
            environment: VoltariaEnvironment.Sandbox,
        });
        expect(resolved(client).environment).toBe(VoltariaEnvironment.Sandbox);
    });
});
