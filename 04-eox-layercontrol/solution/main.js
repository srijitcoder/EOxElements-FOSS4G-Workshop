import "https://unpkg.com/@eox/layout/dist/eox-layout.js";
import "https://unpkg.com/@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import "https://unpkg.com/@eox/map/dist/eox-map.js";
// Import the @eox/layercontrol package
import "https://unpkg.com/@eox/layercontrol/dist/eox-layercontrol.js";

document.querySelector("eox-map").config = {
  layers: [
    {
      type: "Group",
      properties: {
        // add layer properties
        id: "background",
        title: "Background layers",
      },
      layers: [
        {
          type: "Tile",
          properties: {
            id: "s2cloudless",
            // add layer properties
            title: "Sentinel-2 Cloudless",
            layerControlExclusive: true,
          },
          source: {
            type: "WMTSCapabilities",
            url: "https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml",
            layer: "s2cloudless-2020_3857",
          },
        },
        {
          type: "Tile",
          properties: {
            id: "osm",
            // add layer properties
            title: "OSM",
            visible: false,
            layerControlExclusive: true,
          },
          source: {
            type: "OSM",
          },
        },
      ],
    },
    {
      type: "Vector",
      properties: {
        id: "regions",
        // add layer properties
        title: "Regions Vector",
        visible: false,
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
    {
      type: "STAC",
      properties: {
        id: "stacLayer",
        // add layer properties
        title: "STAC Group",
      },
      url: "https://planetarycomputer.microsoft.com/api/stac/v1/search?bbox=125.727770,-29.514858,133.412707,-23.673395&collections=sentinel-2-l2a&datetime=2024-06-17T00:00:00Z/2024-06-18T00:00:00Z",
      displayPreview: true,
    },
  ],
  view: {
    zoomExtent: [
      13073258.63003, -4560251.803262, 15027354.843273, -2011037.446905,
    ],
  },
};
