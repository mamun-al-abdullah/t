import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div mb50>
    <h1>Hello world</h1>
    <i ref=r1>wow</i>
  </div>
  `)

const {r1 : r1v2} = t(`
  <div>
    <h1 bgteal p15 m15 rounded50 textyellow>Hello world</h1>
    <i ref=r1>wow</i>
  </div>
  `)


  r1.onclick = ()=>{
    r1v2.innerHTML = `
    <div>new ${Math.random()}</div>
    `
  }
  r1v2.onclick = ()=>{
    r1.innerHTML = `
    <div>new ${Math.random()}</div>
    `
  }