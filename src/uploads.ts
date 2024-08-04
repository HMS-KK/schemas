import { z } from "zod"
import { apiResponseSchema } from "./shared/responses.js"
import { originalFileDataSchema } from "./shared/originalFileData.js"

export const uploadSchema = z
	.object({
		id: z.number().min(1),
		url: z.string().url(),
		createdAt: z.string().min(1),
		updatedAt: z.string().min(1)
	})
	.merge(originalFileDataSchema)
	.strict()

export type UploadSchema = z.infer<typeof uploadSchema>

/**
 * e.g. http://127.0.0.1:3000/uploads + routes specified in this object
 */
export const routesSchemas = {
	"/list": {
		request: {
			queryParams: z
				.object({
					skip: z.coerce.number().optional(),
					take: z.coerce.number().optional()
				})
				.strict()
		},
		response: apiResponseSchema(z.array(uploadSchema))
	},
	"/upload": {
		request: undefined,
		response: apiResponseSchema(uploadSchema)
	},
	"/delete/:id": {
		request: {
			pathParams: z.object({
				id: z.coerce.number().min(1)
			})
		},
		response: apiResponseSchema(
			z.object({}).merge(uploadSchema).omit({ url: true })
		)
	},
	"/file/:id": {
		response: undefined,
		request: {
			pathParams: z.object({
				id: z.coerce.number().min(1)
			})
		}
	},
	"/info/:id": {
		response: apiResponseSchema(uploadSchema),
		request: {
			pathParams: z.object({
				id: z.coerce.number().min(1)
			})
		}
	}
} satisfies Record<
	string,
	{
		request: unknown
		response: unknown
	}
>
