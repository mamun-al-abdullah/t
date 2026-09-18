import { camelCase, kebabCase, truncate } from "../dist/index.mjs";

function renderExamples(containerId, examples) {
  const el = document.getElementById(containerId);
  el.innerHTML = examples
    .map(
      ([input, output]) =>
        `<div class="example-row">
          <span class="example-input">"${input}"</span>
          <span class="example-arrow">&rarr;</span>
          <span class="example-output">"${output}"</span>
        </div>`
    )
    .join("");
}

window.runCamelCase = function () {
  const input = document.getElementById("camelCaseInput").value;
  document.getElementById("camelCaseResult").textContent = camelCase(input);
};

window.runKebabCase = function () {
  const input = document.getElementById("kebabCaseInput").value;
  document.getElementById("kebabCaseResult").textContent = kebabCase(input);
};

window.runTruncate = function () {
  const input = document.getElementById("truncateInput").value;
  const max = parseInt(document.getElementById("truncateMax").value, 10) || 10;
  document.getElementById("truncateResult").textContent = truncate(input, max);
};

renderExamples("camelCaseExamples", [
  ["hello-world", camelCase("hello-world")],
  ["foo_bar_baz", camelCase("foo_bar_baz")],
  ["Hello World", camelCase("Hello World")],
  ["alreadyCamel", camelCase("alreadyCamel")],
]);

renderExamples("kebabCaseExamples", [
  ["helloWorld", kebabCase("helloWorld")],
  ["foo_bar_baz", kebabCase("foo_bar_baz")],
  ["Hello World", kebabCase("Hello World")],
  ["already-kebab", kebabCase("already-kebab")],
]);

renderExamples("truncateExamples", [
  ["Hello, World! (max 5)", truncate("Hello, World!", 5)],
  ["Hi (max 10)", truncate("Hi", 10)],
  ["abcdefghij (max 7)", truncate("abcdefghij", 7)],
  ["Long text here (max 9, suffix …)", truncate("Long text here", 9, "…")],
]);

runCamelCase();
runKebabCase();
runTruncate();
