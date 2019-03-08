import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { getProgressForSet } from '../../lib/flashcards'
import Progress from '../../components/progress'

export default class Home extends Component  {

  showChosenSets = (data) => {
    const learningStarted = !!(data.sets.find(set => set.progressRate > 0))

    if (learningStarted) {
      return data.sets.map((set, index) => {
          if (set.progressRate > 0) {
            return (
              <div>
                <Link class={style.setLink}
                      href={`/sets/${index}`}>{ set.name }</Link>
                <Progress currentSet={ set} />
              </div>
            )
          }
        })
    } else {
      return (
        <Link class={style.chooseSetHint} href="/sets">Wähle ein Set!</Link>
      )
    }
  }

  render ({ data }) {
    return (
      <div class={style.home}>
        <h2 class={style.headline}>Willkommen!</h2>
        <p class={style.texts}>
          Mit dieser App kannst du Vokabeln für deinen Persisch Kurs lernen oder
          deine eigenen Vokabel-Sets anlegen.
        </p>
        <h3>Deine Sets</h3>

        <Link href="/sets">
          <button class={[style.button, style.buttonPrimary].join(' ')}>
            Entdecke alle Sets
          </button>
        </Link>
      </div>
    )
  }
}
