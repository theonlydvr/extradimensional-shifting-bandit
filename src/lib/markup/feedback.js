export const feedbackHTML = (correct) => {
  if (correct) {
    return '<div class="center_container"><div id="feedback-text" style="color: green">✓</div></div>'
  } else {
    return '<div class="center_container"><div id="feedback-text" style="color: red">✕</div></div>'
  }
}
