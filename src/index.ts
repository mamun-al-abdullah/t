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
  gap: 'gap', justify: 'justifyContent', items: 'alignItems',
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

const colors = new Set(['transparent','currentcolor','inherit','initial','unset','red','blue','green','white','black','yellow','orange','purple','pink','teal','cyan','magenta','lime','maroon','navy','olive','gray','grey','silver','gold','coral','salmon','tomato','crimson','indigo','violet','turquoise','plum','orchid','khaki','lavender','ivory','beige','tan','wheat','peru','sienna','chocolate','firebrick','darkred','lightgreen','darkgreen','lightblue','darkblue','darkcyan','darkmagenta','darkviolet','darkorange','darkgoldenrod','darkslategray','darkolivegreen','mediumseagreen','mediumturquoise','mediumslateblue','mediumorchid','mediumpurple','hotpink','deeppink','palevioletred','lightsalmon','lightcoral','skyblue','lightskyblue','steelblue','dodgerblue','cornflowerblue','royalblue','slateblue','mediumblue','midnightblue','aquamarine','chartreuse','springgreen','forestgreen','limegreen','lawngreen','darkseagreen','palegreen','lightyellow','lemonchiffon','paleturquoise','powderblue','lightsteelblue','aliceblue','ghostwhite','snow','floralwhite','oldlace','linen','antiquewhite','mintcream','mistyrose','peachpuff','navajowhite','burlywood','sandybrown','darksalmon','rosybrown','darkkhaki','palegoldenrod','cadetblue','lightcyan','azure','honeydew','thistle','gainsboro','whitesmoke','darkgray','dimgray','lightslategray','slategray']);
const keywords = new Set(['bold','bolder','lighter','normal','italic','oblique','thin','hairline','semibold','extrabold','ultrabold','medium','regular','small','xxsmall','xsmall','large','xlarge','xxlarge','smaller','larger','normal','collapse','hidden','visible','scroll','auto','block','inline','inlineblock','inlineflex','grid','inlinegrid','none','contents','unset','inherit','initial','solid','dashed','dotted','double','groove','ridge','inset','outset','cover','contain','fill','stroke','running','paused','forwards','backwards','both','ease','linear','easein','easeout','easeinout','stepstart','stepend','nowrap','pre','prewrap','preline','breakspace','uppercase','lowercase','capitalize','center','justify','start','end','stretch','baseline','sub','super','overline','through','pointer','default','notallowed','text','wait','help','progress','snapstart','snapend','snapcenter','snearest','mandatory','smooth','noerase','erase','vertical','horizontal','row','column','rowreverse','columnreverse','wrap','wrapreverse','sm','md','lg','xl','2xl']);
const unitless = new Set(['z', 'opacity', 'zIndex']);
const ms = new Set(['tn', 'transition']);
const transforms = new Set(['tx', 'ty', 'translateX', 'translateY', 'tr', 'ts', 'rotate', 'scale']);
const solidSuffix = new Set(['ba', 'bt', 'br', 'bb', 'bl', 'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft']);
const deg = new Set(['tr', 'rotate']);
const unitlessVal = new Set(['ts', 'scale']);
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
  if (/^-?\d+$/.test(raw)) return unitless.has(prop) || unitlessVal.has(prop) ? raw : ms.has(prop) ? `${raw}ms` : deg.has(prop) ? `${raw}deg` : `${raw}px`;
  if (/^-?\d+p$/.test(raw)) return `${raw.slice(0, -1)}%`;
  return raw;
}

const hex = /^#([0-9a-f]{3,8})$/i;
const fn = /^(rgba?|hsla?|oklch|color|linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient)\(.+\)$/i;

function parse(attr: string): string {
  if (exact[attr]) return toCSS(resolve(exact[attr]));

  for (const p of AP) {
    if (!attr.startsWith(p) || p.length >= attr.length) continue;
    const raw = attr.slice(p.length);
    const val = parseVal(raw, p);
    if (/^\d/.test(raw) || colors.has(raw.toLowerCase()) || keywords.has(raw.toLowerCase()) || hex.test(raw) || fn.test(raw) || raw[0] === '-' && /^\d/.test(raw.slice(1))) {
      const resolved = resolve(A[p]);
      const props = resolved.includes(':') ? resolved.split(':') : [resolved];
      return props.map(k => transforms.has(k) ? `transform:${k}(${val})` : solidSuffix.has(p) && /^\d/.test(raw) ? `${kebab(k)}:${val} solid` : `${kebab(k)}:${val}`).join(';');
    }
  }
  return '';
}

let C = 0;
const R: string[] = [];
const pseudo: Record<string, string> = { h: 'hover', a: 'active', f: 'focus', fw: 'focus-within', fv: 'focus-visible', d: 'disabled', ch: 'checked', v: 'visited', ln: 'link' };
const PS = Object.keys(pseudo).sort((a, b) => b.length - a.length);
const pendingTarget: { el: Element; level: number; css: string; media?: number; pseudo: string }[] = [];

function mediaWrap(m: number | undefined, css: string): string {
  return m ? `@media(min-width:${m}px){${css}}` : css;
}

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
        R.push(mediaWrap(media, `.${cls}:${pseudo[p]}{${css.split(';').map(p => p + '!important').join(';')}}`));
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
        R.push(mediaWrap(media, `.${cls}{${css.split(';').map(p => p + '!important').join(';')}}`));
      } else {
        s.push(css);
      }
      el.removeAttribute(a.name);
    }
  }
  if (s.length) el.setAttribute('style', (el.getAttribute('style') || '') + s.join(';'));
}

function process(root: Element | DocumentFragment) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let n: HTMLElement | null;
  while ((n = w.nextNode() as HTMLElement | null)) {
    apply(n);
  }
  for (const { el, level, css, media, pseudo: ps } of pendingTarget) {
    let ancestor: HTMLElement | null = el as HTMLElement;
    for (let i = 0; i < level; i++) ancestor = ancestor?.parentElement ?? null;
    if (ancestor && ancestor !== el) {
      const tCls = `_t${C++}`;
      const hCls = `_t${C++}`;
      ancestor.classList.add(tCls);
      el.classList.add(hCls);
      R.push(mediaWrap(media, `.${tCls}:${ps} .${hCls}{${css.split(';').map(p => p + '!important').join(';')}}`));
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
  Object.defineProperty(Element.prototype, 'it', {
    set(v) { this.innerText = v; },
    get()  { return this.innerText; }
  });
  Object.defineProperty(Element.prototype, 'tc', {
    set(v) { this.textContent = v; },
    get()  { return this.textContent; }
  });
}
