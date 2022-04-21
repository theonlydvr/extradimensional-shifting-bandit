import { eventCodes } from '../config/main'
import { jitter50 } from '../lib/utils'
import { pdSpotEncode, photodiodeGhostBox } from '../lib/markup/photodiode'
import { feedbackHTML } from '../lib/markup/feedback'
import { jsPsych } from 'jspsych-react'
import $ from 'jquery'

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
      trial.stimulus = feedbackHTML(preData.rewarded) + photodiodeGhostBox()
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
