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

/**
 * only validates the search params, and thus,
 * should only be used when specifying/validating search params
 */
export const videoUploadRouteRequestQueryParamsSchema =
	z.object({
		reference_video_id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for search params, and thus,
 * should only be used when specifying the request search params
 */
export type VideoUploadRouteRequestSchema = z.infer<
	typeof videoUploadRouteRequestQueryParamsSchema
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

/**
 * only validates the path params, and thus,
 * should only be used when specifying/validating path params
 */
export const videoGetRouteRequestPathParamsSchema =
	z.object({
		id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for path params, and thus,
 * should only be used when specifying the request path params
 */
export type VideoGetRouteRequestPathParamsSchema = z.infer<
	typeof videoGetRouteRequestPathParamsSchema
>

export const videoGetRouteResponseSchema =
	apiResponseSchema(videoSchema)

export type VideoGetRouteResponseSchema = z.infer<
	typeof videoGetRouteResponseSchema
>

/**
 * only validates the path params, and thus,
 * should only be used when specifying/validating path params
 */
export const videoDeleteRouteRequestPathParamsSchema =
	z.object({
		id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for path params, and thus,
 * should only be used when specifying the request path params
 */
export type VideoDeleteRouteRequestPathParamsSchema =
	z.infer<typeof videoDeleteRouteRequestPathParamsSchema>

export const videoDeleteRouteResponseSchema =
	apiResponseSchema(videoSchema)

export type VideoDeleteRouteResponseSchema = z.infer<
	typeof videoDeleteRouteResponseSchema
>
