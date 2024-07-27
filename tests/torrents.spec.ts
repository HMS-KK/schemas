import { describe, expect, it } from "vitest"
import {
	torrentDeleteRouteRequestPathParamsSchema,
	torrentDeleteRouteResponseSchema,
	torrentGetRouteRequestPathParamsSchema,
	torrentGetRouteResponseSchema,
	torrentSchema,
	torrentUploadRouteRequestQueryParamsSchema,
	torrentUploadRouteResponseSchema,
	torrentsMainRouteRequestBodySchema,
	torrentsMainRouteResponseSchema,
	type TorrentDeleteRouteRequestPathParamsSchema,
	type TorrentDeleteRouteResponseSchema,
	type TorrentGetRouteRequestPathParamsSchema,
	type TorrentGetRouteResponseSchema,
	type TorrentSchema,
	type TorrentUploadRouteRequestSchema,
	type TorrentUploadRouteResponseSchema,
	type TorrentsMainRouteRequestBodySchema,
	type TorrentsMainRouteResponseSchema
} from "../src/torrents.js"

describe("torrents", () => {
	describe("torrentSchema", () => {
		it("should parse the data correctly and not throw", () => {
			const expected: TorrentSchema = {
				id: 1,
				name: "Hello",
				reference_pack_id: 1,
				url: "http://github.com",
				createdAt: "2024-07-24T10:49:01.854Z",
				updatedAt: "2024-07-24T10:49:01.854Z"
			}

			const result = torrentSchema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the data is lacking mandatory fields", () => {
			expect(() =>
				torrentSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the data contains mandatory fields but has an extra property", () => {
			expect(() =>
				torrentSchema.parse({
					id: 1,
					name: "Hello",
					reference_pack_id: 1,
					url: "http://github.com",
					createdAt: "2024-07-24T10:49:01.854Z",
					updatedAt: "2024-07-24T10:49:01.854Z",
					hey: 1
				})
			).toThrow()
		})
	})

	describe("Requests", () => {
		describe("torrentsMainRouteRequestBodySchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data1: TorrentsMainRouteRequestBodySchema = {
					skip: 1,
					take: 1
				}

				const data2: TorrentsMainRouteRequestBodySchema = {
					take: undefined,
					skip: undefined
				}

				expect(
					torrentsMainRouteRequestBodySchema.parse(data1)
				).toStrictEqual(data1)
				expect(
					torrentsMainRouteRequestBodySchema.parse(data2)
				).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentsMainRouteRequestBodySchema.parse({ a: 1 })
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
					torrentsMainRouteRequestBodySchema.parse(data1)
				).toThrow()
				expect(() =>
					torrentsMainRouteRequestBodySchema.parse(data2)
				).toThrow()
			})
		})

		describe("torrentUploadRouteRequestQueryParamsSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data: TorrentUploadRouteRequestSchema = {
					reference_pack_id: 1
				}

				expect(
					torrentUploadRouteRequestQueryParamsSchema.parse(
						data
					)
				).toStrictEqual(data)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentUploadRouteRequestQueryParamsSchema.parse({
						a: 1
					})
				).toThrow()
			})
		})

		describe("torrentDeleteRouteRequestPathParamsSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data: TorrentDeleteRouteRequestPathParamsSchema =
					{
						id: 1
					}

				expect(
					torrentDeleteRouteRequestPathParamsSchema.parse(
						data
					)
				).toStrictEqual(data)
			})

			it("should throw if the shape is correct but the data shape is not", () => {
				const data = {
					id: {}
				}

				expect(() =>
					torrentDeleteRouteRequestPathParamsSchema.parse(
						data
					)
				).toThrow()
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentDeleteRouteRequestPathParamsSchema.parse({
						a: 1
					})
				).toThrow()
			})
		})

		describe("torrentGetRouteRequestPathParamsSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data: TorrentGetRouteRequestPathParamsSchema =
					{
						id: 1
					}

				expect(
					torrentGetRouteRequestPathParamsSchema.parse(data)
				).toStrictEqual(data)
			})

			it("should throw if the shape is correct but the data shape is not", () => {
				const data = {
					id: {}
				}

				expect(() =>
					torrentGetRouteRequestPathParamsSchema.parse(data)
				).toThrow()
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentGetRouteRequestPathParamsSchema.parse({
						a: 1
					})
				).toThrow()
			})
		})
	})

	describe("Responses", () => {
		describe("torrentsMainRouteResponseSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data1: TorrentsMainRouteResponseSchema = {
					ok: true,
					data: [
						{
							id: 1,
							name: "Hello",
							reference_pack_id: 0,
							url: "http://github.com",
							createdAt: "2024-07-24T10:49:01.854Z",
							updatedAt: "2024-07-24T10:49:01.854Z"
						}
					]
				}

				const data2: TorrentsMainRouteResponseSchema = {
					ok: false,
					error:
						"There was an error while processing your request"
				}

				expect(
					torrentsMainRouteResponseSchema.parse(data1)
				).toStrictEqual(data1)
				expect(
					torrentsMainRouteResponseSchema.parse(data2)
				).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentsMainRouteResponseSchema.parse({ a: 1 })
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				const data1 = {
					ok: true,
					data: [
						{
							id: 1,
							name: "Hello",
							reference_pack_id: 0,
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
					torrentsMainRouteResponseSchema.parse(data1)
				).toThrow()
				expect(() =>
					torrentsMainRouteResponseSchema.parse(data2)
				).toThrow()
			})
		})

		describe("torrentUploadRouteResponseSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data1: TorrentUploadRouteResponseSchema = {
					ok: true,
					data: {
						db: {
							id: 29,
							name: "1721821659094_-_torrent.t3071019.torrent",
							reference_pack_id: 2,
							createdAt: "2024-07-24T11:47:39.097Z",
							updatedAt: "2024-07-24T11:47:39.097Z",
							url: "http://127.0.0.1:8080/files/torrents/1721821659094_-_torrent.t3071019.torrent"
						},
						originalFileData: {
							fieldname: "torrent",
							originalname: "torrent.t3071019.torrent",
							encoding: "7bit",
							mimetype: "application/x-bittorrent",
							destination: "./files/torrents",
							filename:
								"1721821659094_-_torrent.t3071019.torrent",
							path: "files\\torrents\\1721821659094_-_torrent.t3071019.torrent",
							size: 166164
						}
					}
				}

				const data2: TorrentsMainRouteResponseSchema = {
					ok: false,
					error:
						"There was an error while processing your request"
				}

				expect(
					torrentUploadRouteResponseSchema.parse(data1)
				).toStrictEqual(data1)
				expect(
					torrentUploadRouteResponseSchema.parse(data2)
				).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentUploadRouteResponseSchema.parse({ a: 1 })
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				const data1 = {
					ok: true,
					data: {
						db: {
							id: 29,
							name: "1721821659094_-_torrent.t3071019.torrent",
							reference_pack_id: 2,
							createdAt: "2024-07-24T11:47:39.097Z",
							updatedAt: "2024-07-24T11:47:39.097Z",
							url: "http://127.0.0.1:8080/files/torrents/1721821659094_-_torrent.t3071019.torrent",
							a: ""
						},
						originalFileData: {
							fieldname: "torrent",
							originalname: "torrent.t3071019.torrent",
							encoding: "7bit",
							mimetype: "application/x-bittorrent",
							destination: "./files/torrents",
							filename:
								"1721821659094_-_torrent.t3071019.torrent",
							path: "files\\torrents\\1721821659094_-_torrent.t3071019.torrent",
							size: 166164
						}
					}
				}

				const data2 = {
					ok: true,
					data: {
						db: {
							id: 29,
							name: "1721821659094_-_torrent.t3071019.torrent",
							reference_pack_id: 2,
							createdAt: "2024-07-24T11:47:39.097Z",
							updatedAt: "2024-07-24T11:47:39.097Z",
							url: "http://127.0.0.1:8080/files/torrents/1721821659094_-_torrent.t3071019.torrent"
						},
						originalFileData: {
							fieldname: "torrent",
							originalname: "torrent.t3071019.torrent",
							encoding: "7bit",
							mimetype: "application/x-bittorrent",
							destination: "./files/torrents",
							filename:
								"1721821659094_-_torrent.t3071019.torrent",
							path: "files\\torrents\\1721821659094_-_torrent.t3071019.torrent",
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
					torrentUploadRouteResponseSchema.parse(data1)
				).toThrow()
				expect(() =>
					torrentUploadRouteResponseSchema.parse(data2)
				).toThrow()
				expect(() =>
					torrentUploadRouteResponseSchema.parse(data3)
				).toThrow()
			})
		})

		describe("torrentGetRouteResponseSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data1: TorrentGetRouteResponseSchema = {
					ok: true,
					data: {
						id: 1,
						name: "Hello",
						reference_pack_id: 1,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				}

				const data2: TorrentGetRouteResponseSchema = {
					ok: false,
					error: "Hy"
				}

				expect(
					torrentGetRouteResponseSchema.parse(data1)
				).toStrictEqual(data1)
				expect(
					torrentGetRouteResponseSchema.parse(data2)
				).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentGetRouteResponseSchema.parse({
						badReq: ""
					})
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				expect(() =>
					torrentGetRouteResponseSchema.parse({
						ok: true,
						data: {
							id: 1,
							name: "Hello",
							reference_pack_id: 1,
							url: "http://github.com",
							createdAt: "2024-07-24T10:49:01.854Z",
							updatedAt: "2024-07-24T10:49:01.854Z",
							a: 1
						}
					})
				).toThrow()
			})
		})

		describe("torrentDeleteRouteResponseSchema", () => {
			it("should parse the data correctly and not throw", () => {
				const data1: TorrentDeleteRouteResponseSchema = {
					ok: true,
					data: {
						id: 1,
						name: "Hello",
						reference_pack_id: 1,
						url: "http://github.com",
						createdAt: "2024-07-24T10:49:01.854Z",
						updatedAt: "2024-07-24T10:49:01.854Z"
					}
				}

				const data2: TorrentDeleteRouteResponseSchema = {
					ok: false,
					error: "Hy"
				}

				expect(
					torrentDeleteRouteResponseSchema.parse(data1)
				).toStrictEqual(data1)
				expect(
					torrentDeleteRouteResponseSchema.parse(data2)
				).toStrictEqual(data2)
			})

			it("should throw if the data is lacking mandatory fields", () => {
				expect(() =>
					torrentDeleteRouteResponseSchema.parse({
						badReq: ""
					})
				).toThrow()
			})

			it("should throw if the data contains mandatory fields but has an extra property", () => {
				expect(() =>
					torrentDeleteRouteResponseSchema.parse({
						ok: true,
						data: {
							id: 1,
							name: "Hello",
							reference_pack_id: 1,
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
