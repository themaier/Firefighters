declare var google: any;
let map: google.maps.Map | null = null;
const apiKey = import.meta.env.VITE_GMAP_API_KEY;

document.addEventListener("DOMContentLoaded", function () {
  // if (window.location.pathname !== "/about") {
  //   window.history.replaceState({}, "", "/about#live" + window.location.hash);
  // }

  const liveLink = document.getElementById("liveLink");
  const planLink = document.getElementById("planLink");
  const loginLink = document.getElementById("loginLink");
  const pageTitle = document.getElementById("pageTitle");
  const contentDiv = document.getElementById("content");
  const setPumpButton = document.getElementById("setPumpButton");

  if (
    liveLink &&
    planLink &&
    loginLink &&
    pageTitle &&
    contentDiv
    //  &&
    // setPumpButton
  ) {
    liveLink.addEventListener("click", function () {
      loadPage("Live", pageTitle, contentDiv);
    });

    planLink.addEventListener("click", function () {
      loadPage("Plan", pageTitle, contentDiv);
    });

    loginLink.addEventListener("click", function () {
      loadPage("Login", pageTitle, contentDiv);
    });
    setPumpButton.addEventListener("click", function () {
      setMarker(48.411328, 12.947491);
    });
  }
});

function loadPage(
  newPageTitle: string,
  oldPageTitle: HTMLElement,
  contentDiv: HTMLElement
) {
  oldPageTitle.textContent = newPageTitle;
  contentDiv.innerHTML = "";

  if (newPageTitle === "Live" || newPageTitle === "Plan") {
    // Load the Google Maps API script only for Live and Plan pages
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    document.body.appendChild(script);

    // Create a div for the map
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    contentDiv.appendChild(mapDiv);

    // Function to initialize the Google Map
    window.initMap = function () {
      const options = {
        zoom: 11,
        center: { lat: 48.411328, lng: 12.947491 }, // New York coordinates
      };
      map = new google.maps.Map(document.getElementById("map")!, options);
    };
  } else if (newPageTitle === "Login") {
    contentDiv.innerHTML = "<p>Login form goes here.</p>";
  }
  if (newPageTitle === "Live") {
    const setPumpButton = document.createElement("button");
    setPumpButton.id = "setPumpButton";
    setPumpButton.textContent = "Pumpe setzen";
    setPumpButton.style.width = "100px";
    setPumpButton.style.height = "50px";
    contentDiv.appendChild(setPumpButton);
    setPumpButton.addEventListener("click", function () {
      setMarker(48.411328, 12.947491); // Add a marker at this location
    });
  }
}

function setMarker(lat: number, lng: number) {
  if (map) {
    const pos = {
      lat: lat,
      lng: lng,
    };
    new google.maps.Marker({
      position: pos,
      map: map,
    });
    map.setCenter(pos);
  }
}
