import "https://unpkg.com/@eox/layout/dist/eox-layout.js";
// Import the @eox/map package
import "https://unpkg.com/@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import "https://unpkg.com/@eox/map/dist/eox-map.js";

document.querySelector("eox-map").config = {
  controls: {
    Zoom: {},
    OverviewMap: {
      layers: [
        {
          type: "Tile",
          properties: {
            id: "overviewMap",
          },
          source: {
            type: "OSM",
          },
        },
      ],
    },
  },
  layers: [
    {
      type: "STAC",
      properties: {
        id: "stacLayer",
      },
      url: "https://planetarycomputer.microsoft.com/api/stac/v1/search?bbox=125.727770,-29.514858,133.412707,-23.673395&collections=sentinel-2-l2a&datetime=2024-06-17T00:00:00Z/2024-06-18T00:00:00Z",
      displayPreview: true,
    },
    {
      type: "Tile",
      properties: {
        id: "s2cloudless",
      },
      source: {
        type: "WMTSCapabilities",
        url: "https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml",
        layer: "s2cloudless-2020_3857",
      },
    },
  ],
  view: {
    zoomExtent: [
      13073258.63003, -4560251.803262, 15027354.843273, -2011037.446905,
    ],
  },
};
