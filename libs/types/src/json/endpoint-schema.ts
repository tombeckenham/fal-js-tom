// AUTO-GENERATED - Do not edit manually
// Generated from types.gen.ts via scripts/generate-endpoint-maps.ts

import { z } from "zod";

import {
  zBagelUnderstandInput,
  zBagelUnderstandOutput,
  zFfmpegApiLoudnormInput,
  zFfmpegApiLoudnormOutput,
  zFfmpegApiMetadataInput,
  zFfmpegApiMetadataOutput,
  zFfmpegApiWaveformInput,
  zFfmpegApiWaveformOutput,
  zFiboEditEditStructuredInstructionInput,
  zFiboEditEditStructuredInstructionOutput,
  zFiboGenerateStructuredPromptInput,
  zFiboGenerateStructuredPromptOutput,
  zFiboLiteGenerateStructuredPromptInput,
  zFiboLiteGenerateStructuredPromptLiteInput,
  zFiboLiteGenerateStructuredPromptLiteOutput,
  zFiboLiteGenerateStructuredPromptOutput,
} from "./zod.gen";

/** Zod schema for json endpoints using discriminatedUnion */
export const JsonEndpointSchema = z.discriminatedUnion("endpoint", [
  z.object({
    endpoint: z.literal("fal-ai/bagel/understand"),
    input: zBagelUnderstandInput,
    output: zBagelUnderstandOutput,
  }),
  z.object({
    endpoint: z.literal("fal-ai/ffmpeg-api/loudnorm"),
    input: zFfmpegApiLoudnormInput,
    output: zFfmpegApiLoudnormOutput,
  }),
  z.object({
    endpoint: z.literal("fal-ai/ffmpeg-api/waveform"),
    input: zFfmpegApiWaveformInput,
    output: zFfmpegApiWaveformOutput,
  }),
  z.object({
    endpoint: z.literal("fal-ai/ffmpeg-api/metadata"),
    input: zFfmpegApiMetadataInput,
    output: zFfmpegApiMetadataOutput,
  }),
  z.object({
    endpoint: z.literal("bria/fibo-edit/edit/structured_instruction"),
    input: zFiboEditEditStructuredInstructionInput,
    output: zFiboEditEditStructuredInstructionOutput,
  }),
  z.object({
    endpoint: z.literal("bria/fibo-lite/generate/structured_prompt"),
    input: zFiboLiteGenerateStructuredPromptInput,
    output: zFiboLiteGenerateStructuredPromptOutput,
  }),
  z.object({
    endpoint: z.literal("bria/fibo-lite/generate/structured_prompt/lite"),
    input: zFiboLiteGenerateStructuredPromptLiteInput,
    output: zFiboLiteGenerateStructuredPromptLiteOutput,
  }),
  z.object({
    endpoint: z.literal("bria/fibo/generate/structured_prompt"),
    input: zFiboGenerateStructuredPromptInput,
    output: zFiboGenerateStructuredPromptOutput,
  }),
]);

/** Inferred type from JsonEndpointSchema */
export type JsonEndpoint = z.infer<typeof JsonEndpointSchema>;
