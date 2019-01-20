import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = ({backButtonLocation}) => (
	<header class={style.header}>
		{ backButtonLocation ? (
				<Link class={style.arrow} href={backButtonLocation}>
					<img class={style.arrow} src="../../assets/icons/arrow.png"></img>
				</Link> 
			) : (
			<div class={style.space}></div>
			)
		}
		<Link class={style.name} href="/"><h1>Flashcards</h1></Link>
		<Link activeClassName={style.active} href="/sets">Sets</Link>

	</header>
);

export default Header;
