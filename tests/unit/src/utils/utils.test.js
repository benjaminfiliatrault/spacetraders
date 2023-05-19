const { describe, it } = require('node:test');
const assert = require("node:assert");
const { SpaceError } = require("../../../../dist/utils/error");
const { parseWaypoint } = require("../../../../dist/utils/utils");

describe("#parseWaypoint", () => {
  it("Should parse the waypoint correctly", () => {
    const waypoint = "sector-system-rest";

    const res = parseWaypoint(waypoint);

    assert.deepEqual(res, {
      sector: "sector",
      system: "sector-system",
      waypoint,
    });
  });

  it("Should handle wrong waypoint", () => {
    const waypoint = "WRONG";
    const expectedError = new SpaceError({ message: "Waypoint invalid" })
    assert.throws(() => parseWaypoint(waypoint), expectedError);
  });
});
