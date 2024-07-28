import { describe, expect, it } from "vitest"
import { bucketUploadedVideosSchemas } from "../src/videos.js"

describe("bucketUploadedVideosSchemas", () => {
	describe("video", () => {
		const schema = bucketUploadedVideosSchemas.video
		it("should parse the data correctly and not throw", () => {
			const expected = {
				id: 1,
				name: "Hello",
				reference_video_id: 1,
				url: "http://github.com",
				createdAt: "2024-07-24T10:49:01.854Z",
				updatedAt: "2024-07-24T10:49:01.854Z"
			}

			const result = schema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() => schema.parse({ badReq: "" })).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				schema.parse({
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

	describe("routes", () => {
		const routesSchemas = bucketUploadedVideosSchemas.routes

		describe("/", () => {
			const mainRouteSchema = routesSchemas["/"]

			describe("searchParams", () => {
				const searchParamsSchema =
					mainRouteSchema.searchParams
				it("should parse the data correctly and not throw", () => {
					const data1 = {
						skip: 1,
						take: 1
					}

					const data2 = {
						take: undefined,
						skip: undefined
					}

					expect(
						searchParamsSchema.parse(data1)
					).toStrictEqual(data1)
					expect(
						searchParamsSchema.parse(data2)
					).toStrictEqual(data2)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						searchParamsSchema.parse({ a: 1 })
					).toThrow()
				})

				it("should throw if the data contains mandatory fields but has an extra property", () => {
					const data1 = {
						skip: 1,
						take: 1,
						a: 1
					}

					const data2 = {
						take: undefined,
						skip: undefined,
						b: 1
					}

					expect(() =>
						searchParamsSchema.parse(data1)
					).toThrow()
					expect(() =>
						searchParamsSchema.parse(data2)
					).toThrow()
				})
			})

			describe("response", () => {
				const responseSchema = mainRouteSchema.response

				it("should parse the data correctly and not throw", () => {
					const data1 = {
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

					const data2 = {
						ok: false,
						error:
							"There was an error while processing your request"
					}

					expect(responseSchema.parse(data1)).toStrictEqual(
						data1
					)
					expect(responseSchema.parse(data2)).toStrictEqual(
						data2
					)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						responseSchema.parse({ a: 1 })
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
						responseSchema.parse(data1)
					).toThrow()
					expect(() =>
						responseSchema.parse(data2)
					).toThrow()
				})
			})
		})

		describe("/upload", () => {
			const uploadSchema = routesSchemas["/upload"]

			describe("searchParams", () => {
				const searchParamsSchema = uploadSchema.searchParams
				it("should parse the data correctly and not throw", () => {
					const data = {
						reference_video_id: 1
					}

					expect(
						searchParamsSchema.parse(data)
					).toStrictEqual(data)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						searchParamsSchema.parse({
							a: 1
						})
					).toThrow()
				})
			})

			describe("response", () => {
				const responseSchema = uploadSchema.response

				it("should parse the data correctly and not throw", () => {
					const data1 = {
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

					const data2 = {
						ok: false,
						error:
							"There was an error while processing your request"
					}

					expect(responseSchema.parse(data1)).toStrictEqual(
						data1
					)
					expect(responseSchema.parse(data2)).toStrictEqual(
						data2
					)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						responseSchema.parse({ a: 1 })
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
						responseSchema.parse(data1)
					).toThrow()
					expect(() =>
						responseSchema.parse(data2)
					).toThrow()
					expect(() =>
						responseSchema.parse(data3)
					).toThrow()
				})
			})
		})

		describe("/get/:id", () => {
			const getIDRouteSchema = routesSchemas["/get/:id"]

			describe("pathParams", () => {
				const pathParamsSchema = getIDRouteSchema.pathParams

				it("should parse the data correctly and not throw", () => {
					const data = {
						id: 1
					}

					expect(
						pathParamsSchema.parse(data)
					).toStrictEqual(data)
				})

				it("should throw if the shape is correct but the data shape is not", () => {
					const data = {
						id: {}
					}

					expect(() =>
						pathParamsSchema.parse(data)
					).toThrow()
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						pathParamsSchema.parse({
							a: 1
						})
					).toThrow()
				})
			})

			describe("response", () => {
				const responseSchema = getIDRouteSchema.response

				it("should parse the data correctly and not throw", () => {
					const data1 = {
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

					const data2 = {
						ok: false,
						error: "Hy"
					}

					expect(responseSchema.parse(data1)).toStrictEqual(
						data1
					)
					expect(responseSchema.parse(data2)).toStrictEqual(
						data2
					)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						responseSchema.parse({
							badReq: ""
						})
					).toThrow()
				})

				it("should throw if the data contains mandatory fields but has an extra property", () => {
					expect(() =>
						responseSchema.parse({
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

		describe("/delete/:id", () => {
			const deleteIDRouteSchema =
				routesSchemas["/delete/:id"]

			describe("pathParams", () => {
				const pathParamsSchema =
					deleteIDRouteSchema.pathParams

				it("should parse the data correctly and not throw", () => {
					const data = {
						id: 1
					}

					expect(
						pathParamsSchema.parse(data)
					).toStrictEqual(data)
				})

				it("should throw if the shape is correct but the data shape is not", () => {
					const data = {
						id: {}
					}

					expect(() =>
						pathParamsSchema.parse(data)
					).toThrow()
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						pathParamsSchema.parse({
							a: 1
						})
					).toThrow()
				})
			})

			describe("response", () => {
				const responseSchema = deleteIDRouteSchema.response

				it("should parse the data correctly and not throw", () => {
					const data1 = {
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

					const data2 = {
						ok: false,
						error: "Hy"
					}

					expect(responseSchema.parse(data1)).toStrictEqual(
						data1
					)
					expect(responseSchema.parse(data2)).toStrictEqual(
						data2
					)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						responseSchema.parse({
							badReq: ""
						})
					).toThrow()
				})

				it("should throw if the data contains mandatory fields but has an extra property", () => {
					expect(() =>
						responseSchema.parse({
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
	})
})
