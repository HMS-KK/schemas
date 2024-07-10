import { describe, expect, it } from "vitest"
import {
	errorResponseSchema,
	successResponseSchema,
	apiResponseSchema
} from "../src/responses.js"
import { z } from "zod"

describe("responses", () => {
	describe("successResponse", () => {
		it("should parse the data correctly and not throw", () => {
			const schema = successResponseSchema(
				z.object({
					url: z.string().url()
				})
			)

			const expected = {
				ok: true,
				data: {
					url: "https://github.com"
				}
			}

			const result = schema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the response is not shaped like a success-response", () => {
			const schema = successResponseSchema(z.string())

			expect(() => schema.parse({ badReq: "" })).toThrow()
		})

		it("should throw if the response shape is correct but the data shape is not", () => {
			const schema = successResponseSchema(
				z.object({ url: z.string().url() })
			)

			expect(() =>
				schema.parse({
					ok: true,
					data: {
						url: 1
					}
				})
			).toThrow()
		})
	})

	describe("errorResponse", () => {
		it("should parse the data correctly and not throw", () => {
			const expected = {
				ok: false,
				error: "There was an error"
			}

			const result = errorResponseSchema.parse(expected)

			expect(result).toStrictEqual(expected)
		})

		it("should throw if the response is not shaped like an error-response", () => {
			expect(() =>
				errorResponseSchema.parse({ badReq: "" })
			).toThrow()
		})

		it("should throw if the response shape is correct but the data shape is not", () => {
			expect(() =>
				errorResponseSchema.parse({ ok: false, error: 1 })
			).toThrow()
		})
	})

	describe("apiResponseSchema", () => {
		it("should parse the ok=true response correctly and not throw", () => {
			const schema = apiResponseSchema(
				z.object({
					url: z.string().url()
				})
			)

			const expected = {
				ok: true,
				data: {
					url: "https://github.com"
				}
			}

			expect(schema.parse(expected)).toStrictEqual(expected)
		})

		it("should throw when ok=true but the shape is incorrect", () => {
			const schema = apiResponseSchema(z.string())

			expect(() =>
				schema.parse({
					ok: true,
					message: "Hi"
				})
			).toThrow()
		})

		it("should parse the ok=false response correctly and not throw", () => {
			const schema = apiResponseSchema(
				z.object({
					url: z.string().url()
				})
			)

			const expected = {
				ok: false,
				error: "There was an error"
			}

			expect(schema.parse(expected)).toStrictEqual(expected)
		})

		it("should throw when ok=false but the shape is incorrect", () => {
			const schema = apiResponseSchema(z.string())

			expect(() =>
				schema.parse({
					ok: false,
					message: "Hi"
				})
			).toThrow()
		})
	})
})
