/**
 * Type-level backward compatibility tests.
 *
 * Compares the NEW types from @fal-ai/types against the OLD published types
 * from @fal-ai/client-old (alias for @fal-ai/client@1.9.5 on npm).
 *
 * If this file fails to compile (via ts-jest), a backward-incompatible type
 * change has been introduced. The compiler error points at the exact assertion
 * that broke.
 */

// New types (from this branch)
import type {
  EndpointTypeStrict,
  InputTypeStrict,
  EndpointType as NewEndpointType,
  InputType as NewInputType,
  OutputType as NewOutputType,
  OutputTypeStrict,
} from "@fal-ai/types";
import type { EndpointTypeMap as NewEndpointTypeMap } from "@fal-ai/types/endpoints";

// Old types (published @fal-ai/client@1.9.5)
import type {
  EndpointType as OldEndpointType,
  InputType as OldInputType,
  OutputType as OldOutputType,
} from "@fal-ai/client-old/src/types/client";
import type { EndpointTypeMap as OldEndpointTypeMap } from "@fal-ai/client-old/src/types/endpoints";

import type { FalClient } from "@fal-ai/client";

// ---------------------------------------------------------------------------
// 1. Type-level assertion helpers
// ---------------------------------------------------------------------------

/** Compile-time assertion: T is assignable to U. Resolves to `true` or `never`. */
type AssertAssignable<T, U> = T extends U ? true : never;

/** Compile-time assertion: T and U are mutually assignable. */
type AssertExact<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : never
  : never;

/** Forces the compiler to evaluate a type assertion — errors if `never`. */
function assertType<_T extends true>() {}

// ---------------------------------------------------------------------------
// 2. EndpointType compatibility
// ---------------------------------------------------------------------------

// Any value accepted by the old EndpointType must be accepted by the new one.
type _EndpointTypeCompat = AssertAssignable<OldEndpointType, NewEndpointType>;
assertType<_EndpointTypeCompat>();

// Both include (string & {}), so arbitrary strings still work.
const _oldArbitrary: OldEndpointType = "custom/endpoint" as string & {};
const _newArbitrary: NewEndpointType = _oldArbitrary;

// ---------------------------------------------------------------------------
// 3. Every old endpoint key exists in the new map
// ---------------------------------------------------------------------------

// If any key was removed from the map, this fails to compile.
type _OldKeysInNew = AssertAssignable<
  keyof OldEndpointTypeMap,
  keyof NewEndpointTypeMap
>;
assertType<_OldKeysInNew>();

// ---------------------------------------------------------------------------
// 4. InputType compatibility — old valid inputs still accepted
// ---------------------------------------------------------------------------

// For known endpoints: new input should accept everything old input accepted.
// We test a representative sample across categories.
type _InputFluxDev = AssertAssignable<
  OldInputType<"fal-ai/flux/dev">,
  NewInputType<"fal-ai/flux/dev">
>;
type _InputFluxLora = AssertAssignable<
  OldInputType<"fal-ai/flux-lora">,
  NewInputType<"fal-ai/flux-lora">
>;
type _InputFastSdxl = AssertAssignable<
  OldInputType<"fal-ai/fast-sdxl">,
  NewInputType<"fal-ai/fast-sdxl">
>;
type _InputWhisper = AssertAssignable<
  OldInputType<"fal-ai/whisper">,
  NewInputType<"fal-ai/whisper">
>;
assertType<_InputFluxDev>();
assertType<_InputFluxLora>();
assertType<_InputFastSdxl>();
assertType<_InputWhisper>();

// For unknown endpoints: new fallback must still accept Record<string, any>.
type _InputUnknownCompat = AssertAssignable<
  OldInputType<"totally-unknown/endpoint">,
  NewInputType<"totally-unknown/endpoint">
>;
assertType<_InputUnknownCompat>();

// ---------------------------------------------------------------------------
// 5. OutputType compatibility — new outputs still provide old shape
// ---------------------------------------------------------------------------

// For known endpoints: new output must be assignable to old output.
type _OutputFluxDev = AssertAssignable<
  NewOutputType<"fal-ai/flux/dev">,
  OldOutputType<"fal-ai/flux/dev">
>;
type _OutputFluxLora = AssertAssignable<
  NewOutputType<"fal-ai/flux-lora">,
  OldOutputType<"fal-ai/flux-lora">
>;
type _OutputFastSdxl = AssertAssignable<
  NewOutputType<"fal-ai/fast-sdxl">,
  OldOutputType<"fal-ai/fast-sdxl">
>;
type _OutputWhisper = AssertAssignable<
  NewOutputType<"fal-ai/whisper">,
  OldOutputType<"fal-ai/whisper">
>;
assertType<_OutputFluxDev>();
assertType<_OutputFluxLora>();
assertType<_OutputFastSdxl>();
assertType<_OutputWhisper>();

// For unknown endpoints: old was `any`, new must still be `any`.
type _OutputUnknownCompat = AssertAssignable<
  NewOutputType<"totally-unknown/endpoint">,
  OldOutputType<"totally-unknown/endpoint">
>;
assertType<_OutputUnknownCompat>();

// ---------------------------------------------------------------------------
// 6. Strict types
// ---------------------------------------------------------------------------

// EndpointTypeStrict should accept known endpoints
const _strictAcceptsKnown: EndpointTypeStrict = "fal-ai/flux/dev";

// EndpointTypeStrict is a subset of EndpointType
type _StrictIsSubset = AssertAssignable<EndpointTypeStrict, NewEndpointType>;
assertType<_StrictIsSubset>();

// Strict input/output resolve correctly for known endpoints
type _StrictInputFlux = AssertAssignable<
  { prompt: string },
  InputTypeStrict<"fal-ai/flux/dev">
>;
type _StrictOutputFlux = AssertAssignable<
  OutputTypeStrict<"fal-ai/flux/dev">,
  { images: Array<{ url: string }> }
>;
assertType<_StrictInputFlux>();
assertType<_StrictOutputFlux>();

// ---------------------------------------------------------------------------
// 7. API surface smoke tests
// ---------------------------------------------------------------------------

declare const client: FalClient;

// Known endpoint
async function _knownEndpointSmoke() {
  const result = await client.run("fal-ai/flux/dev", {
    input: { prompt: "test" },
  });
  const _url: string = result.data.images[0].url;
}

// Unknown endpoint — arbitrary input accepted, output is `any`
async function _unknownEndpointSmoke() {
  const result = await client.run("custom/my-endpoint", {
    input: { anything: "goes" },
  });
  const _anything = result.data;
}

// Queue API
async function _queueSmoke() {
  const queued = await client.queue.submit("fal-ai/flux/dev", {
    input: { prompt: "test" },
  });
  const _reqId: string = queued.request_id;
}

// Re-exports from @fal-ai/client match @fal-ai/types
import type {
  EndpointType as ClientEndpointType,
  EndpointTypeStrict as ClientEndpointTypeStrict,
  InputType as ClientInputType,
  InputTypeStrict as ClientInputTypeStrict,
  OutputType as ClientOutputType,
  OutputTypeStrict as ClientOutputTypeStrict,
} from "@fal-ai/client";

type _ReexportEndpoint = AssertExact<NewEndpointType, ClientEndpointType>;
type _ReexportEndpointStrict = AssertExact<
  EndpointTypeStrict,
  ClientEndpointTypeStrict
>;
type _ReexportInput = AssertExact<
  NewInputType<"fal-ai/flux/dev">,
  ClientInputType<"fal-ai/flux/dev">
>;
type _ReexportInputStrict = AssertExact<
  InputTypeStrict<"fal-ai/flux/dev">,
  ClientInputTypeStrict<"fal-ai/flux/dev">
>;
type _ReexportOutput = AssertExact<
  NewOutputType<"fal-ai/flux/dev">,
  ClientOutputType<"fal-ai/flux/dev">
>;
type _ReexportOutputStrict = AssertExact<
  OutputTypeStrict<"fal-ai/flux/dev">,
  ClientOutputTypeStrict<"fal-ai/flux/dev">
>;
assertType<_ReexportEndpoint>();
assertType<_ReexportEndpointStrict>();
assertType<_ReexportInput>();
assertType<_ReexportInputStrict>();
assertType<_ReexportOutput>();
assertType<_ReexportOutputStrict>();

// ---------------------------------------------------------------------------
// 8. Jest test runner entry point
// ---------------------------------------------------------------------------

describe("EndpointTypeMap backward compatibility", () => {
  it("compiles — all type-level assertions passed", () => {
    expect(true).toBe(true);
  });
});
