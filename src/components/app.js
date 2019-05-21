import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { restoreProgress, resetAllData } from '../lib/flashcards'

import Header from './header';

// Code-splitting is automated for routes
import Sets from '../routes/sets';
import Set from '../routes/set';
import Card from '../routes/card';
import Home from '../routes/home';
import Info from '../routes/info';

import data from '../data.json'

export default class App extends Component {

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  setCustomState = newState => {
    // https://github.com/developit/preact-cli/issues/677
    setTimeout(() => {
      this.setState(newState)
    }, 100)
  }
  handleRoute = e => {
      this.currentUrl = e.url;
      switch(e.url) {
        case "/" :
          this.setCustomState({previousUrl: null});
          break;
        case "/sets" :
          this.setCustomState({previousUrl: "/"});
          break;
        case "/info" :
          this.setCustomState({previousUrl: "/"});
          break;
        default : {
          const setUrl = e.url.match(/\/sets\/\d/)[0]
          if (e.url.match(/\/sets\/\d+$/)) {
            this.setCustomState({previousUrl: "/sets"});
          } else if (e.url.match(/\/sets\/\d+\/cards\/\d+/)) {
            this.setCustomState({previousUrl: setUrl});
          } else {
            this.setCustomState({previousUrl: null});
          }
        }
      }
  };

  restoreData = () => {
    this.setState({data: restoreProgress(data)})
  }

  handleResetAllDataClick = () => {
    if (confirm("Möchtest du die Vokabeln updaten? (Fortschritt wird zurückgesetzt.) ")) {
      resetAllData()
      this.setState({data: null})
      this.restoreData()
    }
  }

  componentWillMount() {
    this.restoreData()
  }

  render(props, state) {
    return (
      <div id="app">
        <Header backButtonLocation={ state.previousUrl } />
        <Router onChange={ this.handleRoute }>
          <Home default path="/" data={ state.data } handleResetAllDataClick={ this.handleResetAllDataClick } />
          <Sets path="/sets" data={ state.data } />
          <Set path="/sets/:set" data={ state.data } />
          <Card path="/sets/:set/cards/:card" data={ state.data } />
          <Info path="/info" handleResetAllDataClick={ this.handleResetAllDataClick }  />
        </Router>
      </div>
    );
  }
}
