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
