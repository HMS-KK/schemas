import { z } from "zod"

/**
 * This is exclusive to Multer, which is used in our bucket, therefor it's mandatory to have
 */
export const originalFileDataSchema = z
	.object({
		filename: z.string().min(1),
		mimetype: z.string().min(1),
		size: z.number().min(0),
		destination: z.string().min(1)
	})
	.strict()

/**
 * This is exclusive to Multer, which is used in our bucket, therefor it's mandatory to have
 */
export type OriginalFileDataSchema = z.infer<
	typeof originalFileDataSchema
>
