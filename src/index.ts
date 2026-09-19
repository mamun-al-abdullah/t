declare global {
  interface Element {
    ih: string;
    it: string;
    tc: string;
    ata(...a: string[]): this;
    atr(...a: string[]): this;
    att(...a: string[]): this;
    atg(a: string): string | null;
    ath(a: string): boolean;
  }
}

const T = document.createElement('template');

const A: Record<string, string> = {
  m: 'margin', p: 'padding', t: 'top', r: 'right', l: 'left', b: 'bottom',
  x: '$l:$r', y: '$t:$b', w: 'width', h: 'height', min: 'min', max: 'max',
  P: 'position', D: 'display', fd: 'flexDirection', C: 'center',
  bg: 'background', cl: 'color', tn: 'transition',
  tx: 'translateX', ty: 'translateY', tr: 'rotate', ts: 'scale',
  fs: 'fontSize', fw: 'fontWeight', lh: 'lineHeight', ls: 'letterSpacing', ta: 'textAlign',
  bd: 'border', rounded: 'borderRadius', shadow: 'boxShadow',
  opacity: 'opacity', z: 'zIndex', overflow: 'overflow',
  gap: 'gap', justify: 'justifyContent', items: 'alignItems', sel: 'userSelect',
  ml: '$m$l', mr: '$m$r', mt: '$m$t', mb: '$m$b',
  mx: '$m$l:$m$r', my: '$m$t:$m$b',
  pl: '$p$l', pr: '$p$r', pt: '$p$t', pb: '$p$b',
  px: '$p$l:$p$r', py: '$p$t:$p$b',
  minw: '$min$w', minh: '$min$h', maxw: '$max$w', maxh: '$max$h',
  ba: '$bd', bt: '$bd$t', br: '$bd$r', bb: '$bd$b', bl: '$bd$l',
  bc: 'borderColor', bct: 'borderTopColor', bcr: 'borderRightColor', bcb: 'borderBottomColor', bcl: 'borderLeftColor',
};

const exact: Record<string, string> = {
  absolute: '$P:absolute', a: '$P:absolute',
  relative: '$P:relative', r: '$P:relative',
  fixed: '$P:fixed', f: '$P:fixed', sticky: '$P:sticky',
  flex: '$D:flex', c: '$D:flex;$justify:$C;$items:$C',
  h: '$D:flex;$fd:row', v: '$D:flex;$fd:column',
  tac: '$ta:center', tar: '$ta:right', tal: '$ta:left',
  ba: '$bd',
};

const noPx = new Set(['z', 'opacity', 'zIndex', 'ts', 'scale']);
const ms = new Set(['tn', 'transition']);
const transforms = new Set(['tx', 'ty', 'translateX', 'translateY', 'tr', 'ts', 'rotate', 'scale']);
const solidSuffix = new Set(['ba', 'bt', 'br', 'bb', 'bl', 'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft']);
const colors = new Set(['red','blue','green','white','black','yellow','orange','purple','pink','gray','grey','teal','cyan','magenta','lime','olive','maroon','navy','aqua','fuchsia','silver','transparent','inherit','initial','unset','currentcolor']);
const deg = new Set(['tr', 'rotate']);
const BP: Record<string, number> = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
const BPS = Object.keys(BP).sort((a, b) => b.length - a.length);
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
  if (/^-?\d+$/.test(raw)) return noPx.has(prop) ? raw : ms.has(prop) ? `${raw}ms` : deg.has(prop) ? `${raw}deg` : `${raw}px`;
  if (/^-?\d+p$/.test(raw)) return `${raw.slice(0, -1)}%`;
  return raw;
}

function parse(attr: string): string {
  if (exact[attr]) return toCSS(resolve(exact[attr]));

  for (const p of ['bg', 'cl', 'bc']) {
    if (attr.startsWith(p) && attr.length > p.length) {
      const raw = attr.slice(p.length);
      if (p === 'bc' && !colors.has(raw)) break;
      const val = parseVal(raw, p);
      return `${kebab(p === 'cl' ? 'color' : resolve(A[p]))}:${val}`;
    }
  }

  for (const p of AP) {
    if (!attr.startsWith(p) || p.length >= attr.length) continue;
    const raw = attr.slice(p.length);
    if (!raw) continue;
    const val = parseVal(raw, p);
    const resolved = resolve(A[p]);
    const props = resolved.includes(':') ? resolved.split(':') : [resolved];
    return props.map(k => transforms.has(k) ? `transform:${k}(${val})` : solidSuffix.has(p) && /^\d/.test(raw) ? `${kebab(k)}:${val} solid` : `${kebab(k)}:${val}`).join(';');
  }
  return '';
}

let C = 0;
const R: string[] = [];
const imp = (css: string) => css.split(';').map(p => p + '!important').join(';');
const pseudo: Record<string, string> = { h: 'hover', a: 'active', f: 'focus', fw: 'focus-within', fv: 'focus-visible', d: 'disabled', ch: 'checked', v: 'visited', ln: 'link' };
const PS = Object.keys(pseudo).sort((a, b) => b.length - a.length);
const pendingTarget: { el: Element; level: number; css: string; media?: number; pseudo: string }[] = [];

const mediaWrap = (m: number | undefined, css: string) => m ? `@media(min-width:${m}px){${css}}` : css;

function apply(el: Element) {
  const s: string[] = [];
  for (const a of Array.from(el.attributes)) {
    if (a.name === 'ref') continue;
    let attr = a.name;
    let media: number | undefined;
    for (const bp of BPS) {
      if (attr.startsWith(bp + ':')) { media = BP[bp]; attr = attr.slice(bp.length + 1); break; }
    }
    let matched = false;
    for (const p of PS) {
      if (!attr.startsWith(p + ':') || attr.length <= p.length + 1) continue;
      const sel = attr.slice(p.length + 1);
      if (!sel) continue;
      const css = parse(sel);
      if (css) {
        const cls = `_t${C++}`;
        el.classList.add(cls);
        R.push(mediaWrap(media, `.${cls}:${pseudo[p]}{${imp(css)}}`));
      }
      el.removeAttribute(a.name);
      matched = true;
      break;
    }
    if (matched) continue;
    const hm = attr.match(/^([a-z]+?)(\d+):(.+)$/);
    if (hm && pseudo[hm[1]]) {
      const css = parse(hm[3]);
      if (css) pendingTarget.push({ el, level: +hm[2], css, media, pseudo: pseudo[hm[1]] });
      el.removeAttribute(a.name);
      continue;
    }
    const css = parse(attr);
    if (css) {
      if (media) {
        const cls = `_t${C++}`;
        el.classList.add(cls);
        R.push(mediaWrap(media, `.${cls}{${imp(css)}}`));
      } else {
        s.push(css);
      }
      el.removeAttribute(a.name);
    }
  }
  if (s.length) {
    const keys = s.map(p => p.split(':')[0]);
    const ex = (el.getAttribute('style') || '').split(';').filter(p => p && !keys.includes(p.split(':')[0]));
    el.setAttribute('style', [...ex, ...s].join(';'));
  }
}

function process(root: Element | DocumentFragment) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let n: HTMLElement | null;
  while ((n = w.nextNode() as HTMLElement | null)) apply(n);
  for (const { el, level, css, media, pseudo: ps } of pendingTarget) {
    let ancestor: HTMLElement | null = el as HTMLElement;
    for (let i = 0; i < level; i++) ancestor = ancestor?.parentElement ?? null;
    if (ancestor && ancestor !== el) {
      const tCls = `_t${C++}`;
      const hCls = `_t${C++}`;
      ancestor.classList.add(tCls);
      el.classList.add(hCls);
      R.push(mediaWrap(media, `.${tCls}:${ps} .${hCls}{${imp(css)}}`));
    }
  }
  pendingTarget.length = 0;
  if (R.length) {
    const el = document.querySelector('style[data-t]') as HTMLStyleElement || (() => { const s = document.createElement('style'); s.setAttribute('data-t', ''); return document.head.appendChild(s); })();
    el.textContent += R.join('');
    R.length = 0;
  }
}

const POSITIONS: Record<number, (parent: Element, frag: DocumentFragment) => void> = {
  1: (p, f) => p.before(f),
  2: (p, f) => { while (f.firstChild) p.prepend(f.firstChild); },
  3: (p, f) => p.appendChild(f),
  4: (p, f) => p.after(f),
};

export function t(value: unknown, html?: string, pos?: number) {
  const [parent, content] = typeof value === 'string' ? [null, value] : [value as Element, html];
  T.innerHTML = String(content);
  const refs: Record<string, HTMLElement> = {};
  const w = document.createTreeWalker(T.content, NodeFilter.SHOW_ELEMENT);
  let n: HTMLElement | null;
  while ((n = w.nextNode() as HTMLElement | null)) {
    if (n.hasAttribute('ref')) { refs[n.getAttribute('ref')!] = n; n.removeAttribute('ref'); }
  }
  process(T.content);
  const target = parent || document.body;
  if (pos && POSITIONS[pos]) POSITIONS[pos](target, T.content);
  else target.appendChild(T.content);
  return refs;
}

if (typeof Element !== 'undefined') {
  Object.defineProperty(Element.prototype, 'ih', {
    set(v) { this.innerHTML = v; process(this); },
    get()  { return this.innerHTML; }
  });
  for (const [k, p] of [['it', 'innerText'], ['tc', 'textContent']]) {
    Object.defineProperty(Element.prototype, k, { set(v) { (this as any)[p] = v; }, get() { return (this as any)[p]; } });
  }
  const p = Element.prototype;
  const rmStyle = (el: Element, attr: string) => {
    const css = parse(attr);
    if (css) {
      const keys = css.split(';').map(x => x.split(':')[0]);
      el.setAttribute('style', (el.getAttribute('style') || '').split(';').filter(x => x && !keys.includes(x.split(':')[0])).join(';'));
    }
  };
  p.ata = function(...a: string[]) { for (const v of a) this.setAttribute(v, ''); apply(this); return this; };
  p.atr = function(...a: string[]) { for (const v of a) { this.removeAttribute(v); rmStyle(this, v); } return this; };
  p.att = function(...a: string[]) { let add = false; for (const v of a) { const css = parse(v); const style = this.getAttribute('style') || ''; const has = this.hasAttribute(v) || (css && style.includes(css)); has ? (this.removeAttribute(v), rmStyle(this, v)) : (this.setAttribute(v, ''), add = true); } if (add) apply(this); return this; };
  p.atg = function(a: string) { return this.getAttribute(a); };
  p.ath = function(a: string) { return this.hasAttribute(a); };
}
