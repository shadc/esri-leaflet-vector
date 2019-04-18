# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Upcoming changes][unreleased]

## [2.0.1]

### Fixed

* Added support for deeper zoom by artificially capping tile requests at zoom level 15.

## [2.0.0]

### Changed

* Existing basemaps have been updated to [`v2`](https://www.esri.com/arcgis-blog/products/arcgis-living-atlas/mapping/whats-new-in-esri-vector-basemaps-december-2017/)

### Added

* Esri's [OpenStreetMap Vector basemap](https://www.esri.com/arcgis-blog/products/arcgis-living-atlas/mapping/new-osm-vector-basemap/)

### Breaking Change

* `mapbox-gl-js` is now an external dependency. it is no longer bundled internally.

```html
<link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css"/>
<script src="https://unpkg.com/mapbox-gl/dist/mapbox-gl.js"></script>

<!-- Esri Leaflet -->
<script src="https://unpkg.com/esri-leaflet/dist/esri-leaflet.js"></script>
<script src="https://unpkg.com/esri-leaflet-vector/dist/esri-leaflet-vector.js"></script>
```

## [1.0.7]

### Fixed

* several edge cases that corrupted the current state of the map

## [1.0.6]

### Changed

* now using Esri's latest and greatest basemaps

### Fixed

* Ensure that when a tileMap is present in an ArcGIS Pro published tileset, that its url is concatenated correctly [#20](https://github.com/Esri/esri-leaflet-vector/issues/20)

## [1.0.5]

### Fixed

* Fixed a regression which caused `L.esri.Vector.Layer` not to honor custom styles applied to generic Esri hosted vector tilesets (example [item](http://www.arcgis.com/home/item.html?id=bd505ce3efff479bb4e87b182f180159))

## [1.0.4]

### Added

* `L.esri.Vector.layer` can now be used to display Vector Tile Services published using ArcGIS Pro.  (like [this one](http://www.arcgis.com/home/item.html?id=0bac0ffdc8634d9a9bc662bb8fa7547d))

## [1.0.3]

### Added

* `L.esri.Vector.layer` object added so that developers can point at any arbitrary ArcGIS Online hosted vector tile source

### Fixed

* trapped situation in which vector style json defines path of sprites/glyphs using fully qualified paths.

### Changed

* made dependency on Leaflet fixed at `1.0.0-beta.2` (until [#47](https://github.com/mapbox/mapbox-gl-leaflet/issues/47) is resolved)
* started linting all the `.js` in the repo

## [1.0.2]

### Fixed

* Added three new Vector basemaps.  [Mid-Century](http://www.arcgis.com/home/item.html?id=763884983d3544c0a418a97992881fce), [Newspaper](http://www.arcgis.com/home/item.html?id=4f4843d99c34436f82920932317893ae) and [Spring](http://www.arcgis.com/home/item.html?id=267f44f08a844c7abee2b62b00600540).

## [1.0.1]

### Fixed

* added .npmignore file to ensure built library is included in npm package.

## 1.0.0

### Added

* Initial Release

[unreleased]: https://github.com/esri/esri-leaflet-vector/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/esri/esri-leaflet-vector/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.7...v2.0.0
[1.0.7]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/esri/esri-leaflet-vector/compare/v1.0.0...v1.0.1
