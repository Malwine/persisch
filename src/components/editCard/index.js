import { h } from 'preact';
import style from './style';

const EditCard = ({}) => (
    <div>
      <div class={style.line}></div>
      <h3>Karte x:</h3>
      <label>
        <p>Vorderseite:</p>
        <input ref={ element => this.front = element} type="text" name="front" placeholder="Wort"/>
        <input ref={ element => this.front = element} type="text" name="front" placeholder="Beschreibung"/>
      </label>
      <label>
        <p>Rückseite:</p>
        <input ref={ element => this.back = element} type="text" name="back"  placeholder="Wort"/>
        <input ref={ element => this.back = element} type="text" name="back"  placeholder="Beschreibung"/>
      </label>
    </div>
);

export default EditCard;
