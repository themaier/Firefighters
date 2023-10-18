// Function to load content based on route
function navigate(path: string): void {
    let content: string = "";
  
    switch (path) {
      case "/live":
        content = "<h1>Live</h1>";
        break;
      case "/plan":
        content = "<h1>Plan</h1>";
        break;
      case "/login":
        content = "<h1>Login</h1>";
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