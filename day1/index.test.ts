import { describe, test, expect } from "vitest"
import { part1 } from "."
import { readInputToString, splitInputToLines } from "../utils/readInput"

const input = readInputToString("./day1/testinput.txt")
const lines = splitInputToLines(input)

describe("Day 1", () => {
    test("Returns 3", () => {
        expect(part1("./day1/testinput.txt")).toEqual(3)
    })
})
