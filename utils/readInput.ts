import { readFileSync } from "fs"

export const readInputToString = (filename: string) =>
    readFileSync(filename, "utf8")

export const splitInputToLines = (input: string) => input.split(/\r\n/)

export const splitLinesTo2DMap = (lines: string[]) => {
    const map = new Map<`${number},${number}`, string>()
    lines.forEach((line, y) => {
        line.split("").forEach((symbol, x) => {
            map.set(`${x},${y}`, symbol)
        })
    })
    return map
}
