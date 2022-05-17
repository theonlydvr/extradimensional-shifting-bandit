const actionTrial = (c1) => {
  if (c1) {
    return `<div class="beads_container"><div class="circle c1"></div><div class="circle c2" ></div></div>`
  } else {
    return `<div class="beads_container"><div class="circle c2"></div><div class="circle c1"></div></div>`
  }
}

const tooSlow = (stimulus) => {
  return `<div class="beads_container"><h1 class="too_slow">${stimulus}</h1></div>`
}

export {
  actionTrial,
  tooSlow
}
