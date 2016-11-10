var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var io = require('socket.io-client');
var Header = require('./parts/Header');

var App = React.createClass({

    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            member: {},
            speaker: '',
            audience: []
        }
    },

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.updateState);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
        this.socket.on('start', this.updateState);
    },

    emit(eventName, payload){
        this.socket.emit(eventName, payload);
    },

    connect() {
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

        if(member){
            this.emit('join', member);
        }

        this.setState({ status: 'connected' });
    },

    disconnect() {
        this.setState({ status: 'disconnected' });
    },

    updateState(serverState) {
        this.setState({title: serverState.title})
        this.setState(serverState);
    },

    joined(member){
        sessionStorage.member= JSON.stringify(member);
        this.setState({ member: member});
    },

    updateAudience(newAudience){
        this.setState({audience: newAudience});
    },

    render() {
        return (
            <div>
                <Header {...this.state} />
                <RouteHandler audience={this.state.audience} member={this.state.member} emit={this.emit} title={this.state.title} status={this.state.status} />
            </div>
        );
    }

});

module.exports = App;