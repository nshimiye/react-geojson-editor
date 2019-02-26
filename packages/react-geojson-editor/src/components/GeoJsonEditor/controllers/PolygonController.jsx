import React from 'react';
// import PropTypes from 'prop-types';
// import Reader from './geojson-manager/Reader';

// import { GeoJsonEditorMode } from '../../../../utils';
import { Dropdown } from '../../Dropdown';
import { Button } from '../../Button';
import Controls from './Controls';
// import { PolygonDataContext } from '../GoogleMap'; // @TODO
import { PolygonDataContext } from '../google-map'; // @TODO

/**
 * - show ui for enabling polygon mutation operations
 */
export const PolygonController = () => (
  <Controls title="Managing polygon edits">
    <PolygonDataContext.Consumer>
      {({ selectedPolygonList, subtractAction, deleteAction }) => {
        const selectedLength = selectedPolygonList.length;
        return (
          <Dropdown name={`${selectedLength} Selected`} style={{ padding: 0 }} containerStyle={{ width: 120 }} >
            {/* @TODO put this code inside its EditorControls component */}
            <div style={{ padding: 0 }} title="EditorControls">
              {/* <Button disabled={selectedLength < 2} title="Merge">Add TODO</Button> */}
              <Button
                disabled={selectedLength < 2}
                onClick={subtractAction}
                title="Make Hollow"
              >
                Subtract
              </Button>
              <Button
                disabled={selectedLength <= 0}
                onClick={deleteAction}
              >
                Delete
              </Button>
            </div>
          </Dropdown>
        );
      }}
    </PolygonDataContext.Consumer>
  </Controls>
);

export default PolygonController;
