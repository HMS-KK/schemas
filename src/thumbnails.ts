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
		reference_thumbnail_id: z.coerce.number().min(0)
	})
	.strict()

export type ThumbnailSchema = z.infer<
	typeof thumbnailSchema
>

export const thumbnailsMainRouteRequestBodySchema = z
	.object({
		skip: z.number().optional(),
		take: z.number().optional()
	})
	.strict()

export type ThumbnailsMainRouteRequestBodySchema = z.infer<
	typeof thumbnailsMainRouteRequestBodySchema
>

export const thumbnailsMainRouteResponseSchema =
	apiResponseSchema(z.array(thumbnailSchema))

export type ThumbnailsMainRouteResponseSchema = z.infer<
	typeof thumbnailsMainRouteResponseSchema
>

/**
 * only validates the search params, and thus,
 * should only be used when specifying/validating search params
 */
export const thumbnailUploadRouteRequestQueryParamsSchema =
	z.object({
		reference_thumbnail_id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for search params, and thus,
 * should only be used when specifying the request search params
 */
export type ThumbnailUploadRouteRequestSchema = z.infer<
	typeof thumbnailUploadRouteRequestQueryParamsSchema
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

/**
 * only validates the path params, and thus,
 * should only be used when specifying/validating path params
 */
export const thumbnailGetRouteRequestPathParamsSchema =
	z.object({
		id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for path params, and thus,
 * should only be used when specifying the request path params
 */
export type ThumbnailGetRouteRequestPathParamsSchema =
	z.infer<typeof thumbnailGetRouteRequestPathParamsSchema>

export const thumbnailGetRouteResponseSchema =
	apiResponseSchema(thumbnailSchema)

export type ThumbnailGetRouteResponseSchema = z.infer<
	typeof thumbnailGetRouteResponseSchema
>

/**
 * only validates the path params, and thus,
 * should only be used when specifying/validating path params
 */
export const thumbnailDeleteRouteRequestPathParamsSchema =
	z.object({
		id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for path params, and thus,
 * should only be used when specifying the request path params
 */
export type ThumbnailDeleteRouteRequestPathParamsSchema =
	z.infer<
		typeof thumbnailDeleteRouteRequestPathParamsSchema
	>

export const thumbnailDeleteRouteResponseSchema =
	apiResponseSchema(thumbnailSchema)

export type ThumbnailDeleteRouteResponseSchema = z.infer<
	typeof thumbnailDeleteRouteResponseSchema
>
