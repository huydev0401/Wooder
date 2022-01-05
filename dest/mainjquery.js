$(window).on("load", function () {
  // navbar mobile
  let navbar = $(".navbar");
  let navbarMenus = $(".navbar ul li a");
  let btnMenu = $(".btnmenu");
  let header = $("header");
  function closeNav() {
    navbar.removeClass("active");
    btnMenu.removeClass("active");
  }
  btnMenu.on("click", function () {
    navbar.toggleClass("active");
    $(this).toggleClass("active");
  });
  $(window).on("resize", function () {
    if ($(window).innerWidth() > 992) {
      closeNav();
    }
  });
  navbarMenus.on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr("href").replace("#", "");
    let section = $("." + id);
    $(window).scrollTop(section.offset().top - header.innerHeight());
    closeNav();
  });

  //   lang
  let currentLang = $(".lang__current span");
  $(".lang").on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
  });
  $(".lang__option a").on("click", function () {
    let optionContent = $(this).text();
    let currentContent = currentLang.text();
    $(this).html(currentContent);
    currentLang.html(optionContent);
  });

  //   back to top
  $(".backtotop").on("click", function () {
    $(window).scrollTop(0);
  });

  // New
  let btnNews = $(".new__btns .btn");
  btnNews.on("click", function () {
    $(this).addClass("is-selected").siblings().removeClass("is-selected");
    $(".new__list")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // popup video
  let videoPlay = $(".quality__circle");
  let designPlay = $(".design .btn");
  let videoModal = $(".video__modal");
  let videoIframe = $(".video__modal iframe");

  function closeVideo() {
    videoIframe.attr("src", "");
    videoModal.removeClass("active");
  }
  function createVideo() {
    let id = $(this).attr("data-video-id");
    videoIframe.attr("src", `https://www.youtube.com/embed/${id}?autoplay=1`);
    videoModal.addClass("active");
  }

  designPlay.on("click", createVideo);
  videoPlay.on("click", createVideo);
  $(".video__close").on("click", closeVideo);
  videoModal.on("click", closeVideo);

  // change header background
  let slider = $(".slider");
  function changeHeaderBg() {
    let scrollY = $(window).scrollTop();
    if (scrollY > slider.innerHeight() - header.innerHeight()) {
      header.addClass("active");
    } else {
      header.removeClass("active");
    }
  }
  $(window).on("scroll", changeHeaderBg);

  // active section
  let menus = $("header .menu a");
  let sections = [];
  let headerHeight = $("header").outerHeight();
  function removeActive() {
    $.each(menus, function () {
      $(this).removeClass("active");
    });
  }

  $.each(menus, function () {
    let id = $(this).attr("href").replace("#", "");
    let section = $("." + id);
    sections.push(section);
    $(this).on("click", function (e) {
      e.preventDefault();
      $(window).scrollTop(section.offset().top - headerHeight + 1);
      removeActive();
      $(this).addClass("active");
    });
  });

  $(window).on("scroll", function () {
    let scrollHeight = $(window).scrollTop();
    $.each(sections, function (index, section) {
      if (
        scrollHeight > $(this).offset().top - headerHeight &&
        scrollHeight < $(this).offset().top + $(this).outerHeight()
      ) {
        removeActive();
        menus.eq(index).addClass("active");
      } else {
        menus.eq(index).removeClass("active");
      }
    });
  });

  // slider
  let $carousel = $(".slider__list");
  $carousel.flickity({
    // options
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: true,
    lazyLoad: true,
    on: {
      ready: function () {
        let dotted = $(".flickity-page-dots");
        paging = $(".paging .dots");
        dotted.appendTo(paging);
      },
      change: function (index) {
        let number = $(".slider__bottom .number");
        let indexPage = index + 1;
        number.text(indexPage.toString().padStart(2, 0));
      },
    },
  });

  // slider drag
  let $sliderDrag = $(".sliderdrag__list").flickity({
    freeScroll: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    lazyLoad: 4,
  });

  let $progressBar = $(".progress-bar");

  $sliderDrag.on("scroll.flickity", function (event, progress) {
    progress = Math.max(0.05, Math.min(1, progress));
    $progressBar.width(progress * 100 + "%");
  });

  // prev next button
  $(".--prev").on("click", function () {
    $carousel.flickity("previous");
  });
  $(".--next").on("click", function () {
    $carousel.flickity("next");
  });

  // progress bar
  let body = $(document.body).outerHeight();
  let vh = $(window).outerHeight();
  $(window).on("scroll", function () {
    let scrollY = $(window).scrollTop();
    $(".progressbar").width((scrollY / (body - vh)) * 100 + "%");
  });

  // photo swipe
  var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;
      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0]; // <a> element
        size = linkEl.getAttribute("data-size").split("x");
        item = {
          src: linkEl.getAttribute("href"),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10),
        };
        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute("src");
        }
        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }
      return items;
    };
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function (el) {
        return el.tagName && el.tagName.toUpperCase() === "FIGURE";
      });
      if (!clickedListItem) {
        return;
      }
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;
      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }
        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
    var photoswipeParseHash = function () {
      var hash = window.location.hash.substring(1),
        params = {};
      if (hash.length < 5) {
        return params;
      }
      var vars = hash.split("&");
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split("=");
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };
    var openPhotoSwipe = function (
      index,
      galleryElement,
      disableAnimation,
      fromURL
    ) {
      var pswpElement = document.querySelectorAll(".pswp")[0],
        gallery,
        options,
        items;
      items = parseThumbnailElements(galleryElement);
      options = {
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),
        getThumbBoundsFn: function (index) {
          var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
            pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
      };
      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }
      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute("data-pswp-uid", i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(
        hashData.pid,
        galleryElements[hashData.gid - 1],
        true,
        true
      );
    }
  };

  initPhotoSwipeFromDOM(".gallery__list");
});
