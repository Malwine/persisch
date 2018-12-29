import { h, Component } from 'preact';
import style from './style';
import { processAnswer, restoreState, saveProgress } from '../../lib/flashcards'
import { route } from 'preact-router'

export default class Card extends Component {

	state = {
		flipped: false
	};

	componentDidMount() {
		restoreState(this.props.set, this.props.card, this.props.data)
	}

	allCards = () => {
		return this.props.data.sets[this.props.set].cards
	}
	
	currentCard = () => {
		return this.allCards()[this.props.card]
	}

	handleClick = (memoryRateChange) => {
		let nextCardIndex = processAnswer(memoryRateChange, this.currentCard(), this.allCards())
		saveProgress()
		if (nextCardIndex === undefined) {
			route(`/sets`)
		} else {
			route(`/sets/${this.props.set}/cards/${nextCardIndex}`)
		}
		this.setState({ flipped: false });
	}

	handleKnownClick = () => {
		this.handleClick(1)
	}
	
	handleNotKnowClick = () => {
		this.handleClick(-1)
	}

	handleTurn = () => {
		this.setState({ flipped: true });
	}

	render({ data, set: setIndex, card: cardIndex  }) {
		const flipped = this.state.flipped;
		const front = data.sets[setIndex].cards[cardIndex].front
		const back = data.sets[setIndex].cards[cardIndex].back

		if (flipped) {
			return (
				<div class={style.profile}>
	
					<h1>{ back }</h1>
					<p>{ front }</p>
	
					<p>Did you know it?</p>
					<button onClick={ this.handleKnownClick }>YES</button>
					<button onClick={ this.handleNotKnowClick }>No</button>
				</div>
			)
		} else {
			return (
				<div class={style.profile}>
					<h1>{ front }</h1>
					<button onClick={ this.handleTurn }>Turn card!</button>
				</div>
			)
		}
	}
}
