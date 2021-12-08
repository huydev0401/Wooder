window.addEventListener("load", () => {
  const header = document.querySelector("header");
  const slider = document.querySelector(".slider");
  const sliderHeight = slider.offsetHeight;
  let headerHeight = 0;
  // header background
  function changeBgHeader() {
    let scrollY = window.pageYOffset;
    headerHeight = header.offsetHeight;
    if (scrollY > sliderHeight - headerHeight) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }

  document.addEventListener("scroll", changeBgHeader);

  // navbar
  const btnMenu = document.querySelector(".btnmenu");
  const nav = document.querySelector(".navbar");
  const navmenus = document.querySelectorAll(".navbar ul a");

  function removeNav() {
    btnMenu.classList.remove("active");
    nav.classList.remove("active");
  }

  navmenus.forEach(function (item) {
    let classSession = item.getAttribute("href").replace("#", "");
    let session = document.querySelector("." + classSession);
    item.addEventListener("click", function (e) {
      e.preventDefault();
      removeNav();
      window.scrollTo({
        top: session.offsetTop - header.offsetHeight + 1,
        behavior: "smooth",
      });
    });
  });

  btnMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  window.addEventListener("resize", function (e) {
    if (this.innerWidth > 970) {
      removeNav();
    }
  });

  // back to top
  const backToTop = document.querySelector(".backtotop");
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // lang
  const lang = document.querySelector(".lang");
  const langCurrent = document.querySelector(".lang__current span");
  const langItem = document.querySelectorAll(".lang .lang__option a");

  lang.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
  });

  langItem.forEach((item) =>
    item.addEventListener("click", function () {
      let itemContent = this.textContent;
      let langCurrentContent = langCurrent.textContent;
      langCurrent.innerHTML = itemContent;
      this.innerHTML = langCurrentContent;
    })
  );

  document.addEventListener("click", function () {
    lang.classList.remove("active");
  });

  // popup video
  const videoPlay = document.querySelectorAll(".quality__circle");
  const videoClose = document.querySelector(".video__close");
  const videoModal = document.querySelector(".video__modal");
  const videoIframe = document.querySelector(".video__modal iframe");

  function closeVideo() {
    videoIframe.setAttribute("src", "");
    videoModal.classList.remove("active");
  }

  videoPlay.forEach((item) =>
    item.addEventListener("click", function () {
      let videoId = this.getAttribute("data-video-id");
      videoIframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${videoId}?autoplay=1`
      );
      videoModal.classList.add("active");
    })
  );

  videoClose.addEventListener("click", function () {
    closeVideo();
  });

  videoModal.addEventListener("click", function () {
    closeVideo();
  });

  // active section
  const menus = document.querySelectorAll("header .menu a");
  let sessions = [];
  function removeActiveMenu() {
    menus.forEach(function (item) {
      item.classList.remove("active");
    });
  }

  menus.forEach(function (item) {
    let classSession = item.getAttribute("href").replace("#", "");
    let session = document.querySelector("." + classSession);
    sessions.push(session);
    item.addEventListener("click", function (e) {
      e.preventDefault();
      removeActiveMenu();
      item.classList.add("active");
      window.scrollTo({
        top: session.offsetTop - header.offsetHeight + 1,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    sessions.forEach(function (item, index) {
      if (
        scrollHeight > item.offsetTop - header.offsetHeight &&
        scrollHeight < item.offsetTop + item.offsetHeight
      ) {
        removeActiveMenu();
        menus[index].classList.add("active");
      } else {
        menus[index].classList.remove("active");
      }
    });
  });

  // slider
  const sliderItem = document.querySelectorAll(".slider__item");
  const number = document.querySelector(".paging .number");
  const dots = document.querySelectorAll(".dots .dot");
  let currentSlider = 0;

  sliderItem.forEach(function (item, index) {
    if (item.classList.contains("active")) {
      currentSlider = index;
    }
  });
  function showNumber(index) {
    number.innerHTML = (index + 1).toString().padStart(2, "0");
  }
  showNumber(currentSlider);
  dots[currentSlider].classList.add("active");

  function goTo(index) {
    sliderItem[currentSlider].classList.remove("active");
    sliderItem[index].classList.add("active");
    dots[currentSlider].classList.remove("active");
    dots[index].classList.add("active");
    currentSlider = index;
    showNumber(index);
  }

  document
    .querySelector(".control__btn.--next")
    .addEventListener("click", function () {
      if (currentSlider < sliderItem.length - 1) {
        goTo(currentSlider + 1);
      } else {
        goTo(0);
      }
    });

  document
    .querySelector(".control__btn.--prev")
    .addEventListener("click", function () {
      if (currentSlider > 0) {
        goTo(currentSlider - 1);
      } else {
        goTo(sliderItem.length - 1);
      }
    });

  dots.forEach(function (item, index) {
    item.addEventListener("click", function () {
      goTo(index);
    });
  });

  // news
  const newBtn = document.querySelectorAll(".new__btns .btn");
  const newList = document.querySelectorAll(".new__list");

  newBtn.forEach(function (item, index) {
    item.addEventListener("click", function () {
      let Id = index + 1;
      newBtn.forEach(function (item) {
        item.classList.remove("active");
      });
      newList.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
      document.querySelector(".new__list" + Id).classList.add("active");
    });
  });

  // accordion
  const accBtn = document.querySelectorAll(".accordion");

  accBtn.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // progress bar
  // scrollHeight - clientHeight = height
  const progressBar = document.querySelector(".progressbar");
  window.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    console.log((scrollY / height) * 100);
    progressBar.style.width = (scrollY / height) * 100 + "%";
  });
});
