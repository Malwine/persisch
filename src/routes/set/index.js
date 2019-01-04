import { h, Component } from 'preact';
import style from './style';
import { start } from '../../lib/flashcards'
import { route } from 'preact-router'
import { resetSet } from '../../lib/flashcards'

export default class Set extends Component {

	handleStartClick = () => {
		console.log("start was clicked")
		let cardIndex = start(this.props.data, this.props.set)
		route(`/sets/${this.props.set}/cards/${cardIndex}`)
	}

	handleResetClick = () => {
		let currentSet = this.props.data.sets[this.props.set]
		currentSet = resetSet(this.props.data.sets[this.props.set])
	}

	render({ data, set: setIndex }) {
		return (
			<div class={style.spacing}>
				<h2>{data.sets[setIndex].name}</h2>
				<p class={style.subline}>{data.sets[setIndex].description}</p>
				<button class={style.button} onClick={ this.handleStartClick }>Start</button>
        
        <p>Included words:</p>
        <ul class={style.list}>	
				{ data.sets[setIndex].cards.map((card, index) => {
					return (
            <li class={ style.cardWrap }>
              <div>{ card.front }</div>
              <div class={ style.left }>{ card.back }</div>
            </li>
					)
				})}
				</ul>

				<button class={ style.resetButton } onClick={ this.handleResetClick }>Reset progress</button>
			</div>
		);
	}
}
