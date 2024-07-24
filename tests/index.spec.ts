import { describe, expect, it } from "vitest"

describe("index.ts file", () => {
	it("should be imported without throwing an error", async () => {
		const index = await import("../src/index.js")

		expect(index).toBeTruthy()
	})
})
