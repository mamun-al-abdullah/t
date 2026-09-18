const T = document.createElement('template');

const A: Record<string, string> = {
  m: 'margin', p: 'padding', t: 'top', r: 'right', b: 'bottom', l: 'left',
  x: '$l:$r', y: '$t:$b', w: 'width', h: 'height', min: 'min', max: 'max',
  P: 'position', D: 'display', fd: 'flexDirection', C: 'center',
  bg: 'backgroundColor', cl: 'color',
  fs: 'fontSize', fw: 'fontWeight', lh: 'lineHeight', ls: 'letterSpacing', ta: 'textAlign',
  bd: 'border', rounded: 'borderRadius', shadow: 'boxShadow',
  opacity: 'opacity', z: 'zIndex', overflow: 'overflow',
  gap: 'gap', justify: 'justifyContent', items: 'alignItems',
  ml: '$m$l', mr: '$m$r', mt: '$m$t', mb: '$m$b', mx: '$m$x', my: '$m$y',
  pl: '$p$l', pr: '$p$r', pt: '$p$t', pb: '$p$b', px: '$p$x', py: '$p$y',
  minw: '$min$w', minh: '$min$h', maxw: '$max$w', maxh: '$max$h',
};

const F: Record<string, string> = {
  absolute: '$P:absolute', a: '$P:absolute',
  relative: '$P:relative', r: '$P:relative',
  fixed: '$P:fixed', f: '$P:fixed', sticky: '$P:sticky',
  flex: '$D:flex', c: '$D:flex;$justify:$C;$items:$C',
  h: '$D:flex;$fd:row', v: '$D:flex;$fd:column',
  b: '$bd', bt: '$bd$t', br: '$bd$r', bb: '$bd$b', bl: '$bd$l',
};

const P = Object.keys(A).sort((a, b) => b.length - a.length);

const resolve = (s: string): string => {
  while (s.includes('$')) s = s.replace(/\$([a-zA-Z]+)/g, (_, k) => A[k] ?? k);
  return s;
};

const kebab = (s: string) => s.replace(/([A-Z])/g, '-$1').toLowerCase();

const toCSS = (v: string) => v.split(';').map(p => { const [k, val] = p.split(':'); return `${kebab(k)}:${val}`; }).join(';');

function parse(attr: string): string {
  if (F[attr]) return toCSS(resolve(F[attr]));

  for (const p of P) {
    if (!attr.startsWith(p)) continue;
    const raw = attr.slice(p.length);
    if (!raw) continue;
    const val = /^\d+$/.test(raw) ? `${raw}px` : /^\d+p$/.test(raw) ? `${raw.slice(0, -1)}%` : raw;
    const resolved = resolve(A[p]);
    const props = resolved.includes(':') ? resolved.split(':') : [resolved];
    return props.map(k => `${kebab(k)}:${val}`).join(';');
  }
  return '';
}

function apply(el: Element) {
  const s: string[] = [];
  for (const a of Array.from(el.attributes)) {
    if (a.name === 'ref') continue;
    const css = parse(a.name);
    if (css) { s.push(css); el.removeAttribute(a.name); }
  }
  if (s.length) el.setAttribute('style', (el.getAttribute('style') || '') + s.join(';'));
}

export function t(value: unknown) {
  T.innerHTML = String(value);
  const refs: Record<string, HTMLElement> = {};
  const w = document.createTreeWalker(T.content, NodeFilter.SHOW_ELEMENT);
  let n: HTMLElement | null;
  while ((n = w.nextNode() as HTMLElement | null)) {
    apply(n);
    if (n.hasAttribute('ref')) { refs[n.getAttribute('ref')!] = n; n.removeAttribute('ref'); }
  }
  document.body.appendChild(T.content);
  return refs;
}
