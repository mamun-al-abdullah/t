export function t(value: unknown) {
  const element = document.createElement('div');
  element.textContent = String(value);
  document.body.appendChild(element);
}
