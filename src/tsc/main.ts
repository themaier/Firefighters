const apiKey = import.meta.env.VITE_GMAP_API_KEY;

document.addEventListener("DOMContentLoaded", function () {
    const liveLink = document.getElementById("liveLink");
    const planLink = document.getElementById("planLink");
    const loginLink = document.getElementById("loginLink");
    const pageTitle = document.getElementById("pageTitle");
    const contentDiv = document.getElementById("content");

    if (liveLink && planLink && loginLink && pageTitle && contentDiv) {
        liveLink.addEventListener("click", function () {
        loadPage("Live", pageTitle, contentDiv);
        });

        planLink.addEventListener("click", function () {
        loadPage("Plan", pageTitle, contentDiv);
        });

        loginLink.addEventListener("click", function () {
        loadPage("Login", pageTitle, contentDiv);
        });
    }
});
function loadPage(pageName: string, pageTitle: HTMLElement, contentDiv: HTMLElement) {
    // Update the page title
    pageTitle.textContent = pageName;
  
    // Clear previous content
    contentDiv.innerHTML = "";
  
    if (pageName === "Live" || pageName === "Plan") {
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
          center: { lat: 48.411328, lng: 12.947491 } // New York coordinates
        };
        const map = new google.maps.Map(document.getElementById("map")!, options);
      };
    }
    else if (pageName === "Login") {
      // Show the login form or whatever you want for the Login page
      contentDiv.innerHTML = "<p>Login form goes here.</p>";
    }
  }
