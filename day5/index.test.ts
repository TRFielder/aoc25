import { describe, test, expect } from "vitest"
import { part1, part2 } from "."
import { readInputToString, splitInputToLines } from "../utils/readInput"

describe("Day 5", () => {
    test("Part 1", () => {
        expect(part1("./day5/testinput.txt")).toEqual(3)
    })

    test("Part 2", () => {
        expect(part2("./day5/testinput.txt")).toEqual(14)
    })
})
