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

  t(`
    <div a:bgred a h48 w48 c fs40 ba1 b100 h:ba5 tn300 h:ts2  bc#00aaaa bcrtransparent bglinear-gradient(red,blue)>=</div>
    `)

// Pseudo-class tests
t(`
  <div bggray p30 mb20>
    <h2 cwhite mb15>Pseudo-Class Tests</h2>

    <div a:bgred h:bgblue fw:bgteal p20 mb10 cwhite tac tn300>
      a:hover=red h:hover=blue fw:hover=teal — hover/click/focus-within
    </div>

    <div f:clred d:opacity50 ch:bggreen v:clblue ln:clpurple p20 mb10 bgwhite tac tn300>
      f:focus=red d:disabled=50% ch:checked=green v:visited=blue ln:link=purple
    </div>

    <button fv:bgyellow f:bgorange a:bgred p20 mb10 tac tn300 bgwhite>
      fv:yellow f:orange a:red — focus-visible/focus/active
    </button>

    <div>
      <span a1:bgred a1:p20 a1:cwhite a1:tn300>Click parent → red bg</span>
      <div a1:bgblue a1:p20 a1:cwhite a1:tn300>Click parent → blue bg</div>
    </div>

    <div f1:clred f1:fs20 f1:tn300>
      Focus this input → parent text turns red
      <input p10 mt10 />
    </div>
  </div>
  `)