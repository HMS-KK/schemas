import { z } from "zod"
import { apiResponseSchema } from "./shared/responses.js"
import { originalFileDataSchema } from "./shared/originalFileData.js"

const video = z
	.object({
		id: z.number().min(0),
		url: z.string().url(),
		name: z.string().min(1),
		createdAt: z.string().min(1),
		updatedAt: z.string().min(1),
		reference_video_id: z.coerce.number().min(0)
	})
	.strict()

const routes = {
	/**
	 * The main route a.k.a 127.0.0.1/
	 */
	"/": {
		/**
		 * This schema can be used to validate the search params, which is an object in Express.js.
		 *
		 * It can also be used on the client in combination with URLSearchParams for ease of use
		 */
		searchParams: z
			.object({
				skip: z.number().optional(),
				take: z.number().optional()
			})
			.strict(),
		/**
		 * The response that's received or sent from the server
		 */
		get response() {
			return apiResponseSchema(
				z.array(bucketUploadedVideosSchemas.video)
			)
		}
	},
	"/upload": {
		/**
		 * This schema can be used to validate the search params, which is an object in Express.js.
		 *
		 * It can also be used on the client in combination with URLSearchParams for ease of use
		 */
		searchParams: z.object({
			reference_video_id: z.coerce.number().min(1)
		}),
		/**
		 * The response that's received or sent from the server
		 */
		get response() {
			return apiResponseSchema(
				z.object({
					db: bucketUploadedVideosSchemas.video,
					originalFileData: originalFileDataSchema
				})
			)
		}
	},
	"/get/:id": {
		/**
		 * This schema can be used to validate the path params (a.k.a 127.0.0.1/get/1), which is an object in Express.js.
		 *
		 * It can also be used on the client in combination with URLSearchParams for ease of use
		 */
		pathParams: z.object({
			id: z.coerce.number().min(1)
		}),
		/**
		 * The response that's received or sent from the server
		 */
		get response() {
			return apiResponseSchema(
				bucketUploadedVideosSchemas.video
			)
		}
	},
	"/delete/:id": {
		/**
		 * This schema can be used to validate the path params (a.k.a 127.0.0.1/delete/1), which is an object in Express.js.
		 *
		 * It can also be used on the client in combination with URLSearchParams for ease of use
		 */
		pathParams: z.object({
			id: z.coerce.number().min(1)
		}),
		/**
		 * The response that's received or sent from the server
		 */
		get response() {
			return apiResponseSchema(
				bucketUploadedVideosSchemas.video
			)
		}
	}
} as const

/**
 * This object holds the validation schemas for the videos route of the bucket server
 *
 * It's a universal schema object, which can be leverage in most other packages
 */
export const bucketUploadedVideosSchemas = {
	/**
	 * This schema showcases how a video object is represented in the bucket
	 */
	video,
	/**
	 * The routes that are available in the bucket and their corresponding schemas
	 */
	routes
}
