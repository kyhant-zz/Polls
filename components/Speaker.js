var React = require('react');
var JoinSpeaker = require('./parts/JoinSpeaker');
var Display = require('./parts/Display');


var Speaker = React.createClass({
	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>
					<Display if={this.props.member.name && this.props.member.type ==='member'}>
						<p>Questions</p>
						<p>Attendance</p>
					</Display>
				</Display>
				<Display if={!this.props.member.name}>
					<h2>Start the presentation</h2>
					<JoinSpeaker emit={this.props.emit} />
				</Display>
			</div>
		);
	}
});

module.exports = Speaker;