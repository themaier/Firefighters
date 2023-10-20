let markers: google.maps.Marker = [];
declare var google: any;
let map: google.maps.Map | null = null;
const apiKey = (import.meta as any).env.VITE_GMAP_API_KEY;

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/pumps") {
    window.history.replaceState({}, "", "/pumps#plan" + window.location.hash);
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
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  document.body.appendChild(script);
  (window as any).initMap = function () {
    const options = {
      zoom: 11,
      center: { lat: 48.411328, lng: 12.947491 }, // New York coordinates
    };
    map = new google.maps.Map(livePage.querySelector("#map")!, options);
  };
}

function handlePlanPage(planPage: HTMLElement) {
  planPage.style.display = "block";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
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
  getElevation(lat, lng).then((elevation) => {
    markers.push({ marker: marker, elevation: elevation });
  });
  map.setCenter(pos);
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
