import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Box = ({ link, headline, description }) => (
	<li class={style.box}>
		<h2 class={style.headline}>{ headline }</h2>
		<p class={style.subline}>{description}</p>
		{ link && <a class={style.button} href={ link }>LEARN</a>}
	</li>
);

export default Box;
