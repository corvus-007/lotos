document.addEventListener('DOMContentLoaded', function() {
  var baseTemplateSlider = '<div class="fancybox-container" role="dialog" tabindex="-1">' +
    '<div class="fancybox-bg"></div>' +
    '<div class="fancybox-controls">' +
    '<div class="fancybox-infobar">' +
    '<div class="fancybox-infobar__body">' +
    '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
    '</div>' +
    '</div>' +
    '<div class="fancybox-buttons">' +
    '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Close (Esc)"></button>' +
    '</div>' +
    '</div>' +
    '<div class="fancybox-slider-wrap">' +
    '<div class="fancybox-slider"></div>' +
    '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Previous"></button>' +
    '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Next"></button>' +
    '</div>' +
    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
    '</div>';

  // Выровнять элементы по высоте.
  // elements - строка селектора, напр. '.element'
  function setMaxHeight(elements) {
    var maxHeight = 0;

    if (!elements.length) {
      return;
    }

    Array.prototype.forEach.call(elements, function findMaxHeight(element) {
      maxHeight = (maxHeight > element.clientHeight) ? maxHeight : element.clientHeight;
    });

    Array.prototype.forEach.call(elements, function specifyMaxHeight(element) {
      element.style.height = maxHeight + 'px';
    });
  }
  /*================================
  =            Main nav            =
  ================================*/

  var navbar = document.querySelector('.navbar');
  var mainNav = document.querySelector('.main-nav');
  var toggleMenu = document.querySelector('.main-nav__toggle');
  var windowPos = 0;
  var windowHeight = document.documentElement.clientHeight;
  var docHeight = $(document).height();
  var aArray = $(mainNav).find('a[href^="#"]').map(function(index, elem) {
    if (this.hash) {
      return this.hash;
    }
  });
  var aArrayLenght = aArray.length;
  var theID = '';
  var divPos = 0;
  var divHeight = 0;

  mainNav.classList.remove('main-nav--no-js');

  $(".main-nav__item--booking a").fancybox({
    // Options will go here
  });

  if (toggleMenu) {
    toggleMenu.addEventListener('click', function(event) {
      event.preventDefault();
      mainNav.classList.toggle('main-nav--closed');
      toggleMenu.classList.toggle('is-active');
    });
  }

  $(navbar).sticky({
    zIndex: 20
  });

  /*=====  End of Main nav  ======*/


  setMaxHeight(document.querySelectorAll('.about-tabs__pane'));

  $('.js-tabs').tabslet();

  $('.js-gallery-tabs').tabslet();
  $('.js-gallery-tabs').on('_after', function() {
    $('.gallery-slider:visible').slick('refresh');
  });

  var partnersSlider = document.querySelector('.partners-slider');

  if (partnersSlider) {
    $(partnersSlider).slick({
      autoplay: false,
      accessibility: false,
      slidesToShow: 5,
      // variableWidth: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
        }
      }]
    });
  }

  $('.gallery-slider').slick({
    accessibility: false,
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1290,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });

  $('.gallery [data-fancybox]').fancybox({
    loop: false,
    baseClass: 'base-gallery',
    baseTpl: baseTemplateSlider,
    afterMove: function(instance, slide) {
      $('.gallery-slider:visible').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  $('.features [data-fancybox]').fancybox({
    baseClass: 'base-gallery',
    baseTpl: baseTemplateSlider,
  });

  $('.reviews-slider').slick({
    accessibility: false,
    dots: true,
    adaptiveHeight: true,
    infinite: false,
    responsive: [{
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }]
  });

  $('.team-slider').on('init', function(event, instance) {
    var teamItem = document.querySelector('.team__item');
    var heightTeamInfo = parseFloat(teamItem.querySelector('.team__info').offsetHeight);
    var teamItemPadBottom = parseFloat(getComputedStyle(teamItem).paddingBottom);
    var endBgTeamGallery = `${heightTeamInfo + teamItemPadBottom}px`;
    document.querySelector('.team-slider-wrapper__bg').style.setProperty('bottom', endBgTeamGallery);
    if (instance.$nextArrow) {
      instance.$nextArrow.add(instance.$prevArrow).css('bottom', parseFloat(endBgTeamGallery) - instance.$nextArrow.height() / 2);
    }
  });

  $('.team-slider').slick({
    accessibility: false,
    appendArrows: '.team-slider-wrapper',
    adaptiveHeight: true,
    infinite: false,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 677,
      settings: {
        slidesToShow: 2,
        // slidesToScroll: 1,
        arrows: false,
        // centerMode: true
      }
    }, {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        // slidesToScroll: 1,
        arrows: false,
        centerMode: true
      }
    }]
  });


  $('.certs-slider').slick({
    accessibility: false,
    dots: true,
    arrows: false,
    slidesToShow: 5,
    infinite: false,
    // centerMode: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false,
        centerMode: true
      }
    }]
  });

  $('.certs [data-fancybox]').fancybox({
    baseClass: 'base-gallery',
    baseTpl: baseTemplateSlider,
  });


  /*=================================
  =            Accordion            =
  =================================*/

  var $accordion = $('.js-accordion');

  if ($accordion.length) {
    $accordion.find('dd').hide();
    $accordion.on('click', 'dt', function(event) {
      event.preventDefault();

      $accordion
        .find('dt')
        .not($(this))
        .removeClass('is-opened')
        .next('dd')
        .slideUp();

      if (!$(this).hasClass('is-opened')) {
        $(this).addClass('is-opened');
        $(this).next('dd').stop().slideDown();
      } else {
        $(this).removeClass('is-opened');
        $(this).next('dd').stop().slideUp();
      }
    });
  }

  /*=====  End of Accordion  ======*/


  /*==================================
  =            Input mask            =
  ==================================*/

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*=====  End of Input mask  ======*/

  var locationMap = document.querySelector('#location-map');

  if (locationMap) {
    isContatcsPage = locationMap.classList.contains('contacts__map');
    loadMapScript();
  }
});

var isContatcsPage = null;

// Загрузка карты
function loadMapScript() {
  var script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyC9a_UDjprd--E33HE4d9_S6I0yjvViR8o&callback=initializeMap";
  document.head.appendChild(script);
}

// Инициализация карты
function initializeMap() {
  var centerMap = null;
  var locationOffice = {
    lat: 53.305469,
    lng: 34.303716
  };

  if (isContatcsPage) {
    centerMap = {
      lat: 53.305469,
      lng: 34.3
    };
  } else {
    centerMap = {
      lat: 53.305469,
      lng: 34.308908
    };
  }

  centerMap = (window.matchMedia("(min-width: 768px)").matches) ? centerMap : locationOffice;

  function createProp(defaultLocation) {
    return {
      center: centerMap,
      zoom: 16,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
    };
  }

  var mapProp = createProp(locationOffice);
  var map = new google.maps.Map(document.getElementById("location-map"), mapProp);
  var ICONPATH = (location.hostname === 'localhost') ? './images/location-pin.svg' : 'http://lotos32.ru/wp-content/themes/lotos/images/location-pin.svg';
  var marker = new google.maps.Marker({
    position: locationOffice,
    map: map,
    title: '«ЛОТОС» — клиника семейной стоматологии',
    icon: {
      url: ICONPATH,
      scale: 1
    }
  });
}
