/* slider */
document.addEventListener("DOMContentLoaded", function () {
  function initSlider(sliderSection) {
    const sliderContainer = sliderSection.querySelector(".slider-container");
    const track = sliderContainer.querySelector(".slider-track");
    const slides = track.querySelectorAll(".slide");
    const prevBtn = sliderSection.querySelector(".prev");
    const nextBtn = sliderSection.querySelector(".next");

    let currentIndex = 0;
    const slideCount = slides.length;

    const getVisibleSlides = () => {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 576) return 2;
      return 1;
    };

    function updateSlider() {
      const visibleSlides = getVisibleSlides();
      const slideWidth =
        slides[0].offsetWidth +
        parseInt(getComputedStyle(slides[0]).marginRight);
      const maxIndex = Math.max(slideCount - visibleSlides, 0);

      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex > maxIndex;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateSlider();
      });
    }

    function handleResize() {
      updateSlider();
    }

    updateSlider();

    return handleResize;
  }

  const newProductsSlider = document.querySelector(".new-product");
  const hitsSlider = document.querySelector(".hits");

  const sliders = [newProductsSlider, hitsSlider];
  const resizeCallbacks = [];

  sliders.forEach((slider) => {
    if (slider) {
      const callback = initSlider(slider);
      resizeCallbacks.push(callback);
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCallbacks.forEach((callback) => callback());
    }, 100);
  });
});

/* filter menu */
document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("sortButton");
  const sortMenu = document.getElementById("sortMenu");
  const closeSortMenu = document.getElementById("closeSortMenu");
  const applySort = document.getElementById("applySort");
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  sortButton.addEventListener("click", function () {
    sortMenu.classList.add("active");
    overlay.classList.add("active");
  });

  closeSortMenu.addEventListener("click", function () {
    sortMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  applySort.addEventListener("click", function () {
    const selectedOption = document.querySelector('input[name="sort"]:checked');
    if (selectedOption) {
      console.log("Сортировка по:", selectedOption.value);
    }
    sortMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    sortMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

//dropdown list
const selectedEl = document.querySelectorAll(".select-selected");

selectedEl.forEach((selected) => {
  const item = selected.nextElementSibling;
  selected.addEventListener("click", () => {
    item.classList.toggle("show");
  });

  document,
    addEventListener("click", (event) => {
      if (!selected.contains(event.target) && !item.contains(event.target)) {
        item.classList.remove("show");
      }
    });

  item.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent;
      item.classList.remove("show");
    });
  });
});

