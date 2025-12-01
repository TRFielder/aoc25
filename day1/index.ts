import { readInputToString, splitInputToLines } from "../utils/readInput"

const STARTING_POSITION = 50

export const part1 = (input: string) => {
    const lines = splitInputToLines(readInputToString(input))

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

export const part2 = (input: string) => {
    const lines = splitInputToLines(readInputToString(input))

    const result = lines.reduce(
        (acc: { zeroCount: number; position: number }, line: string) => {
            const vector = splitLineToDirectionAndMagnitude(line)
            let count = acc.zeroCount

            if (vector.direction === "L") {
                // Left movement
                if (acc.position - vector.magnitude < 0) {
                    // We go negative, so we wrap
                    count += Math.abs(
                        Math.floor(
                            (100 + acc.position - vector.magnitude) / 100
                        )
                    )
                    if (acc.position !== 0) {
                        count += 1
                    }
                }
                const newPosition =
                    (((acc.position - vector.magnitude) % 100) + 100) % 100
                if (newPosition === 0) {
                    count += 1
                }
                return { zeroCount: count, position: newPosition }
            } else {
                // Right movement
                count += Math.floor((acc.position + vector.magnitude) / 100)
                const newPosition = (acc.position + vector.magnitude) % 100
                return { zeroCount: count, position: newPosition }
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

const moveByDirectionAndCountZeroPasses = ({
    currentPosition,
    direction,
    magnitude,
}: {
    currentPosition: number
    direction: string
    magnitude: number
}) => {
    let timesPassedZero = 0

    if (direction === "R") {
        // Moving right: check if we pass through 0 (position 0/100) during rotation
        const start = currentPosition
        const end = currentPosition + magnitude
        // How many complete 100s do we cross?
        timesPassedZero = Math.floor(end / 100) - Math.floor(start / 100)

        // But if we BOTH start and end at 0, we should count the intermediate passes

        // If we end on a multiple of 100, that doesn't count as passing zero
        if (end % 100 === 0 && timesPassedZero > 0) {
            timesPassedZero -= 1
        }

        // Only subtract for starting at 0 if we didn't already subtract for landing at 0
        if (start === 0 && timesPassedZero > 0 && end % 100 !== 0) {
            timesPassedZero -= 1
        }
    } else {
        // Moving left: check if we pass through 0 during rotation
        const start = currentPosition
        const end = currentPosition - magnitude
        // We pass through 0 if we go negative
        if (end < 0) {
            // How many times do we cross 0?
            // If we start at 0, the first crossing doesn't count
            // Otherwise, going from position to 0 is one crossing, then every 100 more
            if (start === 0) {
                // Starting at 0, count full wraps only
                timesPassedZero = Math.floor((magnitude - 1) / 100)
            } else {
                // Not starting at 0, count the first crossing plus full wraps
                timesPassedZero =
                    Math.floor((magnitude - currentPosition) / 100) + 1
            }
            // If we land exactly on 0 don't count it
            if (end % 100 === 0) {
                timesPassedZero -= 1
            }
        }
    }

    const directionAsVector = direction === "L" ? -1 : 1
    const newPosition = currentPosition + directionAsVector * magnitude
    const wrappedResult = ((newPosition % 100) + 100) % 100

    return { newPosition: wrappedResult, timesPassedZero }
}
