import { describe, test, expect } from "vitest"
import { part1 } from "."
import { readInputToString } from "../utils/readInput"

const input = readInputToString("./day1/testinput.txt")

describe("Day 1", () => {
    test("Returns 3", () => {
        expect(part1(input)).toEqual(3)
    })
})
