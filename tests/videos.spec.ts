import { describe, expect, it } from "vitest"
import {
	videoSchema,
	type VideoSchema
} from "../src/videos.js"

describe("videoSchema", () => {
	it("should parse correctly", () => {
		const data: VideoSchema = {
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
		const data: VideoSchema = {
			name: "hello",
			original_video_url: "http://"
		}

		expect(() => videoSchema.parse(data)).toThrowError()
	})
})
