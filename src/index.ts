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

const colors = new Set(['red','blue','green','white','black','yellow','orange','purple','pink','teal','cyan','magenta','lime','maroon','navy','olive','gray','grey','silver','gold','coral','salmon','tomato','crimson','indigo','violet','turquoise','plum','orchid','khaki','lavender','ivory','beige','tan','wheat','peru','sienna','chocolate','firebrick','darkred','lightgreen','darkgreen','lightblue','darkblue','darkcyan','darkmagenta','darkviolet','darkorange','darkgoldenrod','darkslategray','darkolivegreen','mediumseagreen','mediumturquoise','mediumslateblue','mediumorchid','mediumpurple','hotpink','deeppink','palevioletred','lightsalmon','lightcoral','skyblue','lightskyblue','steelblue','dodgerblue','cornflowerblue','royalblue','slateblue','mediumblue','midnightblue','aquamarine','chartreuse','springgreen','forestgreen','limegreen','lawngreen','darkseagreen','palegreen','lightyellow','lemonchiffon','paleturquoise','powderblue','lightsteelblue','aliceblue','ghostwhite','snow','floralwhite','oldlace','linen','antiquewhite','mintcream','mistyrose','peachpuff','navajowhite','burlywood','sandybrown','darksalmon','rosybrown','darkkhaki','palegoldenrod','cadetblue','lightcyan','azure','honeydew','thistle','gainsboro','whitesmoke','darkgray','dimgray','lightslategray','slategray']);
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
    if (/^\d/.test(raw) || colors.has(raw.toLowerCase()) || raw[0] === '-' && /^\d/.test(raw.slice(1))) {
      const resolved = resolve(A[p]);
      const props = resolved.includes(':') ? resolved.split(':') : [resolved];
      return props.map(k => transforms.has(k) ? `transform:${k}(${val})` : `${kebab(k)}:${val}`).join(';');
    }
  }
  return '';
}

let C = 0;
const R: string[] = [];
const pendingHoverTarget: { el: Element; level: number; css: string }[] = [];

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
    const hm = a.name.match(/^h(\d+):(.+)$/);
    if (hm) {
      const css = parse(hm[2]);
      if (css) pendingHoverTarget.push({ el, level: +hm[1], css });
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
  for (const { el, level, css } of pendingHoverTarget) {
    let ancestor: HTMLElement | null = el as HTMLElement;
    for (let i = 0; i < level; i++) ancestor = ancestor?.parentElement ?? null;
    if (ancestor && ancestor !== el) {
      const tCls = `_t${C++}`;
      const hCls = `_t${C++}`;
      ancestor.classList.add(tCls);
      el.classList.add(hCls);
      R.push(`.${tCls}:hover .${hCls}{${css.split(';').map(p => p + '!important').join(';')}}`);
    }
  }
  pendingHoverTarget.length = 0;
  document.body.appendChild(T.content);
  if (R.length) {
    const el = document.querySelector('style[data-t]') as HTMLStyleElement || (() => { const s = document.createElement('style'); s.setAttribute('data-t', ''); return document.head.appendChild(s); })();
    el.textContent += R.join('');
    R.length = 0;
  }
  return refs;
}
