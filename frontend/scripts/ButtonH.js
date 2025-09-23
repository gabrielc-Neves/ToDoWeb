document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});