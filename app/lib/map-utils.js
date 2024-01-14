import cities from 'cities.json'

export const config = {
  pixelSize: 10, // use 1 for 1:1 scale
  crop: {
    top: 170,
    bottom: 450,
    left: 160,
    right: 100
  },

  // Coordinate of (0, 0) on the uncropped image
  origin: {
    x: 128,
    y: 128
  }
}

// Convert world coordinates (WGS84) to pixels
// https://developers.google.com/maps/documentation/javascript/examples/map-coordinates?csw=1#maps_map_coordinates-javascript
export function project(lat, lng) {
  const TILE_SIZE = 256
  let siny = Math.sin((lat * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return {
    x: TILE_SIZE * (0.5 + lng / 360),
    y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
  }
}

export function getPixelCoordinate (lat, lng) {
  const zoom = 2
  const scale = 1 << zoom
  const worldCoordinate = project(lat, lng);
  const pixelCoordinate = {
    x: Math.floor(worldCoordinate.x * scale),
    y: Math.floor(worldCoordinate.y * scale),
  }
  return pixelCoordinate
}

export function getPixelCoordinateByName (name, country = '') {
  const city = cities.find(item => item.name === name && (!country || country === item.country))
  return getPixelCoordinate(city.lat, city.lng)
}

export function getScaledCoordinate ({ x, y }) {
  return {
    x: Math.floor((x + (config.origin.x - config.crop.left)) / config.pixelSize) * config.pixelSize,
    y: Math.floor((y + (config.origin.y - config.crop.top)) / config.pixelSize) * config.pixelSize
  }
}