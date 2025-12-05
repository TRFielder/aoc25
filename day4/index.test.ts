import { describe, test, expect } from "vitest"
import { part1, part2 } from "."

describe("Day 4", () => {
    test("Part 1", () => {
        expect(part1("./day4/testinput.txt")).toEqual(13)
    })

    test("Part 2", () => {
        expect(part2("./day4/testinput.txt")).toEqual(43)
    })
})
