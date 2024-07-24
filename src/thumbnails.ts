import { z } from "zod"
import { apiResponseSchema } from "./shared/responses.js"
import { originalFileDataSchema } from "./shared/originalFileData.js"

export const thumbnailSchema = z
	.object({
		id: z.number().min(0),
		url: z.string().url(),
		name: z.string().min(1),
		createdAt: z.string().min(1),
		updatedAt: z.string().min(1),
		reference_video_id: z.coerce.number().min(0)
	})
	.strict()

export type ThumbnailSchema = z.infer<
	typeof thumbnailSchema
>

export const thumbnailsMainRouteResponseSchema =
	apiResponseSchema(z.array(thumbnailSchema))

export type ThumbnailsMainRouteResponseSchema = z.infer<
	typeof thumbnailsMainRouteResponseSchema
>

export const thumbnailUploadRouteResponseSchema =
	apiResponseSchema(
		z.object({
			db: thumbnailSchema,
			originalFileData: originalFileDataSchema
		})
	)

export type ThumbnailUploadRouteResponseSchema = z.infer<
	typeof thumbnailUploadRouteResponseSchema
>

export const thumbnailGetRouteResponseSchema =
	apiResponseSchema(thumbnailSchema)

export type ThumbnailGetRouteResponseSchema = z.infer<
	typeof thumbnailGetRouteResponseSchema
>

export const thumbnailDeleteRouteResponseSchema =
	apiResponseSchema(thumbnailSchema)

export type ThumbnailDeleteRouteResponseSchema = z.infer<
	typeof thumbnailDeleteRouteResponseSchema
>
