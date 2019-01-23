import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Home = ({ handleResetAllDataClick }) => (
	<div class={style.home}>
		<h2 class={style.headline}>Welcome :)</h2>
		<p>
			Flashcards is a web app that helps you practice 
			your vocabulary wherever you go.
		</p>
		<div class={style.progressSpace}>
			<div class={style.hint}>
				<Link class={style.link} href="/sets">Choose a set!</Link>
		  </div>
		</div>
		<Link href="/sets">
			<button class={[style.button, style.buttonPrimary].join(' ')}>
				Start learning
			</button>
		</Link>
		<p>
			<h3>Offline</h3>
			On recent phones the app will be  available offline. 
			So you can learn on your way to school or work. 
			add the app to your home screen to start learning.
		</p>
		<p>
			<h3>Install the app</h3>
			You can add the app to your home screen.
		</p>
		<p>
		<h3>Future plans</h3>
			This app is work in progress. Future features include making your own
			sets and learning with spaced repetition.
		</p>
		<p>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
		<p>If you want to reset everything and update the sample data tap on the button below.</p>
		<button 
			class={[style.button, style.resetButton].join(' ')} 
			onClick={ handleResetAllDataClick }>
			Reset all data
		</button>
	</div>
);

export default Home;
