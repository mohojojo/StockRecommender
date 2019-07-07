import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appActions from '../actions/appActions';
import services from '../services/serviceHolder';

class App extends Component {
    componentWillMount() {
        this.loadService();
    }

    loadService() {
        services
            .initServices()
            .then(() => this.props.setServicesLoaded())
            .then(() => this.fetchEverything())
            .catch((err) => {
                // this.onStartupError();
                console.warn('services.initServices - FAILED:', err);
            });
    }

    fetchEverything() {
        // fetch enum config
        // this.props.fetchEnumConfig();
        // fetch translation

        // Refresh authentication if user has signed in
        // if (document.cookie) { }
    }

    render() {
        return (
            <div id='app' className='app'>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    loaded: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        app: state.app,
        error: state.error,
        loaded: state.app.loaded
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setServicesLoaded: () => {
            dispatch(appActions.setServicesLoaded());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
