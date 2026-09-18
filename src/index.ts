const template = document.createElement('template');

const atoms: Record<string, string> = {
  m: 'margin', p: 'padding',
  t: 'top', r: 'right', b: 'bottom', l: 'left',
  x: 'Left:Right', y: 'Top:Bottom',
  w: 'width', h: 'height', min: 'min', max: 'max',
  bg: 'backgroundColor', text: 'color',
  fs: 'fontSize', fw: 'fontWeight', lh: 'lineHeight', ls: 'letterSpacing', ta: 'textAlign',
  bd: 'border', rounded: 'borderRadius', shadow: 'boxShadow',
  opacity: 'opacity', z: 'zIndex', overflow: 'overflow',
  gap: 'gap', justify: 'justifyContent', items: 'alignItems',
};

const shorthandMap: Record<string, string> = {
  ...atoms,
  ml: '$m$l', mr: '$m$r', mt: '$m$t', mb: '$m$b', mx: '$m$x', my: '$m$y',
  pl: '$p$l', pr: '$p$r', pt: '$p$t', pb: '$p$b', px: '$p$x', py: '$p$y',
  minw: '$min$w', minh: '$min$h', maxw: '$max$w', maxh: '$max$h',
  b: '$bd', bt: '$bd$t', br: '$bd$r', bb: '$bd$b', bl: '$bd$l',
};

const fixedMap: Record<string, string> = {
  absolute: 'position:absolute', relative: 'position:relative',
  fixed: 'position:fixed', sticky: 'position:sticky',
};

function resolve(prop: string): string {
  return prop.replace(/\$([a-z]+)/g, (_, ref) => atoms[ref] ?? ref);
}

const prefixes = Object.keys(shorthandMap).sort((a, b) => b.length - a.length);

function camelToKebab(s: string): string {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function parseShorthand(attr: string): string {
  if (fixedMap[attr]) return fixedMap[attr];
  if (attr === 'flex') return 'display:flex';

  for (const prefix of prefixes) {
    if (!attr.startsWith(prefix)) continue;
    const rawVal = attr.slice(prefix.length);
    if (!rawVal) continue;
    const val = /^\d+$/.test(rawVal) ? `${rawVal}px` : /^\d+p$/.test(rawVal) ? `${rawVal.slice(0, -1)}%` : rawVal;
    const resolved = resolve(shorthandMap[prefix]);
    const props = resolved.includes(':') ? resolved.split(':') : [resolved];
    return props.map(p => `${camelToKebab(p)}:${val}`).join(';');
  }
  return '';
}

function applyShortcuts(el: Element) {
  const styles: string[] = [];
  for (const attr of Array.from(el.attributes)) {
    if (attr.name === 'ref') continue;
    const css = parseShorthand(attr.name);
    if (css) { styles.push(css); el.removeAttribute(attr.name); }
  }
  if (styles.length) {
    const existing = el.getAttribute('style') || '';
    el.setAttribute('style', existing ? `${existing};${styles.join(';')}` : styles.join(';'));
  }
}

export function t(value: unknown) {
  template.innerHTML = String(value);
  const refs: Record<string, HTMLElement> = {};
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT);
  let node: HTMLElement | null;
  while ((node = walker.nextNode() as HTMLElement | null)) {
    applyShortcuts(node);
    if (node.hasAttribute('ref')) {
      refs[node.getAttribute('ref')!] = node;
      node.removeAttribute('ref');
    }
  }
  document.body.appendChild(template.content);
  return refs;
}
