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
						<p>
							<Link class={style.setLink} href={`/sets/${index}`}>{ set.name } <span>CONTINUE</span></Link>
							<Progress currentSet={ set} />
						</p>			
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
				<div class={style.progressSpace}>
					{ this.showChosenSets(data) }
				</div>
				<Link href="/sets">
					<button class={[style.button, style.buttonPrimary].join(' ')}>
						Start learning
					</button>
				</Link>
				<p class={style.texts}>
					<h3>Offline</h3>
					On recent phones the app will be  available offline. 
					So you can learn on your way to school or work. 
					add the app to your home screen to start learning.
				</p>
				<p class={style.texts}>
					<h3>Install the app</h3>
					You can add the app to your home screen.
				</p>
				<p class={style.texts}>
				<h3>Future plans</h3>
					This app is work in progress. Future features include making your own
					sets and learning with spaced repetition.
				</p>
				<p class={style.texts}>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
				<p class={style.texts}>If you want to reset everything and update the sample data tap on the button below.</p>
				<button 
					class={[style.button, style.resetButton].join(' ')} 
					onClick={ handleResetAllDataClick }>
					Reset all data
				</button>
			</div>
		)
	}
}
