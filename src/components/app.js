import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { restoreProgress } from '../lib/flashcards'

import Header from './header';

// Code-splitting is automated for routes
import Learn from '../routes/learn';
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
	};

	componentWillMount() {
		this.setState({data: restoreProgress(data)})
	}

	render(props, state) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
          <Home default path="/" />
					<Sets path="/sets" data={ state.data } />
					<Set path="/sets/:set" data={ state.data } />
					<Card path="/sets/:set/cards/:card" data={ state.data } />
				</Router>
			</div>
		);
	}
}
