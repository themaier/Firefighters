let markers: google.maps.Marker = [];
declare var google: any;
let map: google.maps.Map | null = null;
// const apiKey = (import.meta as any).env.VITE_GMAP_API_KEY;
const apiKeyPart1: String = "AIzaSyA9Ydqm";
const apiKeyPart3: String = "6N93WVejGoeOvI";

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/Firefighters") {
    window.history.replaceState({}, "", "/Firefighters#plan" + window.location.hash);
  }

  const livePage = document.getElementById("livePage") as HTMLElement;
  const planPage = document.getElementById("planPage") as HTMLElement;
  const groupPage = document.getElementById("groupPage") as HTMLElement;

  const liveLink = document.getElementById("liveLink") as HTMLElement;
  const planLink = document.getElementById("planLink") as HTMLElement;
  const groupLink = document.getElementById("groupLink") as HTMLElement;

  function hideAllPages() {
    livePage.style.display = "none";
    liveLink.classList.remove("active");
    planPage.style.display = "none";
    planLink.classList.remove("active");
    groupPage.style.display = "none";
    groupLink.classList.remove("active");
  }

  // Load Live Page
  liveLink.addEventListener("click", () => {
    hideAllPages();
    handleLivePage(livePage);
    liveLink.classList.add("active");
  });

  // Load Plan Page
  planLink.addEventListener("click", () => {
    hideAllPages();
    handlePlanPage(planPage);
    planLink.classList.add("active");
  });

  // Load Group Page
  groupLink.addEventListener("click", () => {
    hideAllPages();
    groupPage.style.display = "block";
    groupLink.classList.add("active");
  });

  var closeBut = document.getElementsByClassName("close")[0] as HTMLElement,
    modal = document.getElementsByClassName("modal-cont")[0] as HTMLElement,
    cancelBut = document.getElementsByClassName("cancel")[0] as HTMLElement,
    loginBut = document.getElementsByClassName("login")[0] as HTMLElement;

  //close
  function x() {
    modal.style.display = "none";
  }
  closeBut.onclick = x;
  cancelBut.onclick = x;

  loginBut.onclick = function () {
    modal.style.display = "block";
  };

  window.onclick = function (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.className === "modal-cont") {
      target.style.display = "none";
    }
  };
});

window.addEventListener("load", function () {
  // Automatically click the "planLink" when the page loads
  const planLink = document.getElementById("planLink") as HTMLElement;
  planLink.click();
});

function handleLivePage(livePage: HTMLElement) {
  livePage.style.display = "block";
  const script = document.createElement("script");
  script.type = "text/javascript";
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeyPart1}83q87JgAf0Y8S${apiKeyPart3}&callback=initMap`;
  document.body.appendChild(script);
  (window as any).initMap = function () {
    const options = {
      zoom: 11,
      center: { lat: 48.411328, lng: 12.947491 }, // New York coordinates
    };
    map = new google.maps.Map(livePage.querySelector("#map")!, options);
  };
  console.log("Hello1.");
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("Latitude is :" + latitude + " Longitude is :" + longitude);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
  console.log("Hello Live.");
}

function handlePlanPage(planPage: HTMLElement) {
  planPage.style.display = "block";
  const script = document.createElement("script");
  script.type = "text/javascript";
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeyPart1}83q87JgAf0Y8S${apiKeyPart3}&callback=initMap`;
  document.body.appendChild(script);
  (window as any).initMap = function () {
    const options = {
      zoom: 13,
      center: { lat: 48.411328, lng: 12.947491 },
    };
    map = new google.maps.Map(planPage.querySelector("#map")!, options);
  };

  const setPumpButton = document.getElementById("setPumpButton") as HTMLElement;
  setPumpButton.addEventListener("click", function () {
    const center: google.maps.LatLng = map.getCenter();
    setMarker(center.lat(), center.lng());
  });

  const deletePumpButton = document.getElementById("deletePumpButton") as HTMLElement;
  deletePumpButton.addEventListener("click", function () {
    if (markers.length > 0) {
      const lastMarker = markers.pop().marker;
      lastMarker.setMap(null);
    }
  });

  const getElevationButton = document.getElementById("getElevationButton") as HTMLElement;
  getElevationButton.addEventListener("click", function () {
    const textContainer = document.getElementById("elevationTextContainer") as HTMLElement;
    const center: google.maps.LatLng = map.getCenter();
    getElevation(center.lat(), center.lng()).then((elevation) => {
      const difference = (elevation - markers[markers.length - 1].elevation).toFixed(1);
      textContainer.textContent = String(difference) + "m";
    });
  });
  const getDistanceButton = document.getElementById("getDistanceButton") as HTMLElement;
  getDistanceButton.addEventListener("click", function () {
    const distanceTextContainer = document.getElementById("distanceTextContainer") as HTMLElement;
    if (markers.length > 0) {
      var marker = markers[markers.length - 1].marker;
      var lat1 = marker.getPosition().lat();
      var lng1 = marker.getPosition().lng();
      const center: google.maps.LatLng = map.getCenter();
      var distance = getDistanceInMeter(lat1, lng1, center.lat(), center.lng());
      distanceTextContainer.textContent = String(distance) + "m";
    } else {
      distanceTextContainer.textContent = "0m";
    }
  });
}

function setMarker(lat: number, lng: number) {
  const pos = {
    lat: lat,
    lng: lng,
  };
  getElevation(lat, lng).then((elevation) => {
    let text;
    if (markers.length > 0) {
      var marker1 = markers[markers.length - 1].marker;
      var lat11 = marker1.getPosition().lat();
      var lng11 = marker1.getPosition().lng();
      const center: google.maps.LatLng = map.getCenter();
      var distance1 = getDistanceInMeter(lat11, lng11, center.lat(), center.lng());
      var elevationDifference = (elevation - markers[markers.length - 1].elevation).toFixed(1);
      text = "H: " + String(elevationDifference) + "m | E: " + String(distance1) + "m";
    } else {
      text = "1";
    }

    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      label: {
        // text: String(markers.length + 1),
        text: text,
        color: "black",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });
    markers.push({ marker: marker, elevation: elevation });
  });
  map.setCenter(pos);
}

function getDistanceInMeter(lat1: number, lng1: number, lat2: number, lng2: number) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return (d * 1000).toFixed(1);
}

async function getElevation(lat: number, lng: number) {
  let elevation = 0;
  try {
    const response = await fetch("https://api.opentopodata.org/v1/eudem25m?locations=" + lat + "," + lng);
    const data = await response.json();

    if (data.results[0].elevation !== null) {
      elevation = data.results[0].elevation;
    } else {
      alert("Elevation data is not available for these coordinates");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return elevation;
}

module.exports = { getDistanceInMeter, getElevation };
