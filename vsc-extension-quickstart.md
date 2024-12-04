# VSCode Extension QuickStart

## What's in the Folders

- `src/`: Source code
- `out/`: Compiled JavaScript files
- `package.json`: Extension manifest
- `tsconfig.json`: TypeScript configuration

## Setup

1. Install dependencies
```bash
npm install
```

2. Compile TypeScript
```bash
npm run compile
```

## Debug

- Press `F5` to start debugging
- Set breakpoints in `src/extension.ts`

## Run Tests

```bash
npm test
```

## Key Files

- `src/extension.ts`: Extension logic
- `package.json`: Command & activation configuration

## Publishing Steps

1. Update version in `package.json`
2. Create VSIX package
```bash
vsce package
```
3. Publish to marketplace
```bash
vsce publish
```

## Recommended Extensions

- ESLint
- TypeScript