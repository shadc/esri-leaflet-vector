import L from 'leaflet';
import 'mapbox-gl';
import 'mapbox-gl-leaflet';
import { request } from 'esri-leaflet';

export function fetchMetadata (url, context) {
  request(url, {}, function (error, style) {
    if (!error) {
      request(style.sources.esri.url, {}, function (error, tileMetadata) {
        if (!error) {
          formatStyle(style, tileMetadata, url);
          context._mapboxGL = L.mapboxGL({
            accessToken: 'ezree',
            style: style
          });

          context._ready = true;
          context.fire('ready', {}, true);
        }
      }, context);
    } else {
      throw new Error('Unable to fetch vector tile style metadata');
    }
  }, context);
}

export function formatStyle (style, metadata, styleUrl) {
  // if a relative path is referenced, the default style can be found in a standard location
  if (style.sources.esri.url && style.sources.esri.url.indexOf('http') === -1) {
    style.sources.esri.url = styleUrl.replace('/resources/styles/root.json', '');
  }

  // right now ArcGIS Pro published vector services have a slightly different signature
  if (metadata.tiles && metadata.tiles[0].charAt(0) !== '/') {
    metadata.tiles[0] = '/' + metadata.tiles[0];
  }

  if (metadata.tileMap && metadata.tileMap.charAt(0) !== '/') {
    metadata.tileMap = '/' + metadata.tileMap;
  }

  style.sources.esri = {
    type: 'vector',
    scheme: 'xyz',
    tilejson: metadata.tilejson || '2.0.0',
    format: (metadata.tileInfo && metadata.tileInfo.format) || 'pbf',
    index: metadata.tileMap ? style.sources.esri.url + metadata.tileMap : null,
    tiles: [
      style.sources.esri.url + metadata.tiles[0]
    ],
    description: metadata.description,
    name: metadata.name,
    /* mapbox-gl-js does not respect the indexing of esri tiles
    because we cache to different zoom levels depending on feature density. articifially capping at 15, but 404s will still be encountered when zooming in tight in rural areas.

    the *real* solution would be to make intermittent calls to our tilemap and update the maxzoom of the layer internally.

    reference implementation: https://github.com/openstreetmap/iD/pull/5029
    */
    maxzoom: 15
  };

  if (style.glyphs.indexOf('http') === -1) {
    // set paths to sprite and glyphs
    style.glyphs = styleUrl.replace('styles/root.json', style.glyphs.replace('../', ''));
    style.sprite = styleUrl.replace('styles/root.json', style.sprite.replace('../', ''));
  }
}

export var Util = {
  fetchMetadata: fetchMetadata,
  formatStyle: formatStyle
};

export default Util;
