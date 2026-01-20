import "https://unpkg.com/@eox/layout/dist/eox-layout.js";
import "https://unpkg.com/@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import "https://unpkg.com/@eox/map/dist/eox-map.js";
import "https://unpkg.com/@eox/layercontrol/dist/eox-layercontrol.js";
import "https://unpkg.com/@eox/itemfilter/dist/eox-itemfilter.js";
// import the @eox/stacinfo package
import "https://unpkg.com/@eox/stacinfo/dist/eox-stacinfo.js";

// add eox-stacinfo config
const eoxStacinfo = document.querySelector("eox-stacinfo");
Object.assign(eoxStacinfo, {
  header: ["title"],
  tags: ["tags"],
  properties: ["satellite", "sensor", "agency", "extent"],
  featured: ["description", "providers", "assets", "links"],
  footer: ["sci:citation"],
});

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
  fetch(item.stac)
    .then((response) => response.json())
    .then((json) => {
      const wmsLink = json.links.find((l) => l.rel === "wms");
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
  // set the `for` property of eox-stacinfo
  eoxStacinfo.for = item.stac;
});
