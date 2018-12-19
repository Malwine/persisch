import { h, Component } from 'preact';
import style from './style';

export default class Sets extends Component {
	render({ data }) {
		console.log(data)
		return (
			<div class={style.profile}>
				<h1>Sets</h1>

				<ul>
					
				{ data.sets.map((set, index) => {
					return (
						<li>
							<a href={`/sets/${index}`}>{ set.name }</a>
							<p>{set.description}</p>
						</li>
					)
				})}
				</ul>
				


			</div>
		);
	}
}
