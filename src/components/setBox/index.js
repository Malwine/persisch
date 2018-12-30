import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const SetBox = ({ setLink, setName, setDesc }) => (
	<li class={style.box}>
		<a href={ setLink }>{ setName }</a>
		<p>{setDesc}</p>
	</li>
);

export default SetBox;
