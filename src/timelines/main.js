import preamble from "./preamble";
import taskBlock from "./taskBlock";
import { countdown } from "@brown-ccv/behavioral-task-trials";
import { cameraStart, cameraEnd } from "../trials/camera"
import { lang, config } from "../config/main";
import { tutorialBlock } from "../config/tutorial";
import { exptBlock2 } from "../config/experiment";
import { showMessage } from "@brown-ccv/behavioral-task-trials";
import instructions from "../trials/instructions";

let primaryTimeline = [
  instructions(),
  taskBlock()
];

if (config.USE_CAMERA) {
  primaryTimeline.splice(1,0,cameraStart())
  primaryTimeline.push(cameraEnd(5000))
}

primaryTimeline.push(showMessage(config, {
  duration: 5000,
  message: lang.task.end,
}))

const mturkTimeline = [
  preamble,
  countdown({ message: lang.countdown.message1 }),
  taskBlock(tutorialBlock),
  countdown({ message: lang.countdown.message2 }),
  taskBlock(exptBlock2),
  showMessage(config, {
    duration: 5000,
    message: lang.task.end,
  }),
];

export const tl = config.USE_MTURK ? mturkTimeline : primaryTimeline;
