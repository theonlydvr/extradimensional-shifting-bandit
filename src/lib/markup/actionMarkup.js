const actionTrial = (red) => {
  if (red) {
    return `<div class="beads_container"><div class="circle" style="background-color: red"></div><div class="circle" style="background-color: green"></div></div>`
  } else {
    return `<div class="beads_container"><div class="circle" style="background-color: green"></div><div class="circle" style="background-color: red"></div></div>`
  }
}

const tooSlow = (stimulus) => {
  return `<div class="beads_container"><h1 class="too_slow">${stimulus}</h1></div>`
}

export {
  actionTrial,
  tooSlow
}
