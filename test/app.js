import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div bggray p50>
  <div v md:h bggrey tn300>
    <h1 bgteal pb15 tn300 h1:ty100>Hello world</h1>
    <p bgred lg:h2:tx100 ref=r1 p15 pl100 tn500 md:bgcyan md:h:bgyellow lg:h:tx300 lg:tx200>wow</p>
  </div>
  </div>
  `)

const {r1 : r1v2} = t(`
  <div>
    <h1 tn3000 bgteal h:bgred h:tx100 p15 mb15 rounded50 clyellow tac>Hello world</h1>
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