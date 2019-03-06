import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleMapContext } from '../google-map';
import { GMPolygonType, GMDataType } from '../../../custom-types';

export class Reader extends Component {
    static contextType = GoogleMapContext;
    static propTypes = {
      gmapData: GMDataType,
      newPolygonList: PropTypes.arrayOf(GMPolygonType),
    };

    static defaultProps = {
      gmapData: null,
      newPolygonList: [],
    }

    componentDidMount() {

      if (!this.props.gmapData) { return; }

      const { map } = this.context;
      this.props.gmapData.setMap(map);

      // @TODO this is a duplicate from Updator component
      this.props.newPolygonList.forEach(p => p.setMap(map));
    }

    componentDidUpdate(prevProps) {
      const { map } = this.context;
      const { gmapData, newPolygonList } = this.props;

      if (prevProps.gmapData !== gmapData) {
        // cleanup
        if (prevProps.gmapData) prevProps.gmapData.setMap(null);

        if (gmapData) gmapData.setMap(map);
      }

      if (prevProps.newPolygonList !== newPolygonList) {
        // cleanup
        prevProps.newPolygonList.forEach(p => p.setMap(null));

        newPolygonList.forEach(p => p.setMap(map));
      }
    }

    componentWillUnmount() {
      const { gmapData, newPolygonList } = this.props;

      if (gmapData) gmapData.setMap(null);

      // @TODO this is a duplicate from Updator component
      newPolygonList.forEach(p => p.setMap(null));
    }

    render() {
      return null;
    }
}

export default Reader;
