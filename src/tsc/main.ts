// Function to load content based on route
function navigate(path: string): void {
    let content: string = "";
  
    switch (path) {
      case "/":
        content = "<h1>Home Page</h1>";
        break;
      case "/about":
        content = "<h1>About Page</h1>";
        break;
      case "/contact":
        content = "<h1>Contact Page</h1>";
        break;
      default:
        content = "<h1>404 Not Found</h1>";
    }
  
    document.getElementById("app")!.innerHTML = content;
  }
  
  // Initial navigation
  navigate(window.location.pathname);
  
  // Click event listener for links
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
  
    if (target.matches("[data-link]")) {
      e.preventDefault();
      const href = (target as HTMLAnchorElement).href;
      history.pushState(null, "", href);
      navigate(window.location.pathname);
    }
  });
  
  // Listen to back/forward navigation
  window.addEventListener("popstate", () => {
    navigate(window.location.pathname);
  });