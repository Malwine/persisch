import { h, Component } from 'preact';
import style from './style';
import { processAnswer, restoreState, saveProgress } from '../../lib/flashcards'
import { route } from 'preact-router'

export default class Card extends Component {

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
	}

	handleKnownClick = () => {
		this.handleClick(1)
	}
	
	handleNotKnowClick = () => {
		this.handleClick(-1)
	}

	render({ data, set: setIndex, card: cardIndex  }) {
		return (
			<div class={style.profile}>

				<h1>{data.sets[setIndex].cards[cardIndex].front}</h1>
				<p>{data.sets[setIndex].cards[cardIndex].back}</p>

				<p>Did you know it?</p>
				<button onClick={ this.handleKnownClick }>YES</button>
				<button onClick={ this.handleNotKnowClick }>No</button>
			</div>
		);
	}
}
