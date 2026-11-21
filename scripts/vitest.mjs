// Runs the Vitest CLI with a normalised working directory.
//
// On Windows, terminals sometimes start in `c:\...` instead of `C:\...`. Vitest then loads two
// copies of itself and every suite fails with "Vitest failed to find the current suite".
// Upper-casing the drive letter before Vitest starts avoids that. No-op on macOS/Linux.
import process from 'node:process'
import { pathToFileURL } from 'node:url'

if (process.platform === 'win32') {
  process.chdir(process.cwd().replace(/^[a-z](?=:)/, (drive) => drive.toUpperCase()))
}

// Resolve the CLI from the (now normalised) cwd so every Vitest module shares one path.
await import(pathToFileURL(`${process.cwd()}/node_modules/vitest/vitest.mjs`).href)
