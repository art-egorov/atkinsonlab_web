window.addEventListener("load", function () {
    const element = document.getElementById(element_id);
    const navbar = document.getElementById("topnavbar");
    const navbarHeight = navbar.offsetHeight;
    const elementRect = element.getBoundingClientRect();
    const offset = navbarHeight; // Offset in pixels
    window.scrollTo({top: elementRect.top - offset});
});
