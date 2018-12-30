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
			<div class={style.spacing}>
				<h3>{data.sets[setIndex].name}</h3>
				<p class={style.subline}>{data.sets[setIndex].description}</p>
				<button class={style.button} onClick={ this.handleStartClick }>Start</button>
			</div>
		);
	}
}
