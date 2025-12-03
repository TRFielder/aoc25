import { describe, test, expect } from "vitest"
import { part1, part2 } from "."
import { readInputToString, splitInputToLines } from "../utils/readInput"

const input = readInputToString("./day1/testinput.txt")
const lines = splitInputToLines(input)

describe("Day 3", () => {
    test("Part 1", () => {
        expect(part1("./day3/testinput.txt")).toEqual(357)
    })

    test("Part 2", () => {
        expect(part2("./day3/testinput.txt")).toEqual(3121910778619)
    })
})
