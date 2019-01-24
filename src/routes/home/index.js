import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { getProgressForSet } from '../../lib/flashcards'
import Progress from '../../components/progress'

export default class Home extends Component  {

	showChosenSets = (data) => {
		const learningStarted = !!data.sets.find(set => set.progressRate > 0)

		if (learningStarted) {
			return data.sets
				.filter(set => set.progressRate > 0)
				.map((set, index) => {
					return (
						<div>
							<Link class={style.setLink} 
										href={`/sets/${index}`}>{ set.name }</Link>
							<Progress currentSet={ set} />
						</div>			
					)
				})
		} else {
			return (
				<Link class={style.chooseSetHint} href="/sets">Choose a set!</Link>
			)
		}
	}
	
	render ({ handleResetAllDataClick, data }) {
		return (
			<div class={style.home}>
				<h2 class={style.headline}>Welcome :)</h2>
				<p class={style.texts}>
					Flashcards is a web app that helps you practice 
					your vocabulary wherever you go.
				</p>
				<h3>Your sets</h3>
				<div class={style.progressSpace}>
					{ this.showChosenSets(data) }
				</div>
				<Link href="/sets">
					<button class={[style.button, style.buttonPrimary].join(' ')}>
						All sets
					</button>
				</Link>
			</div>
		)
	}
}
