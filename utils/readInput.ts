import { readFileSync } from "fs"

export const readInputToString = (filename: string) =>
    readFileSync(filename, "utf8")

export const splitInputToLines = (input: string) => input.split(/\r\n/)
