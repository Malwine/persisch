import { h, Component } from 'preact';
import style from './style';

export default class NewSet extends Component {
  render({ data }) {
		return (
			<div class={style.sets}>
				<h2>Neues Set</h2>
			</div>
		);
	}
}