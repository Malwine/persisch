import { h, Component } from 'preact';
import style from './style';
import Box from '../../components/box'
import { getProgressForSet } from '../../lib/flashcards'

export default class Sets extends Component {

	progressForSet = (set) => {
		const progress = getProgressForSet(set)
		if (progress === undefined || progress === 0) {
			return "0"
		} else {
			return progress
		}
	}

	render({ data }) {
		return (
			<div class={style.sets}>
				<h2>Sets</h2>
				<ul class={style.list}>	
				{ data.sets.map((set, index) => {
					return (
						<li>
							<Box link={`/sets/${index}`} headline={set.name} description={set.description} progressStatus={ this.progressForSet(set) } />
						</li>	
					)
				})}
				</ul>
			</div>
		);
	}
}
