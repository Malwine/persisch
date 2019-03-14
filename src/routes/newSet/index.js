import { h, Component } from 'preact';
import style from './style';
import EditCard from '../../components/editCard';

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
          <EditCard />
          <EditCard />
          <input type="submit" value="Weitere Karte einfügen" onClick={ this.onSave } />
          <input type="submit" value="Set speichern" onClick={ this.onSave } />
        </form>
      </div>
    );
  }
}
