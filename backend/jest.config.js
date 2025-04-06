export default {
  preset: "ts-jest/presets/default-esm", // Use ESM + ts-jest
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    // Allow importing with ".js" extension in ESM while targeting .ts files
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

// export default {
//   preset: "ts-jest/presets/default-esm",
//   transform: {
//     "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
//   },
//   testEnvironment: "node",
//   extensionsToTreatAsEsm: [".ts"],
//   globals: {
//     "ts-jest": {
//       useESM: true,
//     },
//   },
// };
