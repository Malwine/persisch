import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h1>Flashcards</h1>
		<p>Learn anywhere anytime!</p>
		<p>Check out some of the <Link activeClassName={style.active} href="/sets">sample sets</Link>.</p>
	</div>
);

export default Home;
