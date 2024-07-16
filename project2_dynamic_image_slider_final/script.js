let slideIndex = 1;
let autoSlideTimeout;

showSlides(slideIndex);

function plusSlides(n) {
  clearTimeout(autoSlideTimeout);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(autoSlideTimeout);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let backgrounds = [
    "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)",
    "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
    "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)"
  ];

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  // Set the background based on the current slide
  document.body.style.background = backgrounds[slideIndex - 1];

  // Set current slide as active and fade it in
  slides[slideIndex - 1].classList.add('active');

  // Restart the automatic slide change
  autoSlideTimeout = setTimeout(() => plusSlides(1), 3000); // Change image every 3 seconds
}

// Add event listeners for touch/swipe support
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  const firstTouch = evt.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      plusSlides(1); // swipe left
    } else {
      plusSlides(-1); // swipe right
    }
  }
  xDown = null;
  yDown = null;
}
