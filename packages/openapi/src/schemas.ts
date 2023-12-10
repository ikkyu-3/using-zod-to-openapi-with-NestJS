import { z } from "zod";

export const LimitQuerySchema = z.number().int().max(100).optional();
export type LimitQuery = z.infer<typeof LimitQuerySchema>;

export const PetSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  tag: z.string().optional(),
});
export type Pet = z.infer<typeof PetSchema>;

export const PetsSchema = z.array(PetSchema).max(100);
export type Pets = z.infer<typeof PetsSchema>;

export const ErrorSchema = z.object({
  code: z.number().int(),
  message: z.string(),
});
export type Error = z.infer<typeof ErrorSchema>;

export const NewPetSchema = z.object({
  name: z.string(),
  tag: z.string().optional(),
});
export type NewPet = z.infer<typeof NewPetSchema>;
