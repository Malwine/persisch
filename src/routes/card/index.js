import { h, Component } from 'preact';
import style from './style';
import { processAnswer, restoreState, saveProgress } from '../../lib/flashcards'
import { route } from 'preact-router'
import Box from '../../components/box'

export default class Card extends Component {

	state = {
		flipped: false,
		progressRate: 0
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
		this.state.progressRate += 1
	}
	
	handleNotKnowClick = () => {
    //Originally I substracted 1 but now I want to go with 0
		this.handleClick(0)
	}

	handleTurn = () => {
		this.setState({ flipped: true });
	}

	renderBack = (back, backDescription) => {
		return (
			<div>
				<Box headline={ back } description={ backDescription } back={ true } />
				<h3>Did you know it?</h3>
				<div class={ style.buttonWrap }>
					<button 
						class={style.button} 
						onClick={ this.handleKnownClick }>YES</button>
					<button 
						class={style.button} 
						onClick={ this.handleNotKnowClick }>NO</button>
				</div>
			</div>
		)
	}

	renderFront = (front, frontDescription) => {
		return (
			<div>
				<Box headline={ front } description={ frontDescription } />
				<h3>Think about it...</h3>
				<button 
					class={[style.button, style.turnButton].join(' ')} 
					onClick={ this.handleTurn }>
					Turn card!
				</button>
			</div>
		)
	}

	render({ data, set: setIndex, card: cardIndex  }) {
		const set = data.sets[setIndex];
		const setName = set.name;
		const flipped = this.state.flipped;
		const card = set.cards[cardIndex];

		const learningRateSum = set.cards.length * 3;
		let progressInPercent =  (this.state.progressRate / learningRateSum) * 100;
		set.progressInPercent = progressInPercent || 0
		console.log(this.state.progressRate)
		console.log(progressInPercent)
		console.log(set)

		return (
			<div class={style.spacing}>
				<h2 class={style.setName}>{setName}</h2>
				<progress max="100" value={ progressInPercent }></progress>
				{ flipped && this.renderBack(card.back, card.backDescription) }
				{ !flipped && this.renderFront(card.front, card.frontDescription)}		
			</div>
		)
	}
}
