import { readInputToString, splitInputToLines } from "../utils/readInput"

export const part1 = (input: string) => {
    // Get each line
    const lines = splitInputToLines(readInputToString(input))

    let total = 0

    // For each line, split it into an array of numbers
    lines.forEach((line) => {
        const numbers = line.split("").map((digit) => parseInt(digit))

        // In each line, find the largest digit as we go up the array
        let maxDigit = Math.max(...numbers)

        // Find where it is in the array
        let indexOfMax = numbers.indexOf(maxDigit)

        // If the max digit is at the end of the array, remove that element and use the next biggest number instead
        if (indexOfMax === numbers.length - 1) {
            const lastElementRemoved = [...numbers].slice(0, -1)

            maxDigit = Math.max(...lastElementRemoved)

            indexOfMax = lastElementRemoved.indexOf(maxDigit)
        }

        // Get a copy of the array from that point on
        const slice = numbers.slice(indexOfMax + 1)
        const secondMaxDigit = Math.max(...slice)

        // Make a number of the two digits and add it to the total
        total += maxDigit * 10 + secondMaxDigit
    })

    return total
}

export const part2 = (input: string) => {
    // Get each line
    const lines = splitInputToLines(readInputToString(input))

    let total = 0

    // For each line, split it into an array of numbers
    lines.forEach((line) => {
        const numbers = line.split("").map((digit) => parseInt(digit))

        // Build a 12-digit number by selecting the largest available digit at each position
        let result = 0
        let start = 0

        // For each of the 12 digits we want in our result
        for (let digitPos = 0; digitPos < 12; digitPos++) {
            // Calculate how far we can look - we need to leave enough digits for remaining positions
            const end = numbers.length - (12 - digitPos) + 1

            // Find the largest digit in the valid range
            const slice = numbers.slice(start, end)
            const maxDigit = Math.max(...slice)

            // Find where it is in the array and move our start position to after it
            start = numbers.indexOf(maxDigit, start) + 1

            // Add this digit to our result
            result = result * 10 + maxDigit
        }

        // Add the 12-digit number to the total
        total += result
    })

    return total
}
