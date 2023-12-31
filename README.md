# CStack

Debug your code, not the Runtime

- TypeScript supported
- CommonJS (Node.js) supported
- ECMAScript Modules (ESM) supported

[![npm-version](https://img.shields.io/npm/v/cstack.svg)](https://www.npmjs.com/package/cstack)
[![npm-downloads](https://img.shields.io/npm/dm/cstack.svg)](https://npmcharts.com/compare/cstack?minimal=true)

## Table of Contents

- [Why](#why)
- [Installation](#installation)
- [Example](#example)
- [License](#license)

## Why

As a developer you'll often need to inspect call stacks to **debug your code, not the Runtime.** 
Tools like `Error.stack()` provide more information than needed, cluttering your call stack with 
Runtime internals (i.e. `node:internals`) which you don't care about; you're only concerned with 
your code.

## Installation

```bash
npm i cstack # includes type definitions for TypeScript support
```

## Example

```ts
import cstack from "cstack";

function firstCall() {
  console.debug("1");
  secondCall();
}

function secondCall() {
  console.debug("2");
  thirdCall();
}

function thirdCall() {
  console.debug("3");
  console.log(cstack.getStack()); // -> StackFrame[]
  console.log(cstack.getParent("secondCall")); // -> "firstCall"
  console.log(cstack.getTrace(true)); // -> reversed stack trace (chronological)
}

firstCall();
```

## License

[MIT](LICENSE) License
