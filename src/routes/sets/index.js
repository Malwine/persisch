import { h, Component } from 'preact';
import style from './style';
import Box from '../../components/box'

export default class Sets extends Component {

	render({ data }) {
		return (
			<div class={style.profile}>
				<h1>Sets</h1>
				<ul class={style.list}>	
				{ data.sets.map((set, index) => {
					return (
						<Box link={`/sets/${index}`} headline={set.name} description={set.description}/>
					)
				})}
				</ul>
			</div>
		);
	}
}
