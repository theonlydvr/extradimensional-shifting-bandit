import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'

const screenOne = baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.welcome}</h3>
    <div class='instructions_container'><div class="circle c1"></div><div class="circle c2"></div></div>
    <h3>${lang.instructions.throughout}</h3>
    </div>
    `, true)

const screenTwo = baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen2}</h3>
    </div>
    `, true)

const screenThree = baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen3}</h3>
    </div>
    `, true)

const screenFour = baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen4}</h3>
    </div>
    `, true)

const screenFive =  baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen5}</h3><br/>
    <div id="feedback-text" style="color: green">✓</div>
    <h3>${lang.instructions.screen5_2}</h3><br/>
    <div id="feedback-text" style="color: red">✕</div>
    </div>
    `, true)

const screenSix =  baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen6}</h3><br/>
    <div id="fixation-dot" style="color: white">+</div>
    </div>
    `, true)

const screenSeven = baseStimulus(`
    <div class='instructions'>
    <h3>${lang.instructions.screen7}</h3>
    </div>
    `, true)

const instructions = () => {
  let tl = [
    screenOne,
    screenTwo,
    screenThree,
    screenFour,
    screenFive,
    screenSix,
    screenSeven
  ]

  return {
    type: 'instructions',
    pages: tl,
    show_clickable_nav: true

  }
}

export default instructions
