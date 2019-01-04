import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Box extends Component {

  showProgress = (progress) => {
      let progressBar = []

      {for (let block = 1; block <= progress; block++) {
          progressBar.push(<div class={style.bar}></div>)
      }}
      return progressBar
  }

render({ link, headline, description, progress, back }) {
  return (
    <div class={style.box}>
      { headline && <h2 class={style.headline}>{ headline }</h2>}
      { description && <p class={style.subline}>{description}</p>}
      { link && <a class={style.button} href={ link }>LEARN</a>}

      { back && (progress !== null && progress !== undefined  && progress !== 0) ? 
        <div class={ style.progressWrap }>{ this.showProgress(progress) }</div> : <div></div> }
    </div>
    )
  }
}
