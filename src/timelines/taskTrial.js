// import trials
import { showMessage } from "@brown-ccv/behavioral-task-trials";
import { config } from "../config/main";
import { eventCodes } from "../config/main";
import { earningsDisplay } from "../lib/markup/earnings";
import { actions } from "../trials/actions"
import { fixation } from "../trials/fixation"
import { feedback } from "../trials/feedback"

const taskTrial = () => {
  // timeline
  let timeline = [
    // fixation
    fixation(2000, true, false, true),
    fixation(200, false, true, true),
    // show condition
    actions(),
    feedback()
  ];

  return {
    type: "html_keyboard_response",
    timeline: timeline,
  };
};

export default taskTrial;
