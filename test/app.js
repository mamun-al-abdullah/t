import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div>
    <h1 ref=r1>Hello world</h1>
    <i>wow</i>
  </div>
  `)

const {r2} = t(`
  <div>
    <h1 p15 m20p>Hello world</h1>
    <i ref=r2 pb8 mx30>wow</i>
  </div>
  `)


  r1.onclick = ()=>{
    r2.innerHTML = `
    <div>new ${Math.random()}</div>
    `
  }