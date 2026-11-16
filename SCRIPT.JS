// SELECT ELEMENTS
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const dropdownButton = document.querySelector(".nav-drop-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const toast = document.querySelector(".toast");

// TOAST MESSAGE
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// MOBILE NAVIGATION
menuToggle.addEventListener("click", () => {

  const opened = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(opened));

  menuToggle.textContent = opened ? "✕" : "☰";

});

// PAGES DROPDOWN
dropdownButton.addEventListener("click", () => {

  const opened = dropdownMenu.classList.toggle("show");

  dropdownButton.setAttribute("aria-expanded", String(opened));

});

// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
document.addEventListener("click", (event) => {

  if (!event.target.closest(".nav-dropdown")) {

    dropdownMenu.classList.remove("show");

    dropdownButton.setAttribute("aria-expanded", "false");

  }

});

// CLOSE MOBILE MENU AFTER CLICKING A LINK
document.querySelectorAll(".main-nav a, .dropdown-menu a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";

  });

});

// FOOD MENU FILTER
document.querySelectorAll(".tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach(item => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    const filter = tab.dataset.filter;

    document.querySelectorAll(".menu-item").forEach(item => {

      item.classList.toggle(
        "hidden",
        filter !== "all" && item.dataset.category !== filter
      );

    });

  });

});

// FAVORITE BUTTONS
document.querySelectorAll(".heart").forEach(button => {

  button.addEventListener("click", () => {

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

      showToast("Added to your favorites ♥");

    } else {

      showToast("Removed from favorites");

    }

  });

});

// SUBSCRIBE FORM
const subscribeForm = document.querySelector(".subscribe");

subscribeForm.addEventListener("submit", event => {

  event.preventDefault();

  const email = subscribeForm.querySelector("input[type=email]");

  document.querySelector(".form-message").textContent =
    `Thank you! ${email.value} has been added.`;

  subscribeForm.reset();

});

// HERO SLIDES
const heroSlides = [

  {
    title: 'Enjoy Our Delicious<br><em>Food</em> &amp; Tasty Meals',
    text: 'Fresh ingredients, delicious recipes and a little love in every bite.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85'
  },

  {
    title: 'Taste The Best<br><em>Fresh</em> Food Today',
    text: 'Discover your new favourite meal, prepared fresh every day.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85'
  },

  {
    title: 'Good Food, Great<br><em>Moments</em> Together',
    text: 'From our kitchen to your table — enjoy every delicious moment.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85'
  }

];

let currentSlide = 0;

// CHANGE HERO SLIDE
function setSlide(index) {

  currentSlide = (index + heroSlides.length) % heroSlides.length;

  const slide = heroSlides[currentSlide];

  document.querySelector(".hero-copy h1").innerHTML = slide.title;

  document.querySelector(".hero-copy p").textContent = slide.text;

  document.querySelector(".hero-food img").src = slide.image;

  document.querySelectorAll(".hero-dots span").forEach((dot, i) => {

    dot.classList.toggle("active", i === currentSlide);

  });

}

// PREVIOUS SLIDE
document.querySelector(".hero-arrow.prev").addEventListener("click", () => {

  setSlide(currentSlide - 1);

});

// NEXT SLIDE
document.querySelector(".hero-arrow.next").addEventListener("click", () => {

  setSlide(currentSlide + 1);

});

// CLICK HERO DOTS
document.querySelectorAll(".hero-dots span").forEach((dot, i) => {

  dot.addEventListener("click", () => {

    setSlide(i);

  });

});

// IMAGE FALLBACK
// Haddii sawir gaar ah uusan soo bixin, sawir kale ayaa lagu beddelayaa.
document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", () => {

    if (img.dataset.fallbackUsed) return;

    img.dataset.fallbackUsed = "true";

    img.src =
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80";

  });

});