import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div v bggrey>
    <h1 bgteal pb15>Hello world</h1>
    <p bgblue ref=r1 ml100 p15 pl100>wow</p>
  </div>
  `)

const {r1 : r1v2} = t(`
  <div>
    <h1 bgteal p15 m15 rounded50 clyellow tac>Hello world</h1>
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