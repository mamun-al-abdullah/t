# @idlapps/t

Parse HTML strings into DOM elements with shorthand CSS utilities.

## Install

```bash
npm install @idlapps/t
# or
pnpm add @idlapps/t
```

## Usage

```ts
import { t } from "@idlapps/t";

// Append to body
const { el, refs } = t("<div p10 bgred ref=box>Hello</div>");

// Append to specific parent
const box = document.getElementById("app");
const { input } = t(box, '<input bgwhite p10 ref=input>');

// Position (insertAdjacentHTML): 1=beforebegin, 2=afterbegin, 3=beforeend, 4=afterend
t(box, '<div>prepended</div>', 2);  // prepend
t(box, '<div>appended</div>', 3);   // append (default)
t(box, '<div>before</div>', 1);     // before parent
t(box, '<div>after</div>', 4);      // after parent

// Prototype shorthands
box.ih = '<div bgred>auto-styled</div>';
box.it = 'plain text';
box.tc = 'plain text';
```

## How it works

`t()` parses an HTML string, extracts `ref` attributes as refs, converts shorthand CSS attribute names into inline styles, and returns the DOM fragment. Pass a parent element as the first argument to append there instead of body. Optional 3rd argument for positioning: `1`=beforebegin, `2`=afterbegin, `3`=beforeend (default), `4`=afterend.

## Shorthand CSS

### Margin

| Shorthand | CSS                                  |
| --------- | ------------------------------------ |
| `m10`     | `margin:10px`                        |
| `m-15`    | `margin:-15px`                       |
| `ml10`    | `margin-left:10px`                   |
| `mr10`    | `margin-right:10px`                  |
| `mt10`    | `margin-top:10px`                    |
| `mb10`    | `margin-bottom:10px`                 |
| `mx10`    | `margin-left:10px;margin-right:10px` |
| `my10`    | `margin-top:10px;margin-bottom:10px` |
| `mx20p`   | `margin-left:20%;margin-right:20%`   |

### Padding

| Shorthand | CSS                                    |
| --------- | -------------------------------------- |
| `p10`     | `padding:10px`                         |
| `pl10`    | `padding-left:10px`                    |
| `pr10`    | `padding-right:10px`                   |
| `pt10`    | `padding-top:10px`                     |
| `pb10`    | `padding-bottom:10px`                  |
| `px10`    | `padding-left:10px;padding-right:10px` |
| `py10`    | `padding-top:10px;padding-bottom:10px` |

### Width / Height

| Shorthand | CSS                |
| --------- | ------------------ |
| `w100`    | `width:100px`      |
| `h100`    | `height:100px`     |
| `w50p`    | `width:50%`        |
| `w-50p`   | `width:-50%`       |
| `minw100` | `min-width:100px`  |
| `maxw200` | `max-width:200px`  |
| `minh100` | `min-height:100px` |
| `maxh200` | `max-height:200px` |

### Colors

| Shorthand | CSS                     |
| --------- | ----------------------- |
| `bgred`   | `background:red`        |
| `bgteal`  | `background:teal`       |
| `clwhite` | `color:white`           |
| `clblack` | `color:black`           |
| `bgtransparent` | `background:transparent` |
| `cltransparent` | `color:transparent` |
| `bctransparent` | `border-color:transparent` |
| `bg#ff0000` | `background:#ff0000`  |
| `cl#ffffff` | `color:#ffffff`        |
| `bgrgba(255,0,0,0.5)` | `background:rgba(255,0,0,0.5)` |
| `clhsl(120,100%,50%)` | `color:hsl(120,100%,50%)` |
| `bglinear-gradient(red,blue)` | `background:linear-gradient(red,blue)` |
| `bgradial-gradient(red,blue)` | `background:radial-gradient(red,blue)` |
| `bgconic-gradient(red,blue)` | `background:conic-gradient(red,blue)` |

> Use `135deg` instead of `to right` in gradients — HTML splits on spaces.

### Typography

| Shorthand  | CSS                  |
| ---------- | -------------------- |
| `fs14`     | `font-size:14px`     |
| `fwbold`   | `font-weight:bold`   |
| `lh15`     | `line-height:15px`   |
| `ls1`      | `letter-spacing:1px` |
| `tac`     | `text-align:center`  |

### Position

| Shorthand        | CSS                 |
| ---------------- | ------------------- |
| `a` / `absolute` | `position:absolute` |
| `r` / `relative` | `position:relative` |
| `f` / `fixed`    | `position:fixed`    |
| `sticky`         | `position:sticky`   |
| `l20`     | `left:20px` |
| `l-20`    | `left:-20px` |
| `r20`     | `right:20px` |
| `t20`     | `top:20px` |
| `b20`     | `bottom:20px` |
| `b-10`    | `bottom:-10px` |
| `l5p`     | `left:5%` |

### Flex

| Shorthand       | CSS                                                      |
| --------------- | -------------------------------------------------------- |
| `flex`          | `display:flex`                                           |
| `c`             | `display:flex;justify-content:center;align-items:center` |
| `h`             | `display:flex;flex-direction:row`                        |
| `v`             | `display:flex;flex-direction:column`                     |
| `gap10`         | `gap:10px`                                               |
| `justifycenter` | `justify-content:center`                                 |
| `itemscenter`   | `align-items:center`                                     |

### Text Align

| Shorthand | CSS                 |
| --------- | ------------------- |
| `tac`     | `text-align:center` |
| `tar`     | `text-align:right`  |
| `tal`     | `text-align:left`   |

### Border

| Shorthand  | CSS                      |
| ---------- | ------------------------ |
| `ba`       | `border`                 |
| `ba2`      | `border:2px solid`       |
| `bt1`      | `border-top:1px solid`   |
| `br1`      | `border-right:1px solid` |
| `bb1`      | `border-bottom:1px solid`|
| `bl1`      | `border-left:1px solid`  |
| `bcred`    | `border-color:red`       |
| `bctred`   | `border-top-color:red`   |
| `bcrblue`  | `border-right-color:blue`|
| `bcbgreen` | `border-bottom-color:green`|
| `bclwhite` | `border-left-color:white`|
| `rounded8` | `border-radius:8px`      |
| `shadowsm` | `box-shadow:sm`          |

### Other

| Shorthand        | CSS                |
| ---------------- | ------------------ |
| `z10`            | `z-index:10`       |
| `overflowhidden` | `overflow:hidden`  |
| `tn500`          | `transition:500ms` |

### Transform

| Shorthand | CSS                           |
| --------- | ----------------------------- |
| `tx10`    | `transform:translateX(10px)`  |
| `ty20`    | `transform:translateY(20px)`  |
| `tr45`    | `transform:rotate(45deg)`     |
| `tr-90`   | `transform:rotate(-90deg)`    |
| `ts2`     | `transform:scale(2)`          |
| `ts05`    | `transform:scale(05)`         |
| `tx50p`   | `transform:translateX(50%)`   |
| `tx-50p`  | `transform:translateX(-50%)`  |
| `ty-20`   | `transform:translateY(-20px)` |

### Negative values

Prefix any numeric value with `-`:

```
m-15     → margin:-15px
ml-10    → margin-left:-10px
tx-50p   → transform:translateX(-50%)
```

### Percent values

Suffix with `p`:

```
mx20p    → margin-left:20%;margin-right:20%
w50p     → width:50%
```

## Hover (`h:`)

Apply styles on hover:

```html
<div h:bgred h:p15>Hover me</div>
```

```css
._t0:hover {
  background: red !important;
  padding: 15px !important;
}
```

## Pseudo-Classes (`h:`, `a:`, `f:`, `d:`, ...)

| Prefix | CSS | Description |
|--------|-----|-------------|
| `h:` | `:hover` | Hover state |
| `a:` | `:active` | Click/press state |
| `f:` | `:focus` | Focus state |
| `fw:` | `:focus-within` | Focus within container |
| `fv:` | `:focus-visible` | Keyboard focus indicator |
| `d:` | `:disabled` | Disabled state |
| `ch:` | `:checked` | Checkbox/radio checked |
| `v:` | `:visited` | Visited link |
| `ln:` | `:link` | Unvisited link |

```html
<div a:bgred f:clwhite d:opacity50>Click me</div>
```

```css
._t0:active { background: red !important; }
._t1:focus { color: white !important; }
._t2:disabled { opacity: 50 !important; }
```

## Ancestor Pseudo-Classes (`h1:`, `a2:`, `f3:`, ...)

Style a child when an ancestor is in a pseudo-state. The number indicates how many levels up:

```html
<div>
  <span a1:p30>Click parent to pad me</span>
</div>
```

```css
._t0:active ._t1 {
  padding: 30px !important;
}
```

- `h1:` / `a1:` / `f1:` — immediate parent
- `h2:` / `a2:` / `f2:` — grandparent
- `h3:` / `f3:` — great-grandparent
- `hN:` — Nth ancestor

## Responsive (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

Media query breakpoints wrapped in `@media(min-width:...)`:

| Prefix | Breakpoint |
| ------ | ---------- |
| `sm:`  | 640px      |
| `md:`  | 768px      |
| `lg:`  | 1024px     |
| `xl:`  | 1280px     |
| `2xl:` | 1536px     |

```html
<div md:p20 lg:bgred>Responsive</div>
```

```css
@media (min-width: 768px) {
  ._t0 {
    padding: 20px !important;
  }
}
@media (min-width: 1024px) {
  ._t1 {
    background-color: red !important;
  }
}
```

## Combining hover + responsive + ancestor

All prefixes stack:

```
md:h:bgred       → @media(≥768px) hover → background-color:red
md:h1:p30        → @media(≥768px) parent hover → padding:30px
lg:h2:clwhite    → @media(≥1024px) grandparent hover → color:white
```

## Refs

Extract elements by `ref` attribute:

```ts
const { input, btn } = t("<input ref=input><button ref=btn>OK</button>");
input.placeholder = "Type...";
btn.onclick = () => alert(input.value);
```

## Prototype Shorthands (`ih`, `it`, `tc`)

| Property | Alias for | Auto-style |
|----------|-----------|------------|
| `el.ih` | `innerHTML` | Yes |
| `el.it` | `innerText` | No |
| `el.tc` | `textContent` | No |

```js
box.ih = '<div bgred p15>hello</div>';
// → auto-applies styles

box.it = 'plain text';  // no HTML parse
box.tc = 'plain text';  // no HTML parse
```

## Attribute Methods (`ata`, `atr`, `att`, `atg`, `ath`)

| Method | Description | Returns |
|--------|-------------|---------|
| `el.ata(...attrs)` | Add/set attribute(s) + auto-style | `this` |
| `el.atr(...attrs)` | Remove attribute(s) | `this` |
| `el.att(...attrs)` | Toggle attribute(s) | `this` |
| `el.atg(attr)` | Get attribute value | `string \| null` |
| `el.ath(attr)` | Has attribute | `boolean` |

```js
el.ata('bgteal', 'p10');     // set + auto-style
el.ata('h:bgred');           // pseudo-class → generates CSS rule
el.atr('bgteal');            // remove single
el.atr('bgteal', 'p10');    // remove multiple
el.att('bgblue');            // toggle on/off
el.att('bgred', 'p20');     // toggle multiple
el.atg('data-id');           // get value
el.ath('bgteal');            // check if exists
```

Chaining:
```js
el.ata('bgred').ata('p15').atr('bgred');
```

## License

MIT
