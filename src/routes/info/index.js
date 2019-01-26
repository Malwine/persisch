import { h, Component } from 'preact';
import style from './style';

export default class Info extends Component  {

  render ({ handleResetAllDataClick }) {
    return (
      <div class={style.home}>
        <p class={style.texts}>
          Flashcards is a web app that helps you practice
          your vocabulary wherever you go.
        </p>

        <p class={style.texts}>
          <h3>Install the app</h3>
          You can add the app to your home screen on Andoid and iPhone.
        </p>
        <p class={style.texts}>
          <h3>Offline</h3>
          On recent phones the app will be  available offline.
          So you can learn on your way to school or work.
        </p>
        <p class={style.texts}>
        <h3>Future plans</h3>
          This app is work in progress. Future features include making your own
          sets and learning with spaced repetition.
        </p>
        <p class={style.texts}>This app was built by <a class={style.link} href="https://twitter.com/malweene">Malwine</a>.</p>
        <p class={style.texts}>If you want to reset everything and update the sample data tap on the button below.</p>
        <button
          class={[style.button, style.resetButton].join(' ')}
          onClick={ handleResetAllDataClick }>
          Reset all data
        </button>
      </div>
    )
  }
}
