import { h, Component } from 'preact';
import style from './style';
import SetBox from '../../components/setBox'

export default class Sets extends Component {

	render({ data }) {
		return (
			<div class={style.profile}>
				<h1>Sets</h1>
				<ul class={style.list}>	
				{ data.sets.map((set, index) => {
					return (
						<SetBox setLink={`/sets/${index}`} setName={set.name} setDesc={set.description}/>
					)
				})}
				</ul>
			</div>
		);
	}
}
