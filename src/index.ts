const template = document.createElement('template');

export function t(value: unknown) {
  template.innerHTML = String(value);

  const refs: Record<string, HTMLElement> = {};
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT);
  let node: HTMLElement | null;
  while ((node = walker.nextNode() as HTMLElement | null)) {
    if (node.hasAttribute('ref')) {
      refs[node.getAttribute('ref')!] = node;
      node.removeAttribute('ref');
    }
  }

  document.body.appendChild(template.content);
  return refs;
}
