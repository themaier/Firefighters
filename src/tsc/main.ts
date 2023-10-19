let markers: google.maps.Marker = [];
declare var google: any;
let map: google.maps.Map | null = null;
const apiKey = (import.meta as any).env.VITE_GMAP_API_KEY;
let counter: number = 0;

document.addEventListener("DOMContentLoaded", function () {
  // if (window.location.pathname !== "/about") {
  //   window.history.replaceState({}, "", "/about#live" + window.location.hash);
  // }

  const livePage = document.getElementById("livePage") as HTMLElement;
  const planPage = document.getElementById("planPage") as HTMLElement;
  const loginPage = document.getElementById("loginPage") as HTMLElement;

  const liveLink = document.getElementById("liveLink") as HTMLElement;
  const planLink = document.getElementById("planLink") as HTMLElement;
  const loginLink = document.getElementById("loginLink") as HTMLElement;

  function hideAllPages() {
    livePage.style.display = "none";
    planPage.style.display = "none";
    loginPage.style.display = "none";
  }

  // Load Live Page
  liveLink.addEventListener("click", () => {
    hideAllPages();
    handleLivePage(livePage);
  });

  // Load Plan Page
  planLink.addEventListener("click", () => {
    hideAllPages();
    handlePlanPage(planPage);
  });

  // Load Login Page
  loginLink.addEventListener("click", () => {
    hideAllPages();
    loginPage.style.display = "block";
  });
});

function handleLivePage(livePage: HTMLElement) {
  livePage.style.display = "block";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  document.body.appendChild(script);
  (window as any).initMap = function () {
    const options = {
      zoom: 11,
      center: { lat: 48.411328, lng: 12.947491 }, // New York coordinates
    };
    map = new google.maps.Map(livePage.querySelector("#map")!, options);
  };

  const setPumpButton = document.getElementById("setPumpButton") as HTMLElement;
  setPumpButton.addEventListener("click", function () {
    setMarker(48.411328, 12.947491 + counter);
    counter += 0.1;
  });

  const deletePumpButton = document.getElementById(
    "deletePumpButton"
  ) as HTMLElement;
  deletePumpButton.addEventListener("click", function () {
    if (markers.length > 0) {
      const lastMarker = markers[markers.length - 1];
      lastMarker.setMap(null);
      markers.pop();
      map.setCenter(markers[markers.length - 1].getPosition());
    }
  });

  const getElevationButton = document.getElementById(
    "getElevationButton"
  ) as HTMLElement;
  getElevationButton.addEventListener("click", function () {
    setMarker(48.411328, 12.947491);
  });
}

function handlePlanPage(planPage: HTMLElement) {
  planPage.style.display = "block";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  document.body.appendChild(script);
  (window as any).initMap = function () {
    const options = {
      zoom: 11,
      center: { lat: 48.411328, lng: 12.947491 }, // New York coordinates
    };
    map = new google.maps.Map(planPage.querySelector("#map")!, options);
  };
}

function setMarker(lat: number, lng: number) {
  const pos = {
    lat: lat,
    lng: lng,
  };
  const marker = new google.maps.Marker({
    position: pos,
    map: map,
    label: {
      text: String(markers.length + 1),
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
    },
  });
  markers.push(marker);
  map.setCenter(pos);
}
