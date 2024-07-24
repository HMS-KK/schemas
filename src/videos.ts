import { z } from "zod"
import { apiResponseSchema } from "./shared/responses.js"
import { originalFileDataSchema } from "./shared/originalFileData.js"

export const videoSchema = z
	.object({
		id: z.number().min(0),
		url: z.string().url(),
		name: z.string().min(1),
		createdAt: z.string().min(1),
		updatedAt: z.string().min(1),
		reference_video_id: z.coerce.number().min(0)
	})
	.strict()

export type VideoSchema = z.infer<typeof videoSchema>

export const videosMainRouteResponseSchema =
	apiResponseSchema(z.array(videoSchema))

export type VideosMainRouteResponseSchema = z.infer<
	typeof videosMainRouteResponseSchema
>

export const videoUploadRouteResponseSchema =
	apiResponseSchema(
		z.object({
			db: videoSchema,
			originalFileData: originalFileDataSchema
		})
	)

export type VideoUploadRouteResponseSchema = z.infer<
	typeof videoUploadRouteResponseSchema
>

export const videoGetRouteResponseSchema =
	apiResponseSchema(videoSchema)

export type VideoGetRouteResponseSchema = z.infer<
	typeof videoGetRouteResponseSchema
>

export const videoDeleteRouteResponseSchema =
	apiResponseSchema(videoSchema)

export type VideoDeleteRouteResponseSchema = z.infer<
	typeof videoDeleteRouteResponseSchema
>
