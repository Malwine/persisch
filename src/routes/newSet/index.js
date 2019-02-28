import { h, Component } from 'preact';
import style from './style';

export default class NewSet extends Component {

	onSave = (event) => {
		event.preventDefault()
		let newSet = {
			name: this.name.value,
			description: this.description.value,
			cards: [
				{
						front: this.front1.value,
						frontDescription: null,
						back: this.back1.value,
						backDescription: null
				},
				{
					front: this.front2.value,
					frontDescription: null,
					back: this.back2.value,
					backDescription: null
			}
			]
		}
		console.log(this.props.data.sets)
		console.log(newSet)
		this.props.data.sets.push(newSet)
		console.log(this.props.data.sets)
	}

  render({ data }) {
		return (
			<div class={style.sets}>
				<h2>Neues Set</h2>
				<form>
					<label>
						<p>Set Name:</p>
						<input ref={ element => this.name = element} type="text" name="name" />
					</label>
					<label>
						<p>Set Beschreibung:</p>
						<input ref={ element => this.description = element} type="text" name="description" />
					</label>
					<hr></hr>
					<h3>Karte 1:</h3>
					<label>
						<p>Vorderseite:</p>
						<input ref={ element => this.front1 = element} type="text" name="front1" />
					</label>
					<label>
						<p>Rückseite:</p>
						<input ref={ element => this.back1 = element} type="text" name="back1" />
					</label>
					<hr></hr>
					<h3>Karte 2:</h3>
					<label>
						<p>Vorderseite:</p>
						<input ref={ element => this.front2 = element} type="text" name="front2" />
					</label>
					<label>
						<p>Rückseite:</p>
						<input ref={ element => this.back2 = element} type="text" name="back2" />
					</label>
					<input type="submit" value="Speichern" onClick={ this.onSave } />
				</form>
			</div>
		);
	}
}