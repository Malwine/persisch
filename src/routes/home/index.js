import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Box from '../../components/box'

const Home = ({ handleResetAllDataClick }) => (
	<div class={style.home}>
		<h2>Learn wherever you go!</h2>
		<div class={style.aboveBox}>
			<p>Flashcards is a web app that helps you practice your vocabulary wherever you go.
			Learn on your way to school or work. The app will be available independent of 
			your internet connection.</p>
		</div>

		<Box headline={ "four" } smaller />
		<Box headline={ "چهار" } description={ "(۴) shahar" } back={ true } smaller/>

		<div class={style.belowBox}>
			<p>
				Check out the <Link class={style.link} href="/sets">sample sets</Link>.
				Soon you will be able to create your own. Add the app to your home screen and start learning.
			</p>
			<p>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
		</div>
		<button 
					class={style.button} 
					onClick={ handleResetAllDataClick }>
					Reset all data
		</button>
	</div>
);

export default Home;
