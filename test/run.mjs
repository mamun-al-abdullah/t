import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
globalThis.document = dom.window.document;
globalThis.NodeFilter = dom.window.NodeFilter;
globalThis.Element = dom.window.Element;
const { t } = await import('../dist/index.mjs');
let f=0;
function test(n,e){document.body.innerHTML='';document.head.innerHTML='';const{r}=t('<div '+n+' ref=r></div>');const a=r?.getAttribute('style')||'';if(a!==e){console.log('X '+n+' => '+a+' (expected '+e+')');f++}}
test('m10','margin:10px');test('m-15','margin:-15px');test('ml10','margin-left:10px');test('mr10','margin-right:10px');
test('mt10','margin-top:10px');test('mb10','margin-bottom:10px');test('mx10','margin-left:10px;margin-right:10px');
test('my10','margin-top:10px;margin-bottom:10px');test('mx20p','margin-left:20%;margin-right:20%');
test('p10','padding:10px');test('pl10','padding-left:10px');test('pr10','padding-right:10px');test('pt10','padding-top:10px');
test('pb10','padding-bottom:10px');test('px10','padding-left:10px;padding-right:10px');test('py10','padding-top:10px;padding-bottom:10px');
test('w100','width:100px');test('h100','height:100px');test('w50p','width:50%');
test('bgred','background:red');test('bgblue','background:blue');test('clwhite','color:white');test('clblack','color:black');
test('bgtransparent','background:transparent');test('cltransparent','color:transparent');test('bctransparent','border-color:transparent');
test('bg#ff0000','background:#ff0000');test('cl#ffffff','color:#ffffff');
test('fs14','font-size:14px');test('fwbold','font-weight:bold');test('lh15','line-height:15px');test('ls1','letter-spacing:1px');
test('a','position:absolute');test('f','position:fixed');test('r','position:relative');test('sticky','position:sticky');
test('b20','bottom:20px');test('b-10','bottom:-10px');test('flex','display:flex');
test('c','display:flex;justify-content:center;align-items:center');
test('h','display:flex;flex-direction:row');test('v','display:flex;flex-direction:column');
test('tac','text-align:center');test('tar','text-align:right');
test('ba','border');test('ba2','border:2px solid');test('bt1','border-top:1px solid');test('br1','border-right:1px solid');
test('bb1','border-bottom:1px solid');test('bl1','border-left:1px solid');
test('bcred','border-color:red');test('bctred','border-top-color:red');
test('rounded8','border-radius:8px');test('shadowsm','box-shadow:sm');test('z10','z-index:10');
test('tn500','transition:500ms');test('tx10','transform:translateX(10px)');test('ty20','transform:translateY(20px)');
test('tr45','transform:rotate(45deg)');test('ts2','transform:scale(2)');test('tx50p','transform:translateX(50%)');
for(const[px,ps]of[['h','hover'],['a','active'],['f','focus'],['d','disabled'],['ch','checked'],['v','visited'],['ln','link'],['fw','focus-within'],['fv','focus-visible']]){document.body.innerHTML='';document.head.innerHTML='';t('<div '+px+':bgred></div>');const c=document.querySelector('style[data-t]')?.textContent||'';if(!c.includes(':'+ps+'{background:red!important}')){console.log('X '+px);f++}}
for(const[px,ps]of[['h','hover'],['a','active'],['f','focus'],['d','disabled'],['ch','checked'],['v','visited'],['ln','link']]){document.body.innerHTML='';document.head.innerHTML='';t('<div><span '+px+'1:bgred></span></div>');const c=document.querySelector('style[data-t]')?.textContent||'';if(!c.includes(':'+ps+' .')){console.log('X '+px+'1');f++}}
document.body.innerHTML='';document.head.innerHTML='';t('<div md:h:bgred></div>');if(!(document.querySelector('style[data-t]')?.textContent||'').includes('@media(min-width:768px){')){console.log('X media');f++}
document.body.innerHTML='';document.head.innerHTML='';const{myRef}=t('<div p10 ref=myRef>Hello</div>');if(myRef?.getAttribute('style')!=='padding:10px'){console.log('X ref');f++}
document.body.innerHTML='';const el=document.createElement('div');document.body.appendChild(el);el.ih='<div bgteal p15>test</div>';if(el.querySelector('div')?.getAttribute('style')!=='background:teal;padding:15px'){console.log('X ih');f++}
document.body.innerHTML='';const parent=document.createElement('div');document.body.appendChild(parent);const{pr}=t(parent,'<span bgblue p20 ref=pr>child</span>');if(pr?.getAttribute('style')!=='background:blue;padding:20px'){console.log('X parent');f++};if(!parent.contains(pr)){console.log('X not in parent');f++}
document.body.innerHTML='';const pbox=document.createElement('div');document.body.appendChild(pbox);const{a,b}=t(pbox,'<div bgred p10 ref=a><span bggreen p5 ref=b>nested</span></div>');if(a?.getAttribute('style')!=='background:red;padding:10px'){console.log('X na');f++};if(b?.getAttribute('style')!=='background:green;padding:5px'){console.log('X nb');f++}
// pos
document.body.innerHTML='<div id=box>BOX</div>';const box=document.getElementById('box');const{s1}=t(box,'<span bgred ref=s1>A</span>',1);if(box.previousElementSibling!==s1){console.log('X pos1');f++}
document.body.innerHTML='<div id=box>BOX</div>';const box2=document.getElementById('box');const{s2}=t(box2,'<span bgblue ref=s2>B</span>',2);if(box2.firstElementChild!==s2){console.log('X pos2');f++}
document.body.innerHTML='<div id=box>BOX</div>';const box3=document.getElementById('box');const{s3}=t(box3,'<span bggreen ref=s3>C</span>',3);if(box3.lastElementChild!==s3){console.log('X pos3');f++}
document.body.innerHTML='<div id=box>BOX</div>';const box4=document.getElementById('box');const{s4}=t(box4,'<span clwhite ref=s4>D</span>',4);if(box4.nextElementSibling!==s4){console.log('X pos4');f++}
console.log(f?f+' FAILED':'ALL PASSED');
