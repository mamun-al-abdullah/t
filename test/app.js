import { t } from "../dist/index.mjs";

const {r1} = t(`
  <div bggray p50>
  <div v md:h bggrey tn300>
    <h1 bgteal pb15 tn300 h1:ty100>Hello world</h1>
    <p bgred lg:h2:tx100 ref=r1 p15 pl100 tn500 md:bgcyan md:h:bgyellow lg:h:tx300 lg:tx200>wow</p>
  </div>
  </div>
  `)

const {r2} = t(`
  <div>
    <h1 tn3000 bgteal h:bgred h:tx100 p15 mb15 rounded50 clyellow tac>Hello world</h1>
    <p ref=r2 bgblue p15 tn500>r2</p>
  </div>
  `)


  r1.onclick = ()=>{
    r2.att('tx100', 'bgteal')
  }

  r2.onclick = ()=>{
      r2.atr('tx100')

  }

  t(`
    <div a a:bgyellow h48 w48 c fs40 ba1 b100 h:ba5 tn300 h:ts2  bc#00aaaa bcrtransparent bglinear-gradient(red,blue)>=</div>
    `)

t(r2, `
    <div p15 m15 bgpurple fs40>new ${Math.random()}</div>
    `)