import { z } from "zod";

export const PestRecordSchema = z.object({
  id: z.string(),
  species: z.string(),
  count: z.number(),
  location: z.string(),
  detectedAt: z.string(),
});

export const CreatePestSchema = PestRecordSchema.omit({
  id: true,
  detectedAt: true,
});

export type PestRecord = z.infer<typeof PestRecordSchema>;
export type CreatePestInput = z.infer<typeof CreatePestSchema>;
