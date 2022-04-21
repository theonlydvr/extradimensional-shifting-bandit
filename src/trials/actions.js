import { eventCodes, lang, reward, no_reward } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { actionTrial, tooSlow } from '../lib/markup/actionMarkup'
import { beep } from '../lib/utils'
import { jsPsych } from 'jspsych-react'

const actions = () => {
  let red = Math.random() < 0.5;
  let stimulus = actionTrial(red) + photodiodeGhostBox()

  return {
    type: 'rt-categorize-html',
    stimulus: stimulus,
    trial_duration: 1250,
    feedback_duration: 2000,
    show_stim_with_feedback: false,
    key_answer: 70,
    timeout_message: tooSlow(lang.prompt.too_slow) + photodiodeGhostBox(),
    response_ends_trial: true,
    on_start: (trial) => {
      let preData = jsPsych.data.get().values();
      preData = preData[preData.length-4]
      let rules = ["L", "R", "Re", "Gr"]
      if (preData != null) {
        if (preData.history.filter(Boolean).length >= 14) {
          rules = rules.filter(e => e !== preData.rule)
          trial.data = {rule : rules[Math.floor(Math.random() * rules.length)]}
        } else trial.data = {rule : preData.rule}
      } else trial.data = {rule : rules[Math.floor(Math.random() * rules.length)]}
      red = Math.random() < 0.5;
      trial.stimulus = actionTrial(red) + photodiodeGhostBox()
      switch (trial.data.rule) {
        case "L":
          trial.key_answer = 70
          break;
        case "R":
          trial.key_answer = 74
          break;
        case "Re":
          if (red) trial.key_answer = 70
          else trial.key_answer = 74
          break;
        case "Gr":
          if (!red) trial.key_answer = 70
          else trial.key_answer = 74
          break;
      }
    },
    on_load: () => {
      pdSpotEncode(eventCodes.open_task)
    },
    on_finish: (data) => {
      let preData = jsPsych.data.get().values();
      preData = preData[preData.length-5]
      if (preData == null || !preData.hasOwnProperty('trialNum')) {
        data.trialNum=1;
        data.history=new Array(20).fill(false)
        data.history[0]=data.correct
        data.switchCount=0
      } else {
        data.trialNum=preData.trialNum+1
        if (data.rule == preData.rule) {
          data.history=preData.history
          data.switchCount=preData.switchCount
        }
        else {
          data.history = new Array(20).fill(false)
          console.log(preData.rule)
          data.switchCount=preData.switchCount+1
        }
        data.history.pop()
        data.history.unshift(data.correct)
      }
      if (data.key_press !== null) {
        let audio;
        if ((data.correct && Math.random() < 0.8) || (!data.correct && Math.random() < 0.2)) {
             audio = new Audio('/sounds/reward.mp3');
             data.rewarded = true
        } else {
             audio = new Audio('/sounds/no-reward.mp3');
             data.rewarded = false
        }
        audio.play();
      } else {
        data.rewarded = false
      }
    }
  }
}

export {
  actions
}
