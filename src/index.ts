/**
 * Converts a string to camelCase.
 *
 * @example
 * ```ts
 * import { camelCase } from "@idlapps/t";
 *
 * camelCase("hello-world");    // "helloWorld"
 * camelCase("foo_bar_baz");    // "fooBarBaz"
 * camelCase("Hello World");    // "helloWorld"
 * camelCase("alreadyCamel");   // "alreadyCamel"
 * ```
 */
export function camelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char: string | undefined) =>
      char ? char.toUpperCase() : ""
    )
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if truncated.
 *
 * @example
 * ```ts
 * import { truncate } from "@idlapps/t";
 *
 * truncate("Hello, World!", 5);   // "Hello..."
 * truncate("Hi", 10);            // "Hi"
 * truncate("abcdefghij", 7);     // "abcd..."
 * ```
 */
export function truncate(str: string, maxLength: number, suffix = "..."): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Converts a string to kebab-case.
 *
 * @example
 * ```ts
 * import { kebabCase } from "@idlapps/t";
 *
 * kebabCase("helloWorld");      // "hello-world"
 * kebabCase("foo_bar_baz");     // "foo-bar-baz"
 * kebabCase("Hello World");     // "hello-world"
 * ```
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}
