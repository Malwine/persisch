import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { restoreProgress } from '../lib/flashcards'

import Header from './header';

// Code-splitting is automated for routes
import Sets from '../routes/sets';
import Set from '../routes/set';
import Card from '../routes/card';
import Home from '../routes/home';

import data from '../data.json'

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
		switch(e.url) {
			case "/" : 
				this.setState({previousUrl: null});
				break;
			case "/sets" :
				this.setState({previousUrl: "/"});
				break;
			default : {
				const setUrl = e.url.match(/\/sets\/\d/)[0]
				if (e.url.match(/\/sets\/\d+$/)) {
					this.setState({previousUrl: "/sets"});
				} else if (e.url.match(/\/sets\/\d+\/cards\/\d+/)) {
					this.setState({previousUrl: setUrl});
				} else {
					this.setState({previousUrl: null});
				}
			}
		}
	};

	componentWillMount() {
		this.setState({data: restoreProgress(data)})
	}

	render(props, state) {
		return (
			<div id="app">
				<Header backButtonLocation={ this.state.previousUrl } />
				<Router onChange={ this.handleRoute }>
          <Home default path="/" />
					<Sets path="/sets" data={ state.data } />
					<Set path="/sets/:set" data={ state.data } />
					<Card path="/sets/:set/cards/:card" data={ state.data } />
				</Router>
			</div>
		);
	}
}
