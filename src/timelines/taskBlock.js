import taskTrial from './taskTrial'
import { generateStartingOpts } from '../lib/taskUtils'

const taskBlock = () => {
  // initialize block
	// timeline = loop through trials
	let seq = Array.from({length: 100}, () => Math.random() < 0.5)
	let timeline = seq.map( (red) => taskTrial(red))

  return {
		timeline: [taskTrial()],
		loop_function: function(data){
			return data.values()[2].switchCount < 8
		}
	}
}

export default taskBlock
