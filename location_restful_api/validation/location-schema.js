module.exports = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 0 },
    latitude: { type: "number", minimum: -90, maximum: 90 },
    longitude: { type: "number", minimum: -180, maximum: 180 },
  },
  required: ["latitude", "longitude"],
  additionalProperties: false,
};
