import { h } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router'
import style from './style';
import Box from '../../components/box'


const Home = ({ handleResetAllDataClick }) => (
	<div class={style.home}>
		<h2 class={style.headline}>ف</h2>
		<p>
			<b>Welcome!</b> Flashcards is a web app that helps you practice 
			your vocabulary wherever you go.
		</p>
		<Link href="/sets">
			<button class={[style.button, style.buttonPrimary].join(' ')}>
				Start learning
			</button>
		</Link>
		<p>
			On recent phones the app will be  available offline. 
			So you can learn on your way to school or work. 
			Check out the <Link class={style.link} href="/sets">sample sets</Link> and
			add the app to your home screen to start learning.
		</p>
		<p>
			This app is work in progress. Future features include making your own
			sets and learning with spaced repetition.
		</p>
		<p>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
		<p>If you want to reset and update the sample data tap on the button below.</p>
		<button 
			class={[style.button, style.resetButton].join(' ')} 
			onClick={ handleResetAllDataClick }>
			Reset all data
		</button>
	</div>
);

export default Home;
