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

export const torrentsMainRouteResponseSchema =
	apiResponseSchema(z.array(torrentSchema))

export type TorrentsMainRouteResponseSchema = z.infer<
	typeof torrentsMainRouteResponseSchema
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

export const torrentDeleteRouteResponseSchema =
	apiResponseSchema(torrentSchema)

export type TorrentDeleteRouteResponseSchema = z.infer<
	typeof torrentDeleteRouteResponseSchema
>
