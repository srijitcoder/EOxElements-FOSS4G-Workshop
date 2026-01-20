import "https://unpkg.com/@eox/layout/dist/eox-layout.js";
import "https://unpkg.com/@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import "https://unpkg.com/@eox/map/dist/eox-map.js";
import "https://unpkg.com/@eox/layercontrol/dist/eox-layercontrol.js";
// Import the @eox/itemfilter package
import "https://unpkg.com/@eox/itemfilter/dist/eox-itemfilter.js";

// Add config and items for eox-itemfilter
Object.assign(document.querySelector("eox-itemfilter"), {
  filterProperties: [
    {
      keys: ["title"],
      title: "Search",
      type: "text",
      expanded: true,
    },
    {
      key: "themes",
      title: "Theme",
      type: "multiselect",
      expanded: true,
    },
  ],
  items: [
    {
      title: "Global Temperature",
      id: "global-temperature",
      themes: ["Air", "Meteorology"],
      stac: "https://eurodatacube.github.io/eodash-catalog/RACE/meteorological_variables/temperature/collection.json",
    },
    {
      title: "Carbon Monoxide",
      id: "carbon-monoxide",
      themes: ["Air", "Pollution"],
      stac: "https://eurodatacube.github.io/eodash-catalog/RACE/global_parameters/CO_3_daily/collection.json",
    },
    {
      title: "Vessel Density",
      id: "vessel-density",
      themes: ["Economy", "Oceans"],
      stac: "https://eurodatacube.github.io/eodash-catalog/RACE/vessel_density/vessel_density_all/collection.json",
    },
  ],
});

document.querySelector("eox-map").config = {
  layers: [
    {
      type: "Tile",
      properties: {
        id: "s2cloudless",
        // add layer properties
        title: "Sentinel-2 Cloudless",
      },
      source: {
        type: "WMTSCapabilities",
        url: "https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml",
        layer: "s2cloudless-2020_3857",
      },
    },
  ],
};

document.querySelector("eox-itemfilter").addEventListener("select", (event) => {
  const item = event.detail;
  const eoxMap = document.querySelector("eox-map");
  // fetch the STAC collection
  fetch(item.stac)
    .then((response) => response.json())
    .then((json) => {
      // find the link with `rel` "wms"
      const wmsLink = json.links.find((l) => l.rel === "wms");
      // push the new layer definition to the eox-map layers
      eoxMap.layers = [
        ...eoxMap.layers,
        {
          type: "Tile",
          properties: {
            id: item.id,
            title: item.title,
          },
          source: {
            type: "TileWMS",
            url: wmsLink.href,
            params: {
              LAYERS: wmsLink["wms:layers"],
            },
          },
        },
      ];
    });
});
