import { describe, expect, it } from "vitest"
import {
	videoDeleteRouteResponseSchema,
	videoGetRouteResponseSchema,
	videoSchema,
	videoUploadRouteResponseSchema,
	videosMainRouteResponseSchema,
	type VideoDeleteRouteResponseSchema,
	type VideoGetRouteResponseSchema,
	type VideoSchema,
	type VideoUploadRouteResponseSchema,
	type VideosMainRouteResponseSchema
} from "../src/videos.js"

describe("videos", () => {
	describe("videoSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const expected: VideoSchema = {
				id: 1,
				name: "Hello",
				reference_video_id: 1,
				url: "http://github.com",
				createdAt: "2024-07-24T10:49:01.854Z",
				updatedAt: "2024-07-24T10:49:01.854Z"
			}

			const result = videoSchema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				videoSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				videoSchema.parse({
					id: 1,
					name: "Hello",
					reference_video_id: 1,
					url: "http://github.com",
					createdAt: "2024-07-24T10:49:01.854Z",
					updatedAt: "2024-07-24T10:49:01.854Z",
					hey: 1
				})
			).toThrow()
		})
	})

	describe("videosMainRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: VideosMainRouteResponseSchema = {
				ok: true,
				data: [
					{
						id: 1,
						name: "Hello",
						reference_video_id: 0,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				]
			}

			const data2: VideosMainRouteResponseSchema = {
				ok: false,
				error:
					"There was an error while processing your request"
			}

			expect(
				videosMainRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				videosMainRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				videosMainRouteResponseSchema.parse({ a: 1 })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			const data1 = {
				ok: true,
				data: [
					{
						id: 1,
						name: "Hello",
						reference_video_id: 0,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z",
						a: 1
					}
				]
			}

			const data2 = {
				ok: false,
				error:
					"There was an error while processing your request",
				a: 1
			}

			expect(() =>
				videosMainRouteResponseSchema.parse(data1)
			).toThrow()
			expect(() =>
				videosMainRouteResponseSchema.parse(data2)
			).toThrow()
		})
	})

	describe("videoUploadRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: VideoUploadRouteResponseSchema = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_video.t3071019.video",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/videos/1721821659094_-_video.t3071019.video"
					},
					originalFileData: {
						fieldname: "video",
						originalname: "video.t3071019.video",
						encoding: "7bit",
						mimetype: "application/x-bitvideo",
						destination: "./files/videos",
						filename:
							"1721821659094_-_video.t3071019.video",
						path: "files\\videos\\1721821659094_-_video.t3071019.video",
						size: 166164
					}
				}
			}

			const data2: VideosMainRouteResponseSchema = {
				ok: false,
				error:
					"There was an error while processing your request"
			}

			expect(
				videoUploadRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				videoUploadRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				videoUploadRouteResponseSchema.parse({ a: 1 })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			const data1 = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_video.t3071019.video",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/videos/1721821659094_-_video.t3071019.video",
						a: ""
					},
					originalFileData: {
						fieldname: "video",
						originalname: "video.t3071019.video",
						encoding: "7bit",
						mimetype: "application/x-bitvideo",
						destination: "./files/videos",
						filename:
							"1721821659094_-_video.t3071019.video",
						path: "files\\videos\\1721821659094_-_video.t3071019.video",
						size: 166164
					}
				}
			}

			const data2 = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_video.t3071019.video",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/videos/1721821659094_-_video.t3071019.video"
					},
					originalFileData: {
						fieldname: "video",
						originalname: "video.t3071019.video",
						encoding: "7bit",
						mimetype: "application/x-bitvideo",
						destination: "./files/videos",
						filename:
							"1721821659094_-_video.t3071019.video",
						path: "files\\videos\\1721821659094_-_video.t3071019.video",
						size: 166164,
						a: ""
					}
				}
			}

			const data3 = {
				ok: false,
				error:
					"There was an error while processing your request",
				a: 1
			}

			expect(() =>
				videoUploadRouteResponseSchema.parse(data1)
			).toThrow()
			expect(() =>
				videoUploadRouteResponseSchema.parse(data2)
			).toThrow()
			expect(() =>
				videoUploadRouteResponseSchema.parse(data3)
			).toThrow()
		})
	})

	describe("videoGetRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: VideoGetRouteResponseSchema = {
				ok: true,
				data: {
					id: 1,
					name: "Hello",
					reference_video_id: 1,
					url: "http://github.com",
					createdAt: "2024-07-24T10:49:01.854Z",
					updatedAt: "2024-07-24T10:49:01.854Z"
				}
			}

			const data2: VideoGetRouteResponseSchema = {
				ok: false,
				error: "Hy"
			}

			expect(
				videoGetRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				videoGetRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				videoGetRouteResponseSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				videoGetRouteResponseSchema.parse({
					ok: true,
					data: {
						id: 1,
						name: "Hello",
						reference_video_id: 1,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z",
						a: 1
					}
				})
			).toThrow()
		})
	})

	describe("videoDeleteRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: VideoDeleteRouteResponseSchema = {
				ok: true,
				data: {
					id: 1,
					name: "Hello",
					reference_video_id: 1,
					url: "http://github.com",
					createdAt: "2024-07-24T10:49:01.854Z",
					updatedAt: "2024-07-24T10:49:01.854Z"
				}
			}

			const data2: VideoDeleteRouteResponseSchema = {
				ok: false,
				error: "Hy"
			}

			expect(
				videoDeleteRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				videoDeleteRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				videoDeleteRouteResponseSchema.parse({
					badReq: ""
				})
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				videoDeleteRouteResponseSchema.parse({
					ok: true,
					data: {
						id: 1,
						name: "Hello",
						reference_video_id: 1,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z",
						a: 1
					}
				})
			).toThrow()
		})
	})
})
