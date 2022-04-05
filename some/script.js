let slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

let dotsBlock = document.querySelector(".dots-block");
let slides = document.querySelectorAll(".slide");

for (let i = 0; i < slides.length; i++) {
  let dot = document.createElement("div");
  dot.classList.add("dot");
  dotsBlock.append(dot);
  dot.addEventListener("click", () => {});
}

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add("loaded");

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function () {
    shiftSlide(-1);
    activeDot();
  });
  next.addEventListener("click", function () {
    shiftSlide(1);
    activeDot();
  });

  let dot = document.querySelectorAll(".dot");
  // manipulations with dots
  function activeDot() {
    dot.forEach((d, idx) => {
      if (index === idx) {
        d.classList.add("active");
      } else if (index === 5) {
        d.classList.remove("active");
        dot[0].classList.add("active");
      } else if (index === -1) {
        d.classList.remove("active");
        dot[4].classList.add("active");
      } else {
        d.classList.remove("active");
      }
      d.addEventListener("click", function () {
        if (idx > index) {
          shiftSlide(0, "", idx);
          activeDot();
        } else if (idx < index) {
          shiftSlide(2, "", idx);
          activeDot();
        } else return false;
      });
    });
  }

  // Transition events
  items.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action, offset) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      //actions on arrows
      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
      // actions on dots
      else if (dir == 0) {
        items.style.left = 0;
        offset++;
        items.style.left = -400 * offset + "px";
        index = offset - 1;
      } else if (dir == 2) {
        items.style.left = 0;
        offset++;
        items.style.left = -400 * offset + "px";
        index = offset - 1;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }

  activeDot();
}

slide(slider, sliderItems, prev, next);
