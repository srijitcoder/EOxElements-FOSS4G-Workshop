import "https://unpkg.com/@eox/layout/dist/eox-layout.js";
// Import the @eox/map package
import "https://unpkg.com/@eox/map/dist/eox-map.js";

// Set the layers property of the eox-map
document.querySelector("eox-map").layers = [
  {
    type: "Tile",
    properties: {
      id: "osm",
    },
    source: {
      type: "OSM",
    },
  },
  {
    type: "Vector",
    properties: {
      id: "regions",
    },
    source: {
      type: "Vector",
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: "GeoJSON",
      attributions: "Regions: @ openlayers.org",
    },
    style: {
      "stroke-color": "#232323",
      "stroke-width": 1,
      "fill-color": ["string", ["get", "COLOR"], "#eee"],
    },
  },
];
