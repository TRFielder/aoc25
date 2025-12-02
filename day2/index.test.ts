import { describe, test, expect } from "vitest"
import { part1, part2 } from "."
import { readInputToString, splitInputToLines } from "../utils/readInput"

const input = readInputToString("./day1/testinput.txt")
const lines = splitInputToLines(input)

describe("Day 2", () => {
    test("Part 1", () => {
        expect(part1("./day2/testinput.txt")).toEqual(1227775554)
    })

    test("Part 2", () => {
        expect(part2("./day2/testinput.txt")).toEqual(4174379265)
    })
})
