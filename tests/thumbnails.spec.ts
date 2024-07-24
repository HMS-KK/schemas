import { describe, expect, it } from "vitest"
import {
	thumbnailDeleteRouteResponseSchema,
	thumbnailGetRouteResponseSchema,
	thumbnailSchema,
	thumbnailUploadRouteResponseSchema,
	thumbnailsMainRouteResponseSchema,
	type ThumbnailDeleteRouteResponseSchema,
	type ThumbnailGetRouteResponseSchema,
	type ThumbnailSchema,
	type ThumbnailUploadRouteResponseSchema,
	type ThumbnailsMainRouteResponseSchema
} from "../src/thumbnails.js"

describe("thumbnails", () => {
	describe("thumbnailSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const expected: ThumbnailSchema = {
				id: 1,
				name: "Hello",
				reference_video_id: 1,
				url: "http://github.com",
				createdAt: "2024-07-24T10:49:01.854Z",
				updatedAt: "2024-07-24T10:49:01.854Z"
			}

			const result = thumbnailSchema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				thumbnailSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				thumbnailSchema.parse({
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

	describe("thumbnailsMainRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: ThumbnailsMainRouteResponseSchema = {
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

			const data2: ThumbnailsMainRouteResponseSchema = {
				ok: false,
				error:
					"There was an error while processing your request"
			}

			expect(
				thumbnailsMainRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				thumbnailsMainRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				thumbnailsMainRouteResponseSchema.parse({ a: 1 })
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
				thumbnailsMainRouteResponseSchema.parse(data1)
			).toThrow()
			expect(() =>
				thumbnailsMainRouteResponseSchema.parse(data2)
			).toThrow()
		})
	})

	describe("thumbnailUploadRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: ThumbnailUploadRouteResponseSchema = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_thumbnail.t3071019.thumbnail",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/thumbnails/1721821659094_-_thumbnail.t3071019.thumbnail"
					},
					originalFileData: {
						fieldname: "thumbnail",
						originalname: "thumbnail.t3071019.thumbnail",
						encoding: "7bit",
						mimetype: "application/x-bitthumbnail",
						destination: "./files/thumbnails",
						filename:
							"1721821659094_-_thumbnail.t3071019.thumbnail",
						path: "files\\thumbnails\\1721821659094_-_thumbnail.t3071019.thumbnail",
						size: 166164
					}
				}
			}

			const data2: ThumbnailsMainRouteResponseSchema = {
				ok: false,
				error:
					"There was an error while processing your request"
			}

			expect(
				thumbnailUploadRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				thumbnailUploadRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				thumbnailUploadRouteResponseSchema.parse({ a: 1 })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			const data1 = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_thumbnail.t3071019.thumbnail",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/thumbnails/1721821659094_-_thumbnail.t3071019.thumbnail",
						a: ""
					},
					originalFileData: {
						fieldname: "thumbnail",
						originalname: "thumbnail.t3071019.thumbnail",
						encoding: "7bit",
						mimetype: "application/x-bitthumbnail",
						destination: "./files/thumbnails",
						filename:
							"1721821659094_-_thumbnail.t3071019.thumbnail",
						path: "files\\thumbnails\\1721821659094_-_thumbnail.t3071019.thumbnail",
						size: 166164
					}
				}
			}

			const data2 = {
				ok: true,
				data: {
					db: {
						id: 29,
						name: "1721821659094_-_thumbnail.t3071019.thumbnail",
						reference_video_id: 2,
						createdAt: "2024-07-24T11:47:39.097Z",
						updatedAt: "2024-07-24T11:47:39.097Z",
						url: "http://127.0.0.1:8080/files/thumbnails/1721821659094_-_thumbnail.t3071019.thumbnail"
					},
					originalFileData: {
						fieldname: "thumbnail",
						originalname: "thumbnail.t3071019.thumbnail",
						encoding: "7bit",
						mimetype: "application/x-bitthumbnail",
						destination: "./files/thumbnails",
						filename:
							"1721821659094_-_thumbnail.t3071019.thumbnail",
						path: "files\\thumbnails\\1721821659094_-_thumbnail.t3071019.thumbnail",
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
				thumbnailUploadRouteResponseSchema.parse(data1)
			).toThrow()
			expect(() =>
				thumbnailUploadRouteResponseSchema.parse(data2)
			).toThrow()
			expect(() =>
				thumbnailUploadRouteResponseSchema.parse(data3)
			).toThrow()
		})
	})

	describe("thumbnailGetRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: ThumbnailGetRouteResponseSchema = {
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

			const data2: ThumbnailGetRouteResponseSchema = {
				ok: false,
				error: "Hy"
			}

			expect(
				thumbnailGetRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				thumbnailGetRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				thumbnailGetRouteResponseSchema.parse({
					badReq: ""
				})
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				thumbnailGetRouteResponseSchema.parse({
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

	describe("thumbnailDeleteRouteResponseSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const data1: ThumbnailDeleteRouteResponseSchema = {
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

			const data2: ThumbnailDeleteRouteResponseSchema = {
				ok: false,
				error: "Hy"
			}

			expect(
				thumbnailDeleteRouteResponseSchema.parse(data1)
			).toStrictEqual(data1)
			expect(
				thumbnailDeleteRouteResponseSchema.parse(data2)
			).toStrictEqual(data2)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				thumbnailDeleteRouteResponseSchema.parse({
					badReq: ""
				})
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				thumbnailDeleteRouteResponseSchema.parse({
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
