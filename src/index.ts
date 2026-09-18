const T = document.createElement('template');

const A: Record<string, string> = {
  m: 'margin', p: 'padding', t: 'top', r: 'right', l: 'left', bottom: 'bottom',
  x: '$l:$r', y: '$t:$b', w: 'width', h: 'height', min: 'min', max: 'max',
  P: 'position', D: 'display', fd: 'flexDirection', C: 'center',
  bg: 'backgroundColor', cl: 'color', tn: 'transition',
  tx: 'translateX', ty: 'translateY',
  fs: 'fontSize', fw: 'fontWeight', lh: 'lineHeight', ls: 'letterSpacing', ta: 'textAlign',
  bd: 'border', rounded: 'borderRadius', shadow: 'boxShadow',
  opacity: 'opacity', z: 'zIndex', overflow: 'overflow',
  gap: 'gap', justify: 'justifyContent', items: 'alignItems',
  ml: '$m$l', mr: '$m$r', mt: '$m$t', mb: '$m$bottom',
  mx: '$m$l:$m$r', my: '$m$t:$m$bottom',
  pl: '$p$l', pr: '$p$r', pt: '$p$t', pb: '$p$bottom',
  px: '$p$l:$p$r', py: '$p$t:$p$bottom',
  minw: '$min$w', minh: '$min$h', maxw: '$max$w', maxh: '$max$h',
  b: '$bd', bt: '$bd$t', br: '$bd$r', bb: '$bd$bottom', bl: '$bd$l',
};

const exact: Record<string, string> = {
  absolute: '$P:absolute', a: '$P:absolute',
  relative: '$P:relative', r: '$P:relative',
  fixed: '$P:fixed', f: '$P:fixed', sticky: '$P:sticky',
  flex: '$D:flex', c: '$D:flex;$justify:$C;$items:$C',
  h: '$D:flex;$fd:row', v: '$D:flex;$fd:column',
  tac: '$ta:center', tar: '$ta:right', tal: '$ta:left',
  b: '$bd',
};

const unitless = new Set(['z', 'opacity', 'zIndex']);
const ms = new Set(['tn', 'transition']);
const transforms = new Set(['tx', 'ty', 'translateX', 'translateY']);
const AP = Object.keys(A).sort((a, b) => b.length - a.length);

function resolve(s: string): string {
  while (s.includes('$')) {
    let r = '', i = 0;
    while (i < s.length) {
      if (s[i] === '$') {
        const m = s.slice(i + 1).match(/^[a-zA-Z]+/);
        if (m) {
          const v = A[m[0]] ?? m[0];
          r += r && /[a-zA-Z]$/.test(r) ? v[0].toUpperCase() + v.slice(1) : v;
          i += 1 + m[0].length;
          continue;
        }
      }
      r += s[i++];
    }
    s = r;
  }
  return s;
}

const kebab = (s: string) => s.replace(/([A-Z])/g, '-$1').toLowerCase();

const toCSS = (v: string) => v.split(';').map(p => { const i = p.indexOf(':'); return i > -1 ? `${kebab(p.slice(0, i))}:${p.slice(i + 1)}` : kebab(p); }).join(';');

function parseVal(raw: string, prop: string): string {
  if (/^-?\d+$/.test(raw)) return unitless.has(prop) ? raw : ms.has(prop) ? `${raw}ms` : `${raw}px`;
  if (/^-?\d+p$/.test(raw)) return `${raw.slice(0, -1)}%`;
  return raw;
}

function parse(attr: string): string {
  if (exact[attr]) return toCSS(resolve(exact[attr]));

  for (const p of AP) {
    if (!attr.startsWith(p) || p.length >= attr.length) continue;
    const raw = attr.slice(p.length);
    const val = parseVal(raw, p);
    const resolved = resolve(A[p]);
    const props = resolved.includes(':') ? resolved.split(':') : [resolved];
    return props.map(k => transforms.has(k) ? `transform:${k}(${val})` : `${kebab(k)}:${val}`).join(';');
  }
  return '';
}

let C = 0;
const R: string[] = [];

function apply(el: Element) {
  const s: string[] = [];
  for (const a of Array.from(el.attributes)) {
    if (a.name === 'ref') continue;
    if (a.name.startsWith('h:')) {
      const css = parse(a.name.slice(2));
      if (css) {
        const cls = `_t${C++}`;
        el.classList.add(cls);
        R.push(`.${cls}:hover{${css.split(';').map(p => p + '!important').join(';')}}`);
      }
      el.removeAttribute(a.name);
      continue;
    }
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
  if (R.length) {
    const el = document.querySelector('style[data-t]') as HTMLStyleElement || (() => { const s = document.createElement('style'); s.setAttribute('data-t', ''); return document.head.appendChild(s); })();
    el.textContent = R.join('');
  }
  return refs;
}
