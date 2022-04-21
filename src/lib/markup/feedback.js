export const feedbackHTML = (correct) => {
  if (correct) {
    return '<div class="center_container"><div id="feedback-text">◯</div></div>'
  } else {
    return '<div class="center_container"><div id="feedback-text">✕</div></div>'
  }
}
