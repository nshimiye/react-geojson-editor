'use strict';

var reactGeojsonEditor = require('react-geojson-editor');

function reactGeojsonEditorDemo() {
    this.getMessage = function() {
        return reactGeojsonEditor();
    }
}

module.exports = new reactGeojsonEditorDemo();
