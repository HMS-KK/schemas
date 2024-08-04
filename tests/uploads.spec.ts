import { describe, expect, it } from "vitest"
import {
	uploadSchema,
	routesSchemas,
	type UploadSchema
} from "../src/uploads.js"

describe("uploads", () => {
	describe("uploadSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const expected: UploadSchema = {
				id: 1,
				filename: "Hello",
				destination: "./files",
				mimetype: "video",
				size: 123,
				url: "http://github.com",
				createdAt: "2024-07-24T10:49:01.854Z",
				updatedAt: "2024-07-24T10:49:01.854Z"
			}

			const result = uploadSchema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				uploadSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				uploadSchema.parse({
					id: 1,
					filename: "Hello",
					url: "http://github.com",
					createdAt: "2024-07-24T10:49:01.854Z",
					updatedAt: "2024-07-24T10:49:01.854Z",
					hey: 1
				})
			).toThrow()
		})
	})

	describe("/list", () => {
		const schemas = routesSchemas["/list"]

		describe("requests", () => {
			const schema = schemas.request

			describe("queryParams", () => {
				const { queryParams } = schema

				it("should parse the data correctly and not throw", () => {
					const data1 = {
						skip: 1,
						take: 1
					}

					const data2 = {
						take: undefined,
						skip: undefined
					}

					expect(queryParams.parse(data1)).toStrictEqual(
						data1
					)
					expect(queryParams.parse(data2)).toStrictEqual(
						data2
					)
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						queryParams.parse({ a: 1 })
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

					expect(() => queryParams.parse(data1)).toThrow()
					expect(() => queryParams.parse(data2)).toThrow()
				})
			})
		})

		describe("response", () => {
			const { response } = schemas

			it("should parse the data correctly and not throw", () => {
				const data1 = {
					ok: true,
					data: [
						{
							id: 1,
							filename: "Hello",
							destination: "./files",
							mimetype: "video",
							size: 123,
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

				expect(response.parse(data1)).toStrictEqual(data1)
				expect(response.parse(data2)).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() => response.parse({ a: 1 })).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				const data1 = {
					ok: true,
					data: [
						{
							id: 1,
							filename: "Hello",
							destination: "./files",
							mimetype: "video",
							size: 123,
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

				expect(() => response.parse(data1)).toThrow()
				expect(() => response.parse(data2)).toThrow()
			})
		})
	})

	describe("/upload", () => {
		const { request, response } = routesSchemas["/upload"]

		describe("response", () => {
			it("should parse the data correctly and not throw", () => {
				const data1 = {
					ok: true,
					data: {
						id: 1,
						filename: "Hello",
						destination: "./files",
						mimetype: "video",
						url: "http://t.me",
						size: 123,
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				}

				const data2 = {
					ok: false,
					error: "Hy"
				}

				expect(response.parse(data1)).toStrictEqual(data1)
				expect(response.parse(data2)).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					response.parse({
						badReq: ""
					})
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				expect(() =>
					response.parse({
						ok: true,
						data: {
							id: 1,
							filename: "Hello",
							destination: "./files",
							mimetype: "video",
							url: "http://t.me",
							size: 123,
							createdAt: "2024-07-24T10:49:01.854Z",
							updatedAt: "2024-07-24T10:49:01.854Z",
							a: 1
						}
					})
				).toThrow()
			})
		})

		describe("request", () => {
			it("currently, should be undefined", () => {
				expect(request).toEqual(undefined)
			})
		})
	})

	describe("/info/:id", () => {
		const { request, response } = routesSchemas["/info/:id"]

		describe("request", () => {
			const { pathParams } = request

			describe("pathParams", () => {
				it("should parse the data correctly and not throw", () => {
					const data = {
						id: 1
					}

					expect(pathParams.parse(data)).toStrictEqual(data)
				})

				it("should throw if the shape is correct but the data shape is not", () => {
					const data = {
						id: {}
					}

					expect(() => pathParams.parse(data)).toThrow()
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						pathParams.parse({
							a: 1
						})
					).toThrow()
				})
			})
		})

		describe("response", () => {
			it("should parse the data correctly and not throw", () => {
				const data1 = {
					ok: true,
					data: {
						id: 1,
						filename: "Hello",
						destination: "./files",
						mimetype: "video",
						size: 123,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				}

				const data2 = {
					ok: false,
					error: "Hy"
				}

				expect(response.parse(data1)).toStrictEqual(data1)
				expect(response.parse(data2)).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					response.parse({
						badReq: ""
					})
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				expect(() =>
					response.parse({
						ok: true,
						data: {
							id: 1,
							filename: "Hello",
							destination: "./files",
							mimetype: "video",
							size: 123,
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

	describe("/file/:id", () => {
		const { request, response } = routesSchemas["/file/:id"]

		describe("request", () => {
			const { pathParams } = request

			describe("pathParams", () => {
				it("should parse the data correctly and not throw", () => {
					const data = {
						id: 1
					}

					expect(pathParams.parse(data)).toStrictEqual(data)
				})

				it("should throw if the shape is correct but the data shape is not", () => {
					const data = {
						id: {}
					}

					expect(() => pathParams.parse(data)).toThrow()
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						pathParams.parse({
							a: 1
						})
					).toThrow()
				})
			})
		})

		describe("response", () => {
			it("currently, should be undefined", () => {
				expect(response).toEqual(undefined)
			})
		})
	})

	describe("/delete/:id", () => {
		const schemas = routesSchemas["/delete/:id"]

		describe("response", () => {
			const { response } = schemas
			it("should parse the data correctly and not throw", () => {
				const data1 = {
					ok: true,
					data: {
						id: 1,
						filename: "Hello",
						destination: "./files",
						mimetype: "video",
						size: 123,
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				}

				const data2 = {
					ok: false,
					error: "Hy"
				}

				expect(response.parse(data1)).toStrictEqual(data1)
				expect(response.parse(data2)).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					response.parse({
						badReq: ""
					})
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				expect(() =>
					response.parse({
						ok: true,
						data: {
							id: 1,
							filename: "Hello",
							destination: "./files",
							mimetype: "video",
							url: "http://t.me",
							size: 123,
							createdAt: "2024-07-24T10:49:01.854Z",
							updatedAt: "2024-07-24T10:49:01.854Z"
						}
					})
				).toThrow()
			})
		})

		describe("requests", () => {
			const { pathParams } = schemas.request

			describe("pathParams", () => {
				it("should parse the data correctly and not throw", () => {
					const data = {
						id: 1
					}

					expect(pathParams.parse(data)).toStrictEqual(data)
				})

				it("should throw if the shape is correct but the data shape is not", () => {
					const data = {
						id: {}
					}

					expect(() => pathParams.parse(data)).toThrow()
				})

				it("should throw if the data is lacking mandatory fields", () => {
					expect(() =>
						pathParams.parse({
							a: 1
						})
					).toThrow()
				})
			})
		})
	})
})
