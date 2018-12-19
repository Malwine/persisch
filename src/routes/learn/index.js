import { h, Component } from 'preact';
import style from './style';

export default class Learn extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

	// update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render({ }, { time, count }) {
		return (
			<div class={style.profile}>
				<h1>Learn</h1>

				<p>Choose your sets:</p>
			</div>
		);
	}
}
