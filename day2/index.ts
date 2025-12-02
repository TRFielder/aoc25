import { readInputToString, splitInputToLines } from "../utils/readInput"

export const part1 = (input: string) => {
    // ID ranges are separated by commas
    // 11-22,95-115 means 11...22 and 95...115 are IDs
    //An ID is invalid if it contains a sequence repeated twice
    // eg 55, 6464, 123123 are all invalid
    // No IDs have leading 0s eg 0101 (it would be 101 instead, which is valid)
    // This means all 3 digit IDs are valid

    // First get the string and split it by commas into a list of ranges

    const rawInput = readInputToString(input)

    const rangeStrings = rawInput.split(",")

    // Parse range strings into actual range min and max values

    const ranges = rangeStrings.map((range) => {
        const min = parseInt(range.substring(0, range.indexOf("-")))
        const max = parseInt(range.substring(range.indexOf("-") + 1))

        return { min, max }
    })

    // For each range, add the invalid IDs to total
    let total: number = 0

    ranges.forEach((range) => {
        // List through each ID in the range

        for (let i = range.min; i <= range.max; i++) {
            if (isNumberInvalid(i)) total += i
        }
    })

    return total
}

const isNumberInvalid = (number: number) => {
    const numberStr = number.toString()

    // If it doesn't have an even number of digits, we can skip
    if (numberStr.length % 2 === 0) {
        // Check if it has repeating digits
        const firstHalf = numberStr.slice(0, numberStr.length / 2)
        const secondHalf = numberStr.slice(numberStr.length / 2)

        if (firstHalf === secondHalf) return true
    }
    return false
}

export const part2 = (input: string) => {
    const rawInput = readInputToString(input)

    const rangeStrings = rawInput.split(",")

    // Parse range strings into actual range min and max values

    const ranges = rangeStrings.map((range) => {
        const min = parseInt(range.substring(0, range.indexOf("-")))
        const max = parseInt(range.substring(range.indexOf("-") + 1))

        return { min, max }
    })

    // For each range, add the invalid IDs to total
    let total: number = 0

    ranges.forEach((range) => {
        // List through each ID in the range

        for (let i = range.min; i <= range.max; i++) {
            if (isNumberMadeOfRepeatingDigits(i)) total += i
        }
    })

    return total
}

const isNumberMadeOfRepeatingDigits = (number: number) => {
    const numberStr = number.toString()

    // This regex checks if a string is made of repeating digits from the start to the end of the string
    // Regex is great
    const repeatingPattern = /^(\d+)\1+$/

    return repeatingPattern.test(numberStr)
}
