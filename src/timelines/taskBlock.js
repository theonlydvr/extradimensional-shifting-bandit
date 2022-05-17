import taskTrial from './taskTrial'

const taskBlock = () => {
  // initialize block
	// timeline = loop through trials
	let rules = Array.from({length: 2 }, () => ["L", "R", "C1", "C2"]).flat()
	shuffleArray(rules);
	while (checkIfDuplicateExists(rules)) {
		shuffleArray(rules);
	}

  return {
		timeline: [taskTrial(rules)],
		loop_function: function(data){
			let values = data.values();
			return !values[values.length-2].hasOwnProperty('complete')
		}
	}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkIfDuplicateExists(arr) {
	for (let i=1;i<arr.length;i++) {
		if (arr[i-1]===arr[i]) return true
	}
	return false
}

export default taskBlock
