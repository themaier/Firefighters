let markers: google.maps.Marker = [];
declare var google: any;
let map: google.maps.Map | null = null;
const apiKey = (import.meta as any).env.VITE_GMAP_API_KEY;

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/pumps") {
    window.history.replaceState({}, "", "/pumps#live" + window.location.hash);
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
  // Automatically click the "liveLink" when the page loads
  const liveLink = document.getElementById("liveLink") as HTMLElement;
  liveLink.click();
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
    const center: google.maps.LatLng = map.getCenter();
    setMarker(center.lat(), center.lng());
  });

  const deletePumpButton = document.getElementById(
    "deletePumpButton"
  ) as HTMLElement;
  deletePumpButton.addEventListener("click", function () {
    if (markers.length > 0) {
      const lastMarker = markers[markers.length - 1];
      lastMarker.setMap(null);
      markers.pop();
      // map.setCenter(markers[markers.length - 1].getPosition());
    }
  });

  const getElevationButton = document.getElementById(
    "getElevationButton"
  ) as HTMLElement;
  getElevationButton.addEventListener("click", function () {
    //   setMarker(48.411328, 12.947491);
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
