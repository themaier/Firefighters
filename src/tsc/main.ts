declare var google: any;
let map: google.maps.Map | null = null;
const apiKey = (import.meta as any).env.VITE_GMAP_API_KEY;

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
  });
  const setPumpButton = document.getElementById("setPumpButton") as HTMLElement;
  setPumpButton.addEventListener("click", function () {
    setMarker(48.411328, 12.947491);
  });

  // Load Plan Page
  planLink.addEventListener("click", () => {
    hideAllPages();
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
  });

  // Load Login Page
  loginLink.addEventListener("click", () => {
    hideAllPages();
    loginPage.style.display = "block";
  });
});

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
