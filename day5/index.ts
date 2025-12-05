import { readInputToString, splitInputToLines } from "../utils/readInput"

export const part1 = (input: string) => {
    // Get each line
    const lines = splitInputToLines(readInputToString(input))

    // Get the ingredients - split the input into two sections
    const emptyLineIndex = lines.indexOf("")

    // Parse the ingredient ranges into a tuple we can use
    const ingredientRanges = lines.slice(0, emptyLineIndex).map((range) => {
        const [start, end] = range.split("-")
        return [parseInt(start), parseInt(end)]
    })

    // Get the list of available ingredient IDs to check
    const availableIngredientIds = lines
        .slice(emptyLineIndex + 1)
        .map((id) => parseInt(id))

    let freshIngredientCount = 0

    // For each available ingredient ID, check if it falls within any of the ranges
    availableIngredientIds.forEach((id) => {
        // Check if this ID is between the start and end of any range
        const isInRange = ingredientRanges.some(
            ([start, end]) => id >= start && id <= end
        )

        // If it's in at least one of the ranges, it's fresh
        if (isInRange) {
            freshIngredientCount += 1
        }
    })

    return freshIngredientCount
}

export const part2 = (input: string) => {
    // Get each line
    const lines = splitInputToLines(readInputToString(input))

    // Get the ingredients - split the input into two sections
    const emptyLineIndex = lines.indexOf("")

    // Parse the ingredient ranges into a tuple we can use
    const ingredientRanges = lines.slice(0, emptyLineIndex).map((range) => {
        const [start, end] = range.split("-")
        return [parseInt(start), parseInt(end)]
    })

    // Sort the ranges by start position
    const sortedRanges = ingredientRanges.sort(([a], [b]) => a - b)

    // Merge ranges which overlap so we don't count duplicates
    const mergedRanges: number[][] = []

    let [currentStart, currentEnd] = sortedRanges[0]

    // Compare against the next range up and see if it overlaps
    for (let i = 1; i < sortedRanges.length; i++) {
        const [start, end] = sortedRanges[i]

        // if the start of the next range is less than the end of the current one...
        if (start <= currentEnd + 1) {
            // ... then the ranges overlap, so we'll extend the current one
            currentEnd = Math.max(currentEnd, end)
        } else {
            // Otherwise there's no overlap, so we can set just push the current range in
            mergedRanges.push([currentStart, currentEnd])
            // and update our "current" range for the next iteration
            currentStart = start
            currentEnd = end
        }
    }
    // At the end there's one range we don't have anything to compare against, that we can just push in
    mergedRanges.push([currentStart, currentEnd])

    // Count unique numbers across all the merged ranges
    const totalUniqueNumbers = mergedRanges.reduce((acc, [start, end]) => {
        return acc + (end - start + 1)
    }, 0)

    return totalUniqueNumbers
}
