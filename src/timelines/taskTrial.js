import { actions } from "../trials/actions"
import { fixation } from "../trials/fixation"
import { feedback } from "../trials/feedback"

const taskTrial = (rules) => {
  // timeline
  let timeline = [
    // fixation
    fixation(2000, true, false, true),
    fixation(200, false, true, true),
    // show condition
    actions(rules),
    feedback()
  ];

  return {
    type: "html_keyboard_response",
    timeline: timeline,
  };
};

export default taskTrial;
