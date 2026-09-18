import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div>
    <h1 ref=r1>Hello world</h1>
    <i>wow</i>
  </div>
  `)

const {r2} = t(`
  <div>
    <h1>Hello world</h1>
    <i ref=r2>wow</i>
  </div>
  `)


  r1.innerHTML = 'r1 changed';
  r2.innerText = 'r2 changed';