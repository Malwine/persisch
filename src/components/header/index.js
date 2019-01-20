import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = ({backButtonLocation}) => (
	<header class={style.header}>
		{ backButtonLocation && <Link class={style.arrow} href={backButtonLocation}>&lt;=</Link> }
		{/* <h1>Flashcards</h1> */}
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/sets">Sets</Link>
		</nav>
	</header>
);

export default Header;
