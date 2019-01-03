import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h2>Flashcards</h2>
		<p>Learn anywhere anytime!</p>
		<p>Check out some of the <Link activeClassName={style.active} href="/sets">sample sets</Link>.</p>
	</div>
);

export default Home;
