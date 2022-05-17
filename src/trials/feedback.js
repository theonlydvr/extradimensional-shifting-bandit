import { eventCodes, lang } from '../config/main'
import { pdSpotEncode, photodiodeGhostBox } from '../lib/markup/photodiode'
import { feedbackHTML } from '../lib/markup/feedback'
import { jsPsych } from 'jspsych-react'
import { tooSlow } from '../lib/markup/actionMarkup'

const feedback = () => {
  let stimulus = feedbackHTML(true) + photodiodeGhostBox()

  const code = eventCodes.feedback;

  return {
    type: 'html_keyboard_response',
    choices: jsPsych.NO_KEYS,
    stimulus: stimulus,
    response_ends_trial: false,
    trial_duration: 500,
    on_start: (trial) => {
      let preData = jsPsych.data.get().values();
      preData = preData[preData.length-1]
      if (preData.key_press == null) {
        trial.stimulus = tooSlow(lang.prompt.too_slow) + photodiodeGhostBox()
        trial.trial_duration = 2000
      } else {
        trial.stimulus = feedbackHTML(preData.rewarded) + photodiodeGhostBox()
        trial.trial_duration = 750
      }
    },
    on_load: () => {
      pdSpotEncode(code)
    },
    on_finish: (data) => {
      data.code = code
    }
  }
}

export {
   feedback
}
