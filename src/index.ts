// Public package entry point.
//
// Re-exports the full generated surface (the `Voltaria` type namespace,
// `VoltariaEnvironment`, error classes, …) and then overrides the generated
// `VoltariaClient` with the hand-written wrapper that adds prefix-based
// environment routing. An explicit named re-export takes precedence over the
// `export *` wildcard for the same name.

export * from "../generated/index.js";
export {
    VoltariaClient,
    InvalidApiKeyError,
    type VoltariaClientOptions,
} from "./voltaria-client.js";
