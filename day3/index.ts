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
