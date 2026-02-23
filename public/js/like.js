document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = btn.getAttribute("data-product-id");

      // Toggle the liked class
      btn.classList.toggle("liked");

      // Change the SVG stroke color
      const svg = btn.querySelector("svg path");
      if (btn.classList.contains("liked")) {
        svg.setAttribute("stroke", "#ef4444"); // red for liked
        console.log(`Product ${productId} liked!`);
      } else {
        svg.setAttribute("stroke", "#000000"); // black for unliked
        console.log(`Product ${productId} unliked!`);
      }
    });
  });
});
