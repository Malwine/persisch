import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import arrow from '../../assets/icons/arrow.png'

const Header = ({backButtonLocation}) => (
	<header class={style.header}>
		{ backButtonLocation ? (
				<Link class={style.arrow} href={backButtonLocation}>
					<img class={style.arrow} src={ arrow }></img>
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
