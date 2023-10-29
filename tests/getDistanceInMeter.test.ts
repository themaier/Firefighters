const mainFunctions = require("../src/ts/main");

test("takes two coordinates and meassures distance", () => {
  let lat1 = 48.411328;
  let lng1 = 12.947491;
  let lat2 = 48.406997;
  let lng2 = 12.94749;
  expect(mainFunctions.getDistanceInMeter(lat1, lng1, lat2, lng2)).toBe("481.6");
});
