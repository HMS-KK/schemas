import { z } from "zod"
import { apiResponseSchema } from "./shared/responses.js"
import { originalFileDataSchema } from "./shared/originalFileData.js"

export const torrentSchema = z
	.object({
		id: z.number().min(0),
		url: z.string().url(),
		name: z.string().min(1),
		createdAt: z.string().min(1),
		updatedAt: z.string().min(1),
		reference_pack_id: z.coerce.number().min(0)
	})
	.strict()

export type TorrentSchema = z.infer<typeof torrentSchema>

export const torrentsMainRouteRequestBodySchema = z
	.object({
		skip: z.number().optional(),
		take: z.number().optional()
	})
	.strict()

export type TorrentsMainRouteRequestBodySchema = z.infer<
	typeof torrentsMainRouteRequestBodySchema
>

export const torrentsMainRouteResponseSchema =
	apiResponseSchema(z.array(torrentSchema))

export type TorrentsMainRouteResponseSchema = z.infer<
	typeof torrentsMainRouteResponseSchema
>

/**
 * only validates the search params, and thus,
 * should only be used when specifying/validating search params
 */
export const torrentUploadRouteRequestQueryParamsSchema =
	z.object({
		reference_pack_id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for search params, and thus,
 * should only be used when specifying the request search params
 */
export type TorrentUploadRouteRequestSchema = z.infer<
	typeof torrentUploadRouteRequestQueryParamsSchema
>

export const torrentUploadRouteResponseSchema =
	apiResponseSchema(
		z.object({
			db: torrentSchema,
			originalFileData: originalFileDataSchema
		})
	)

export type TorrentUploadRouteResponseSchema = z.infer<
	typeof torrentUploadRouteResponseSchema
>

export const torrentGetRouteResponseSchema =
	apiResponseSchema(torrentSchema)

export type TorrentGetRouteResponseSchema = z.infer<
	typeof torrentGetRouteResponseSchema
>

/**
 * only validates the path params, and thus,
 * should only be used when specifying/validating path params
 */
export const torrentDeleteRouteRequestPathParamsSchema =
	z.object({
		id: z.coerce.number().min(1)
	})

/**
 * this type is only valid for path params, and thus,
 * should only be used when specifying the request path params
 */
export type TorrentDeleteRouteRequestPathParamsSchema =
	z.infer<typeof torrentDeleteRouteRequestPathParamsSchema>

export const torrentDeleteRouteResponseSchema =
	apiResponseSchema(torrentSchema)

export type TorrentDeleteRouteResponseSchema = z.infer<
	typeof torrentDeleteRouteResponseSchema
>
