import { describe, expect, it } from "vitest"
import {
	originalFileDataSchema,
	type OriginalFileDataSchema
} from "../src/shared/originalFileData.js"

describe("originalFileData", () => {
	it("should parse the data correctly and not throw", () => {
		const expected: OriginalFileDataSchema = {
			mimetype: "application/x-bittorrent",
			destination: "./files",
			filename: "1721821659094_-_torrent.t3071019.torrent",
			size: 166164
		}

		const result = originalFileDataSchema.parse(expected)

		expect(result).toStrictEqual(expected)
	})

	it("should throw if the data is lacking mandatory fields", () => {
		expect(() =>
			originalFileDataSchema.parse({ badReq: "" })
		).toThrow()
	})

	it("should throw if the data contains mandatory fields but has an extra property", () => {
		expect(() =>
			originalFileDataSchema.parse({
				mimetype: "application/x-bittorrent",
				destination: "./files",
				filename:
					"1721821659094_-_torrent.t3071019.torrent",
				size: 166164,
				a: 1
			})
		).toThrow()
	})
})
