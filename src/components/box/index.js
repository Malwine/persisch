import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Box extends Component {

render({ link, headline, description, back, smaller}) {
  return (
    <div class={  smaller && back ? [style.box, style.smaller, style.gray].join(' ') :
                  smaller ?  [style.box, style.smaller].join(' ') : 
                  back ? [style.box, style.gray].join(' ') : 
                  style.box }>
      { headline && <h2 class={style.headline}>{ headline }</h2>}
      { description && <p class={style.subline}>{description}</p>}
      { link && <a class={style.button} href={ link }>LEARN</a>}
    </div>
    )
  }
}
