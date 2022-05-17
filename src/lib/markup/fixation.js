export const fixationHTML = (color) => {
  if (color) {
    return '<div class="center_container"><div id="fixation-dot" style="color: green">+</div></div>'
  } else {
    return '<div class="center_container"><div id="fixation-dot" style="color: white">+</div></div>'
  }
}
