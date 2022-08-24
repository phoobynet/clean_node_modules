#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: cnm <rootDir>')
  process.exit(1)
}

const dir = args[0]

if (!fs.existsSync(dir)) {
  console.error(`Directory ${dir} does not exist`)
  process.exit(1)
}

/** @typedef {Object} Cleanable
 * @property {string} path
 * @property {boolean} hasNodeModules
 * */

/** @type {Array<Cleanable>} */
const cleanMe = []

fs.readdirSync(dir).forEach((file) => {
  const filePath = path.join(dir, file)

  const stat = fs.statSync(filePath)

  if (stat.isDirectory()) {
    const nodeModulesPath = path.join(filePath, 'node_modules')
    const hasNodeModules = fs.existsSync(nodeModulesPath)
    if (hasNodeModules) {
      cleanMe.push({
        path: nodeModulesPath,
        hasNodeModules,
      })
    }
  }
})

let count = 1
let l = cleanMe.length
for (const cleanable of cleanMe) {
  rimraf(cleanable.path, () => {
    console.log(`Cleaning (${count++} of ${l}): ${cleanable.path}`)
  })
}
