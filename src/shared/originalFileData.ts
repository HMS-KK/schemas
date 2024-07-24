import { z } from "zod"

/**
 * This is exclusive to Multer, which is used in our bucket, therefor it's mandatory to have
 */
export const originalFileDataSchema = z
	.object({
		fieldname: z.string(),
		originalname: z.string(),
		encoding: z.string(),
		mimetype: z.string(),
		destination: z.string(),
		filename: z.string(),
		path: z.string(),
		size: z.number()
	})
	.strict()

/**
 * This is exclusive to Multer, which is used in our bucket, therefor it's mandatory to have
 */
export type OriginalFileDataSchema = z.infer<
	typeof originalFileDataSchema
>
