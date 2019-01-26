import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import arrow from '../../assets/icons/arrow.png'

const Header = ({backButtonLocation}) => (
  <header class={style.header}>
    { backButtonLocation ? (
        <Link class={style.arrow} href={backButtonLocation}>
          <img class={style.arrow} src={ arrow }></img>
        </Link>
      ) : (
      <Link class={style.arrow} href="/info">Info</Link>
      )
    }
    <Link class={style.name} href="/"><h1>Flashcards</h1></Link>
    <div class={style.space}></div>
  </header>
);

export default Header;
