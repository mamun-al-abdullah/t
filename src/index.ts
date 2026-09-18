export function t(value: unknown) {
  const template = document.createElement('template');
  template.innerHTML = String(value);

  const refs: Record<string, HTMLElement> = {};
  template.content.querySelectorAll('[ref]').forEach((el) => {
    const name = el.getAttribute('ref')!;
    refs[name] = el as HTMLElement;
    el.removeAttribute('ref');
  });

  document.body.appendChild(template.content);
  return refs;
}
