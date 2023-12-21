/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: ["robust-predicates", "d3", "d3-array", "d3-geo", "internmap", "d3-axis", "d3-brush", "d3-chord", "d3-color", "d3-contour", "d3-delaunay", "delaunator", "d3-dispatch", "d3-drag", "d3-dsv", "d3-ease", "d3-fetch", "d3-force", "d3-format", "d3-hierarchy", "d3-interpolate", "d3-path", "d3-polygon", "d3-quadtree", "d3-random", "d3-scale", "d3-scale-chromatic", "d3-selection", "d3-shape", "d3-time", "d3-time-format", "d3-timer", "d3-transition", "d3-zoom"]

};
