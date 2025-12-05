import {
    readInputToString,
    splitInputToLines,
    splitLinesTo2DMap,
} from "../utils/readInput"

const ROLL_OF_PAPER = "@"

export const part1 = (input: string) => {
    // Time to read the input into a map...
    const map = splitLinesTo2DMap(splitInputToLines(readInputToString(input)))

    let forkliftableRollsCount = 0

    // For each position in the map, check if it's a roll of paper
    for (const [coordinates, symbol] of map) {
        const [x, y] = coordinates.split(",").map(Number)

        if (symbol === ROLL_OF_PAPER) {
            // Check if there are rolls in the surrounding position

            const upLeft = map.get(`${x - 1},${y - 1}`) === ROLL_OF_PAPER
            const up = map.get(`${x},${y - 1}`) === ROLL_OF_PAPER
            const upRight = map.get(`${x + 1},${y - 1}`) === ROLL_OF_PAPER
            const left = map.get(`${x - 1},${y}`) === ROLL_OF_PAPER
            const right = map.get(`${x + 1},${y}`) === ROLL_OF_PAPER
            const downLeft = map.get(`${x - 1},${y + 1}`) === ROLL_OF_PAPER
            const down = map.get(`${x},${y + 1}`) === ROLL_OF_PAPER
            const downRight = map.get(`${x + 1},${y + 1}`) === ROLL_OF_PAPER

            const surroundingPositions = [
                upLeft,
                up,
                upRight,
                left,
                right,
                downLeft,
                down,
                downRight,
            ]

            const surroundingCount = surroundingPositions.reduce((acc, val) => {
                return val === true ? acc + 1 : acc
            }, 0)

            const canBeForklifted = surroundingCount < 4

            if (canBeForklifted) forkliftableRollsCount += 1
        }
    }

    return forkliftableRollsCount
}

const removeRollsOfPaper = (
    map: Map<`${number},${number}`, string>
): { map: Map<`${number},${number}`, string>; removedRollsCount: number } => {
    // set an [x, y] array of the positions we're removing as we go through,
    // then remove them all from the Map at the end and return the updated map
    const positionsToRemove: Array<[number, number]> = []
    // For each position in the map, check if it's a roll of paper
    for (const [coordinates, symbol] of map) {
        const [x, y] = coordinates.split(",").map(Number)

        if (symbol === ROLL_OF_PAPER) {
            // Check if there are rolls in the surrounding position

            const upLeft = map.get(`${x - 1},${y - 1}`) === ROLL_OF_PAPER
            const up = map.get(`${x},${y - 1}`) === ROLL_OF_PAPER
            const upRight = map.get(`${x + 1},${y - 1}`) === ROLL_OF_PAPER
            const left = map.get(`${x - 1},${y}`) === ROLL_OF_PAPER
            const right = map.get(`${x + 1},${y}`) === ROLL_OF_PAPER
            const downLeft = map.get(`${x - 1},${y + 1}`) === ROLL_OF_PAPER
            const down = map.get(`${x},${y + 1}`) === ROLL_OF_PAPER
            const downRight = map.get(`${x + 1},${y + 1}`) === ROLL_OF_PAPER

            const surroundingPositions = [
                upLeft,
                up,
                upRight,
                left,
                right,
                downLeft,
                down,
                downRight,
            ]

            const surroundingCount = surroundingPositions.reduce((acc, val) => {
                return val === true ? acc + 1 : acc
            }, 0)

            const canBeForklifted = surroundingCount < 4

            if (canBeForklifted) {
                positionsToRemove.push([x, y])
            }
        }
    }

    // Remove the rolls
    positionsToRemove.forEach((position) => {
        const x = position[0]
        const y = position[1]
        map.set(`${x},${y}`, ".")
    })

    return { map, removedRollsCount: positionsToRemove.length }
}

export const part2 = (input: string) => {
    // Time to read the input into a map...
    let map = splitLinesTo2DMap(splitInputToLines(readInputToString(input)))

    let totalRemovedRolls = 0

    while (true) {
        const { map: updatedMap, removedRollsCount } = removeRollsOfPaper(map)

        if (removedRollsCount === 0) break

        totalRemovedRolls += removedRollsCount
        map = updatedMap
    }

    return totalRemovedRolls
}
