/* global google */
/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchJsScript } from '../../../utils';

// withScriptjs
const LOADING_STATE_NONE = 'NONE';
const LOADING_STATE_BEGIN = 'BEGIN';
const LOADING_STATE_LOADED = 'LOADED';

// context is the global window.google object set when the script has been loaded
export const ScriptContext = React.createContext(null);

export class ScriptLoader extends Component {
  constructor(props) {
    super(props);
    this.handleLoaded = this.handleLoaded.bind(this);
  }
    state = {
      loadingState: LOADING_STATE_NONE,
      google: null,
    };

    componentDidMount() {
      const { scriptUrl } = this.props;
      const { loadingState } = this.state;
      if (loadingState !== LOADING_STATE_NONE) return;
      this.setState({ loadingState: LOADING_STATE_BEGIN }, () => {
        // @TODO have fetchJsScript provide google object in the callback
        // fetchJsScript(scriptUrl, google => this.handleLoaded(google))
        fetchJsScript(scriptUrl, () => this.handleLoaded(google));
      });
    }
    componentWillUnmount() {
      this.isUnmounted = true;
    }
    isUnmounted = false

    handleLoaded(google) {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        google,
        loadingState: LOADING_STATE_LOADED,
      });
    }

    render() {
      const { google, loadingState } = this.state;
      if (loadingState !== LOADING_STATE_LOADED) { return <div> Loading ... </div>; }

      if (!google) { return <div> Error Loading Script </div>; }

      return (
        <ScriptContext.Provider value={google}>
          {this.props.children}
        </ScriptContext.Provider>
      );
    }
}

ScriptLoader.propTypes = {
  children: PropTypes.node.isRequired,
  scriptUrl: PropTypes.string.isRequired,
};

export default ScriptLoader;
