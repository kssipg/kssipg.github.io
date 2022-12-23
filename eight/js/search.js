import {Agenda} from "./agenda.js"
import {Explored} from "./explored.js"
import {Node} from "./node.js"

let n_nodes = 0

export function search(initialState, goalTest, actions, successor, print = true)
{
	n_nodes = 0
	const agenda = new Agenda()
	const explored = new Explored()
	const initialNode = new Node(null, initialState, null)
	agenda.add(initialNode)
	while(agenda.notEmpty())
	{
		const parent = agenda.getNode()
		if(goalTest(parent.state))
		{
			n_nodes++
			console.log(n_nodes)
			if(print)
				console.log("Solution:", parent.strPath())
			return parent.path()
		}
		else
		{
			n_nodes++
			if(print)
				console.log(parent.strPath())
		}

		explored.add(parent.state)
		for(const action of actions(parent.state))
		{
			const newS = successor(parent.state, action)
			const newN = new Node(action, newS, parent)
			if(!explored.hasState(newS))
			{
				agenda.add(newN)
				if(print)
					console.log(newN.strPath())
			}
		}
	}
	return null
}
