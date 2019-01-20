import { h, Component } from 'preact';
import style from './style';
import { processAnswer, restoreState, saveProgress, getProgressForSet } from '../../lib/flashcards'
import { route } from 'preact-router'
import Box from '../../components/box'

export default class Card extends Component {

	state = {
		flipped: false,
		solutionSeen: false
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

	currentSet = () => {
		return this.props.data.sets[this.props.set]
	}

	handleClick = (memoryRateChange) => {
		let nextCardIndex = processAnswer(memoryRateChange, this.currentCard(), this.currentSet())
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
		this.setState({ solutionSeen: false });
	}
	
	handleNotKnowClick = () => {
    //Originally I substracted 1 but now I want to go with 0
		this.handleClick(0)
		this.setState({ solutionSeen: false });
	}

	handleTurn = () => {
		const { flipped } = this.state;
		this.setState({ 
			flipped: !flipped,
			solutionSeen: true });
	}

	renderBack = (back, backDescription) => {
		return (
			<div>
				<Box headline={ back } 
					description={ backDescription } 
					back={ true }
					handleClick={ this.handleTurn } />
			</div>
		)
	}

	renderFront = (front, frontDescription) => {
		const solutionSeen = this.state.solutionSeen;
		
		return (
			<div>
				<Box headline={ front } description={ frontDescription } handleClick={ this.handleTurn }/>
				{!solutionSeen && <p class={style.hint}>Think about it and tap on the card to flip it.</p>}
			</div>
		)
	}

	renderButtons = () => {
		return (
			<div>
				<h3>Did you know it?</h3>
				<div>
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

	render({ data, set: setIndex, card: cardIndex  }) {
		const set = data.sets[setIndex];
		const setName = set.name;
		const flipped = this.state.flipped;
		const card = set.cards[cardIndex];
		const solutionSeen = this.state.solutionSeen;
		
		return (
			<div class={style.spacing}>
				<h2 class={style.setName}>{setName}</h2>
				<progress max="100" value={ getProgressForSet(this.currentSet()) }></progress>
				{ flipped && this.renderBack(card.back, card.backDescription) }
				{ !flipped && this.renderFront(card.front, card.frontDescription)}	
				{ solutionSeen && this.renderButtons() }
			</div>
		)
	}
}
