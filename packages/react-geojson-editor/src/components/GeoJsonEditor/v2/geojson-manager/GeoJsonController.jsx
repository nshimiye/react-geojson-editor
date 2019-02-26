import React from 'react';
import PropTypes from 'prop-types';
import { GeoJsonEditorMode } from '../../../../utils';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { PolygonDataContext } from '../GoogleMap'; // @TODO
import Controls from './Controls';

/**
 * - show ui for enabling polygon editing capability
 * - dispatch actions for
 *      - persting new changes
 *      - remove new changes
 *      - toggle edit mode
 * @param {*} props
 */
export const GeoJsonController = ({
  mode, onToggleMode,
}) => (
  <Controls title="Managing geojson changes">
    {mode !== GeoJsonEditorMode.VIEW ?
      <Dropdown name="Changes" openAtStart style={{ padding: 0 }} containerStyle={{ width: 120 }} >
        <PolygonDataContext.Consumer>
          {({ discardChanges, persistChanges }) =>
                        (
                          <div style={{ padding: 0 }} title="GeoJsonControls">
                            <Button
                              onClick={(ev) => {
                                        persistChanges(
                                            ev,
                                            () => onToggleMode(GeoJsonEditorMode.VIEW),
                                        );
                                    }}
                              title="Save changes"
                            >
                                    Save
                            </Button>
                            <Button
                              onClick={ev => discardChanges(
                                        ev,
                                        () => onToggleMode(GeoJsonEditorMode.VIEW),
                                    )
                                    }
                              title="Discard changes"
                            >
                                    Cancel
                            </Button>
                          </div>
                        )
                    }
        </PolygonDataContext.Consumer>
      </Dropdown> :
      <Button
        onClick={() => onToggleMode(GeoJsonEditorMode.EDIT)}
        style={{
            width: 120,
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px',
            borderRadius: 2,
        }}
        title="Turn on Edit mode"
      >
                Create / Edit
      </Button>
        }
  </Controls>
);
export default GeoJsonController;

GeoJsonController.propTypes = {
  mode: PropTypes.string,
  onToggleMode: PropTypes.func,
};

GeoJsonController.defaultProps = {
  mode: GeoJsonEditorMode.VIEW,
  onToggleMode: () => { },
};
