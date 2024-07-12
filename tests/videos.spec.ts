import { describe, expect, it } from "vitest"
import {
	partialVideoSchema,
	videoSchema,
	type CreateVideoDto,
	type UpdateVideoDto
} from "../src/videos.js"

describe("videoSchema", () => {
	it("should parse correctly", () => {
		const data: CreateVideoDto = {
			name: "hello",
			original_video_url: "http://t.me",
			bucket_leaked_video_id: 1,
			bucket_thumbnail_id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			is_leaked: false,
			markdown_description: "# Hi"
		}

		const parseResult = videoSchema.parse(data)

		expect(parseResult).toEqual(data)
	})

	it("should throw if the provided data is invalid", () => {
		const data: UpdateVideoDto = {
			name: "hello",
			original_video_url: "http://"
		}

		expect(() => videoSchema.parse(data)).toThrowError()
	})

	describe("partial video schema", () => {
		it("should parse correctly", () => {
			const data = { bucket_leaked_video_id: 1 }

			const result = partialVideoSchema.safeParse(data)

			expect(result.success).toEqual(true)
		})

		it("should error on unknown fields", () => {
			const data = { a: 1 }

			expect(() => partialVideoSchema.parse(data)).toThrow()
		})
	})
})
