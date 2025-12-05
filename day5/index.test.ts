import { describe, test, expect } from "vitest"
import { part1 } from "."
import { readInputToString, splitInputToLines } from "../utils/readInput"

const input = readInputToString("./day1/testinput.txt")
const lines = splitInputToLines(input)

describe("Day 3", () => {
    test("Part 1", () => {
        expect(part1("./day5/testinput.txt")).toEqual(3)
    })
})
