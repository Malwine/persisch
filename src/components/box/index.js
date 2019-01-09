import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { route } from 'preact-router'

export default class Box extends Component {

handleStartClick = () => {
	route(this.props.link)
	}

render({ link, headline, description, back, smaller, progressStatus}) {

  const buttonText = (progressStatus >= 100) ? "COMPLETED " :
                     (progressStatus > 0)   ? `RESUME (${ Number((progressStatus).toFixed(1))} %)` : "LEARN"

  return (
    <div class={  smaller && back ? [style.box, style.smaller, style.gray].join(' ') :
                  smaller ?  [style.box, style.smaller].join(' ') : 
                  back ? [style.box, style.gray].join(' ') : 
                  style.box }>
      { headline && <h2 class={style.headline}>{ headline }</h2>}
      { description && <p class={style.subline}>{description}</p>}
  
      { progressStatus &&  <button class={style.button} onClick={ this.handleStartClick } >{buttonText}</button> }
    </div>
    )
  }
}
