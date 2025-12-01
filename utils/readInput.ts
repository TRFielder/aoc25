import { readFileSync } from "fs"

export const readInputToString = (filename: string) =>
    readFileSync(filename, "utf8")
