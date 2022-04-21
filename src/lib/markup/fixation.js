export const fixationHTML = (color) => {
  if (color) {
    return '<div class="center_container"><div id="fixation-dot" class="color-green"> </div></div>'
  } else {
    return '<div class="center_container"><div id="fixation-dot" class="color-white"> </div></div>'
  }
}
