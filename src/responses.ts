import { z } from "zod"

type DataSchema<T> = z.ZodType<T>

export const successResponseSchema = <T>(
	dataSchema: DataSchema<T>
) =>
	z
		.object({
			ok: z.literal(true),
			data: dataSchema
		})
		.strict()

export const errorResponseSchema = z
	.object({
		ok: z.literal(false),
		error: z.string().min(1)
	})
	.strict()

export const apiResponseSchema = <T>(
	successDataSchema: DataSchema<T>
) =>
	z.discriminatedUnion("ok", [
		successResponseSchema(successDataSchema),
		errorResponseSchema
	])
