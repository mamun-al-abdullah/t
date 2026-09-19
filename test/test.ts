import { t } from '../dist/index.mjs';

function test(name: string, expected: string) {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  const { r } = t(`<div ${name} ref=r></div>`);
  const actual = r?.getAttribute('style') || '';
  const pass = actual === expected;
  if (!pass) console.log(`✗ ${name} → "${actual}" (expected "${expected}")`);
}

// Margin
test('m10', 'margin:10px');
test('m-15', 'margin:-15px');
test('ml10', 'margin-left:10px');
test('ml-10', 'margin-left:-10px');
test('mr10', 'margin-right:10px');
test('mt10', 'margin-top:10px');
test('mb10', 'margin-bottom:10px');
test('mx10', 'margin-left:10px;margin-right:10px');
test('my10', 'margin-top:10px;margin-bottom:10px');
test('mx20p', 'margin-left:20%;margin-right:20%');
test('mx-20p', 'margin-left:-20%;margin-right:-20%');

// Padding
test('p10', 'padding:10px');
test('pl10', 'padding-left:10px');
test('pr10', 'padding-right:10px');
test('pt10', 'padding-top:10px');
test('pb10', 'padding-bottom:10px');
test('px10', 'padding-left:10px;padding-right:10px');
test('py10', 'padding-top:10px;padding-bottom:10px');

// Width/Height
test('w100', 'width:100px');
test('h100', 'height:100px');
test('w50p', 'width:50%');
test('w-50p', 'width:-50%');
test('minw100', 'min-width:100px');
test('maxw200', 'max-width:200px');
test('minh100', 'min-height:100px');
test('maxh200', 'max-height:200px');

// Colors/Background
test('bgred', 'background:red');
test('bgblue', 'background:blue');
test('clwhite', 'color:white');
test('clblack', 'color:black');
test('bgtransparent', 'background:transparent');
test('cltransparent', 'color:transparent');
test('bctransparent', 'border-color:transparent');
test('bg#ff0000', 'background:#ff0000');
test('cl#ffffff', 'color:#ffffff');

// Typography
test('fs14', 'font-size:14px');
test('fwbold', 'font-weight:bold');
test('lh15', 'line-height:15px');
test('ls1', 'letter-spacing:1px');
test('tacenter', 'text-align:center');

// Position
test('a', 'position:absolute');
test('absolute', 'position:absolute');
test('f', 'position:fixed');
test('fixed', 'position:fixed');
test('r', 'position:relative');
test('relative', 'position:relative');
test('sticky', 'position:sticky');

// Flex
test('flex', 'display:flex');
test('c', 'display:flex;justify-content:center;align-items:center');
test('h', 'display:flex;flex-direction:row');
test('v', 'display:flex;flex-direction:column');

// Text align
test('tac', 'text-align:center');
test('tar', 'text-align:right');
test('tal', 'text-align:left');

// Border
test('ba', 'border');
test('ba2', 'border:2px solid');
test('bt1', 'border-top:1px solid');
test('br1', 'border-right:1px solid');
test('bb1', 'border-bottom:1px solid');
test('bl1', 'border-left:1px solid');
test('bcred', 'border-color:red');
test('bctred', 'border-top-color:red');
test('bcrblue', 'border-right-color:blue');
test('bcbgreen', 'border-bottom-color:green');
test('bclwhite', 'border-left-color:white');

// Rounded/Shadow
test('rounded8', 'border-radius:8px');
test('shadowsm', 'box-shadow:sm');

// Other
test('z10', 'z-index:10');
test('overflowhidden', 'overflow:hidden');
test('gap10', 'gap:10px');
test('justifycenter', 'justify-content:center');
test('itemscenter', 'align-items:center');

// Position values
test('l20', 'left:20px');
test('l-20', 'left:-20px');
test('r20', 'right:20px');
test('t20', 'top:20px');
test('l5p', 'left:5%');

// Transition
test('tn500', 'transition:500ms');
test('tn300', 'transition:300ms');

// Transform
test('tx10', 'transform:translateX(10px)');
test('ty20', 'transform:translateY(20px)');
test('tr45', 'transform:rotate(45deg)');
test('tr-90', 'transform:rotate(-90deg)');
test('ts2', 'transform:scale(2)');
test('ts05', 'transform:scale(05)');
test('tx50p', 'transform:translateX(50%)');
test('tx-50p', 'transform:translateX(-50%)');
test('ty-20', 'transform:translateY(-20px)');

// Hover
document.body.innerHTML = '';
document.head.innerHTML = '';
const { r: hr } = t('<div h:bgred h:p15 ref=r></div>');
const hoverStyle = document.querySelector('style[data-t]')?.textContent || '';
const hoverPass = hoverStyle.includes(':hover{background:red!important}') && hoverStyle.includes(':hover{padding:15px!important}');
if (!hoverPass) console.log(`✗ hover rules: ${hoverStyle}`);

// Pseudo-classes
for (const [pfx, pseudo] of [['a', 'active'], ['f', 'focus'], ['fw', 'focus-within'], ['fv', 'focus-visible'], ['d', 'disabled'], ['ch', 'checked'], ['v', 'visited'], ['ln', 'link']]) {
  document.body.innerHTML = ''; document.head.innerHTML = '';
  t(`<div ${pfx}:bgred></div>`);
  const css = document.querySelector('style[data-t]')?.textContent || '';
  if (!css.includes(`:${pseudo}{background:red!important}`)) console.log(`✗ ${pfx}: → ${css}`);
}

// Ancestor pseudo-classes
for (const [pfx, pseudo] of [['a', 'active'], ['f', 'focus'], ['d', 'disabled'], ['ch', 'checked'], ['v', 'visited'], ['ln', 'link']]) {
  document.body.innerHTML = ''; document.head.innerHTML = '';
  t(`<div><span ${pfx}1:bgred></span></div>`);
  const css = document.querySelector('style[data-t]')?.textContent || '';
  if (!css.includes(`:${pseudo} .`)) console.log(`✗ ${pfx}1: → ${css}`);
}

// Refs
document.body.innerHTML = '';
const { myRef } = t('<div p10 ref=myRef>Hello</div>');
if (myRef?.getAttribute('style') !== 'padding:10px') console.log('✗ ref not extracted');

// Multiple elements
document.body.innerHTML = '';
const { s } = t('<div ml10><span mr20 ref=s></span></div>');
if (s?.getAttribute('style') !== 'margin-right:20px') console.log(`✗ nested: ${s?.getAttribute('style')}`);

// ih auto-styles
document.body.innerHTML = '<div id=box></div>';
const box = document.getElementById('box')!;
box.ih = '<div bgred p10>test</div>';
const ihStyle = box.querySelector('div')?.getAttribute('style');
if (ihStyle !== 'background:red;padding:10px') console.log(`✗ ih: ${ihStyle}`);

// ih nested
box.ih = '<div bgblue p20><span bgred p5>nested</span></div>';
const nd = box.querySelector('div')?.getAttribute('style');
const ns = box.querySelector('span')?.getAttribute('style');
if (nd !== 'background:blue;padding:20px') console.log(`✗ ih nested div: ${nd}`);
if (ns !== 'background:red;padding:5px') console.log(`✗ ih nested span: ${ns}`);

// ih hover
box.ih = '<div h:bgred>hover</div>';
const hcss = document.querySelector('style[data-t]')?.textContent || '';
if (!hcss.includes(':hover{background:red!important}')) console.log(`✗ ih hover: ${hcss}`);

// ih dynamic
box.ih = '';
const ch = document.createElement('div');
box.appendChild(ch);
ch.ih = '<span bgteal p15>dyn</span>';
const dynStyle = box.querySelector('span')?.getAttribute('style');
if (dynStyle !== 'background:teal;padding:15px') console.log(`✗ ih dynamic: ${dynStyle}`);

// it/tc are plain aliases (no auto-style)
box.it = 'plain text';
if (box.it !== 'plain text') console.log(`✗ it`);
box.tc = 'text content';
if (box.tc !== 'text content') console.log(`✗ tc`);

// innerHTML does NOT auto-style
box.innerHTML = '<div bgred>no-style</div>';
if (box.querySelector('div')?.getAttribute('style')) console.log('✗ innerHTML should not auto-style');

console.log('All tests complete');
