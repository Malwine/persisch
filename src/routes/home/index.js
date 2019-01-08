import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Box from '../../components/box'

const Home = () => (
	<div class={style.home}>
		<h2>Learn wherever you go!</h2>
		<div class={style.aboveBox}>
			<p>Flashcards is a web app that helps you practice your vocabulary wherever you go.
			Learn on your way to school or work. The app will be available independent of 
			your internet connection.</p>
		</div>

		<Box headline={ "four" } description={ "in Persian" } />

		<div class={style.belowBox}>
			<p>
				Add the app to your home screen and start learning
				Soon you will be able to create your own sets.
				Meanwhile, check out some of the <Link class={style.link} href="/sets">sample sets</Link>.
			</p>
			<p>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
		</div>
	</div>
);

export default Home;
