import { t } from '../dist/index.mjs';

function test(name: string, expected: string) {
  document.body.innerHTML = '';
  const { r } = t(`<div ${name} ref=r></div>`);
  const actual = r?.getAttribute('style') || '';
  const pass = actual === expected;
  console.log(`${pass ? '✓' : '✗'} ${name} → "${actual}" ${pass ? '' : `(expected "${expected}")`}`);
}

// Margin
test('m10', 'margin:10px');
test('ml10', 'margin-left:10px');
test('mr10', 'margin-right:10px');
test('mt10', 'margin-top:10px');
test('mb10', 'margin-bottom:10px');
test('mx10', 'margin-left:10px;margin-right:10px');
test('my10', 'margin-top:10px;margin-bottom:10px');
test('mx20p', 'margin-left:20%;margin-right:20%');

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
test('minw100', 'min-width:100px');
test('maxw200', 'max-width:200px');
test('minh100', 'min-height:100px');
test('maxh200', 'max-height:200px');

// Colors/Background
test('bg-red', 'background-color:red');
test('cl-white', 'color:white');

// Typography
test('fs14', 'font-size:14px');
test('fw-bold', 'font-weight:bold');
test('lh15', 'line-height:15px');
test('ls1', 'letter-spacing:1px');
test('ta-center', 'text-align:center');

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
test('b1', 'border:1px');
test('bt1', 'border-top:1px');
test('br1', 'border-right:1px');
test('bb1', 'border-bottom:1px');
test('bl1', 'border-left:1px');

// Other
test('rounded8', 'border-radius:8px');
test('shadow-sm', 'box-shadow:sm');
test('opacity50', 'opacity:50px');
test('z10', 'z-index:10');
test('overflow-hidden', 'overflow:hidden');
test('gap10', 'gap:10px');
test('justify-center', 'justify-content:center');
test('items-center', 'align-items:center');

// Refs
document.body.innerHTML = '';
const { myRef } = t(`<div p10 ref=myRef>Hello</div>`);
console.log(`${myRef?.getAttribute('style') === 'padding:10px' ? '✓' : '✗'} ref extracted and style applied`);
