import { eventCodes} from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { actionTrial } from '../lib/markup/actionMarkup'
import { jsPsych } from 'jspsych-react'

const actions = (rules) => {
  let c1 = Math.random() < 0.5;
  let stimulus = actionTrial(c1) + photodiodeGhostBox()

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    trial_duration: 1250,
    response_ends_trial: true,
    on_start: (trial) => {
      let allData = jsPsych.data.get().values();
      let preData = allData[allData.length-4]
      if (preData != null) {
        if (preData.history.filter(Boolean).length >= 16) {
          trial.data = {rule : rules[preData.switchCount+1]}
        } else trial.data = {rule : preData.rule}
      } else trial.data = {rule : rules[0]}
      let stimSeq = [2,3,4];
      if (preData != null) stimSeq[2]=preData.c1Side
      if (allData[allData.length-8] != null) stimSeq[1]=allData[allData.length-8].c1Side
      if (allData[allData.length-12] != null) stimSeq[0]=allData[allData.length-12].c1Side
      if (stimSeq.every( (val, i, arr) => val === arr[0] )) c1 = !stimSeq[0]
      else c1 = Math.random() < 0.5;
      trial.stimulus = actionTrial(c1) + photodiodeGhostBox()
      switch (trial.data.rule) {
        case "L":
          trial.data.key_answer = 70
          break;
        case "R":
          trial.data.key_answer = 74
          break;
        case "C1":
          if (c1) trial.data.key_answer = 70
          else trial.data.key_answer = 74
          break;
        default:
          if (!c1) trial.data.key_answer = 70
          else trial.data.key_answer = 74
          break;
      }
    },
    on_load: () => {
      pdSpotEncode(eventCodes.open_task)
    },
    on_finish: (data) => {
      let preData = jsPsych.data.get().values();
      preData = preData[preData.length-5]
      data.correct=data.key_press===data.key_answer
      data.left=data.key_press===70
      data.c1Choice=(data.key_press===70 && c1) || (data.key_press===74 && !c1)
      data.c1Side=c1
      if (preData == null || !preData.hasOwnProperty('trialNum')) {
        data.trialNum=1;
        data.history=new Array(20).fill(false)
        data.history[0]=data.correct
        data.switchCount=0
      } else {
        data.trialNum=preData.trialNum+1
        if (data.rule === preData.rule) {
          data.history=preData.history
          data.switchCount=preData.switchCount
        }
        else {
          data.history = new Array(20).fill(false)
          data.switchCount=preData.switchCount+1
        }
        data.history.pop()
        data.history.unshift(data.correct)
        if (preData.switchCount+1===rules.length&&data.history.filter(Boolean).length >= 16) data.complete = true
      }
      if (data.key_press != null) {
        if ((data.correct && Math.random() < 0.8) || (!data.correct && Math.random() < 0.2)) {
             data.rewarded = true
        } else {
             data.rewarded = false
        }
      } else {
        data.rewarded = false
      }
    }
  }
}

export {
  actions
}
