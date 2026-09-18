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

const { el, refs } = t("<div p10 bgred ref=box>Hello</div>");
document.body.appendChild(el);
refs.box.style.color; // apply additional JS to refs
```

## How it works

`t()` parses an HTML string, extracts `ref` attributes as refs, converts shorthand CSS attribute names into inline styles, and returns the DOM fragment.

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
| `bgred`   | `background-color:red`  |
| `bgteal`  | `background-color:teal` |
| `clwhite` | `color:white`           |
| `clblack` | `color:black`           |

### Typography

| Shorthand  | CSS                  |
| ---------- | -------------------- |
| `fs14`     | `font-size:14px`     |
| `fwbold`   | `font-weight:bold`   |
| `lh15`     | `line-height:15px`   |
| `ls1`      | `letter-spacing:1px` |
| `tacenter` | `text-align:center`  |

### Position

| Shorthand        | CSS                 |
| ---------------- | ------------------- |
| `a` / `absolute` | `position:absolute` |
| `r` / `relative` | `position:relative` |
| `f` / `fixed`    | `position:fixed`    |
| `sticky`         | `position:sticky`   |
| `l20`            | `left:20px`         |
| `l-20`           | `left:-20px`        |
| `r20`            | `right:20px`        |
| `t20`            | `top:20px`          |
| `l5p`            | `left:5%`           |

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

| Shorthand  | CSS                 |
| ---------- | ------------------- |
| `b`        | `border`            |
| `b1`       | `border:1px`        |
| `bt1`      | `border-top:1px`    |
| `br1`      | `border-right:1px`  |
| `bb1`      | `border-bottom:1px` |
| `bl1`      | `border-left:1px`   |
| `rounded8` | `border-radius:8px` |
| `shadowsm` | `box-shadow:sm`     |

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
  background-color: red !important;
  padding: 15px !important;
}
```

## Ancestor Hover (`h1:`, `h2:`, ...)

Hover a parent to style a child. The number indicates how many levels up:

```html
<div>
  <span h1:p30>Hover parent to pad me</span>
</div>
```

```css
._t0:hover ._t1 {
  padding: 30px !important;
}
```

- `h1:` — hover immediate parent
- `h2:` — hover grandparent
- `h3:` — hover great-grandparent
- `hN:` — hover Nth ancestor

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

## License

MIT
