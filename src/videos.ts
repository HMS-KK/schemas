import { z } from "zod"

export const videoSchema = z
	.object({
		name: z.string().trim().min(1),
		original_video_url: z.string().url().trim(),
		markdown_description: z.string().optional(),
		is_leaked: z.boolean().default(false).optional(),
		bucket_thumbnail_id: z.number().optional(),
		bucket_leaked_video_id: z.number().optional(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional()
	})
	.strict()

export type VideoSchema = z.infer<typeof videoSchema>
export type CreateVideoDto = VideoSchema

const videoWithIDSchema = videoSchema.merge(
	z.object({ id: z.number() })
)

export type Video = z.infer<typeof videoWithIDSchema>

export const partialVideoSchema = videoSchema.partial()

export type UpdateVideoDto = z.infer<
	typeof partialVideoSchema
>
