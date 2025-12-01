import { readInputToString, splitInputToLines } from "../utils/readInput"

const STARTING_POSITION = 50

export const part1 = (input: string) => {
    const lines = splitInputToLines(readInputToString(input))

    lines.forEach((line) => {
        const vector = splitLineToDirectionAndMagnitude(line)
    })

    const result = lines.reduce(
        (acc: { zeroCount: number; position: number }, line: string) => {
            const vector = splitLineToDirectionAndMagnitude(line)

            const newPosition = moveByDirection({
                currentPosition: acc.position,
                ...vector,
            })

            return {
                zeroCount:
                    newPosition === 0 ? (acc.zeroCount += 1) : acc.zeroCount,
                position: newPosition,
            }
        },
        { zeroCount: 0, position: STARTING_POSITION }
    )

    return result.zeroCount
}

const splitLineToDirectionAndMagnitude = (line: string) => ({
    direction: line.substring(0, 1),
    magnitude: parseInt(line.substring(1)),
})

const moveByDirection = ({
    currentPosition,
    direction,
    magnitude,
}: {
    currentPosition: number
    direction: string
    magnitude: number
}) => {
    const directionAsVector = direction === "L" ? -1 : 1

    const newPosition = currentPosition + directionAsVector * magnitude

    const wrappedResult = ((newPosition % 100) + 100) % 100
    return wrappedResult
}
