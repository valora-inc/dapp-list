module.exports = {
  "watchman": false,
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "testPathIgnorePatterns": [
    "dist"
  ],
  "globals": {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  }
}
