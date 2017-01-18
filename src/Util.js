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

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeStyles(target, source) {
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      var keyObj = {};
      if (isObject(source[key])) {
        if (Array.isArray(target[key])){
          target[key].unshift(source[key]);
        } else {
          keyObj[key] = {};
          if (!target[key]) Object.assign(target, keyObj);
          mergeStyles(target[key], source[key]);
        }
      } else {
        keyObj[key] = source[key];
        Object.assign(target, keyObj);
      }
    }
  }
  return target;
}

export function formatStyle (style, metadata, styleUrl, options) {
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
    maxzoom: metadata.maxzoom ? metadata.maxzoom : 22
  };

  if (options.showAerial){
    style.sources.esriAerial = {
      type: 'raster',
      tileSize: 256,
      tiles: ['https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
    };
    style.layers.unshift({
      id: 'esriAerial',
      type: 'raster',
      source: 'esriAerial'
    });
    var copyright = 'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community';
    map.attributionControl.addAttribution(copyright);
  }

  if (options.mapboxglStyleJson){
    mergeStyles(style, options.mapboxglStyleJson);
  }

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
