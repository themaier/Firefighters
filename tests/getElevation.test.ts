const mainFunctions = require("../src/ts/main");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            dataset: "eudem25m",
            elevation: 385.4680480957031,
            location: {
              lat: 48.411328,
              lng: 12.947491,
            },
          },
        ],
        status: "OK",
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("takes lat and lng and gets elevation", async () => {
  let lat = 48.411328;
  let lng = 12.947491;
  const elevation = await mainFunctions.getElevation(lat, lng);

  expect(elevation).toEqual(385.4680480957031);
});
