import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Box = ({ setLink, setName, setDesc }) => (
	<li class={style.box}>
		<h2 class={style.headline}>{ setName }</h2>
		<p class={style.subline}>{setDesc}</p>
		{ setLink && <a class={style.button} href={ setLink }>LEARN</a>}
	</li>
);

export default Box;
