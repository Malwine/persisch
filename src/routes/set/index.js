import { h, Component } from 'preact';
import style from './style';
import { start } from '../../lib/flashcards'
import { route } from 'preact-router'

export default class Set extends Component {

	handleStartClick = () => {
		console.log("start was clicked")
		let cardIndex = start(this.props.data, this.props.set)
		route(`/sets/${this.props.set}/cards/${cardIndex}`)
	}

	render({ data, set: setIndex }) {
		return (
			<div class={style.profile}>
				<h3>{data.sets[setIndex].name}</h3>
				<button onClick={ this.handleStartClick }>Start</button>
			</div>
		);
	}
}
