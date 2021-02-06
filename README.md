# esbuild-circular-dependency-sample

The build result of the decorator given to the constructor parameters is different between tsc and esbuild(v0.8.42).
This repository presents an example of using the Inversify.js decorator.

## How to use

1. Run `npm install`.

2. Run `npm run build`. The code built by tsc will be output to `dist`, and the code built by esbuild will be output to `dist_esbuild`.

3. Run `npm run start:tsc`. The decorator will be recognized correctly and "app1:count 0" will be output to the console.

4. Run `npm run start:esbuild`. It does not work properly and the following error occurs.

```sh
(node:38860) Warning: Accessing non-existent property 'App1Entity' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:38860) UnhandledPromiseRejectionWarning: Error: Entity metadata for App2Entity#app1 was not found. Check if you specified a correct entity object and if it's connected in the connection options.
    at /path/to/node_modules/typeorm/metadata-builder/EntityMetadataBuilder.js:583:23
    at Array.forEach (<anonymous>)
    at EntityMetadataBuilder.computeInverseProperties (/path/to/node_modules/typeorm/metadata-builder/EntityMetadataBuilder.js:579:34)
    at /path/to/node_modules/typeorm/metadata-builder/EntityMetadataBuilder.js:83:74
    at Array.forEach (<anonymous>)
    at EntityMetadataBuilder.build (/path/to/node_modules/typeorm/metadata-builder/EntityMetadataBuilder.js:83:25)
    at ConnectionMetadataBuilder.buildEntityMetadatas (/path/to/node_modules/typeorm/connection/ConnectionMetadataBuilder.js:57:141)
    at Connection.buildMetadatas (/path/to/node_modules/typeorm/connection/Connection.js:514:57)
    at Connection.<anonymous> (/path/to/node_modules/typeorm/connection/Connection.js:127:30)
    at step (/path/to/node_modules/tslib/tslib.js:141:27)
(node:38860) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:38860) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

## Problems and solutions

The difference between these two files seems to be the main factor.

- dist/app1/entities/index.js
- dist_esbuild/app1/entities/index.js

```js
// in dist/app1/entities/index.js
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./App1Entity"), exports);
//# sourceMappingURL=index.js.map
```

```js
// in dist_esbuild/app1/entities/index.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};
__exportStar(exports, __toModule(require("./App1Entity")));
//# sourceMappingURL=index.js.map
```

To avoid this error in the TypeScript source, you need to change the export notation in index.ts without using `* (Star)`.

```ts
// src/app1/entities/index.ts

/** delete */
// export * from './App1Entity';

/** insert */
export { App1Entity } from './App1Entity';
// or
export { default as App1Entity } from './App1Entity';
```
