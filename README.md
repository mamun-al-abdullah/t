# @idlapps/t

Lightweight, tree-shakable string utility functions.

## Install

```bash
npm install @idlapps/t
# or
pnpm add @idlapps/t
# or
yarn add @idlapps/t
```

## Usage

```ts
import { camelCase, truncate } from "@idlapps/t";

camelCase("hello-world");       // "helloWorld"
truncate("Hello, World!", 5);   // "Hello..."
```

## Functions

### `camelCase(str: string): string`

Converts a string to camelCase.

```ts
camelCase("hello-world");    // "helloWorld"
camelCase("foo_bar_baz");    // "fooBarBaz"
camelCase("Hello World");    // "helloWorld"
```

### `truncate(str: string, maxLength: number, suffix?: string): string`

Truncates a string to a maximum length with an optional suffix (default: `"..."`).

```ts
truncate("Hello, World!", 5);    // "Hello..."
truncate("Hi", 10);              // "Hi"
truncate("abcdefghij", 7, "…");  // "abcd…"
```

## Tree Shaking

This library is fully tree-shakable. Only the functions you import are included in your bundle.

```ts
// Only camelCase is included — truncate is eliminated
import { camelCase } from "@idlapps/t";
```

## License

MIT
