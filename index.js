document.addEventListener('DOMContentLoaded', function() {
  page.init();
  scroll.hideArrowElem();
});

var page = {
  init: function() {
    popup.bindEvents();
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('click', this.getCurrentElem);
  },

  getCurrentElem: function(e) {
    var elem = e.target.closest('.device-info-card');
    var popupType;
    if (elem) {
      popupType = elem.getAttribute('data-device-type');
      popup.createPopupElem(elem, popupType);
    }
  }
};

var popup = {
  bindEvents: function() {
    var popupWrap = document.querySelector('.popup-wrapper');
    var background = document.querySelector('.popup-background');
    var page = document.querySelector('.page');
    var closePopupButton = document.querySelector('.popup-button__close-button');

    closePopupButton.addEventListener('click', this.hidePopup.bind(this, popupWrap, background, page));
  },

  createPopupElem: function(elem, popupType) {
    var elem = elem;
    var deviceName = elem.querySelector('.device-info-card__device-name').innerHTML;
    var deviceState = elem.querySelector('.device-info-card__divice-state').innerHTML;
    var popupWrap = document.querySelector('.popup-wrapper');
    var background = document.querySelector('.popup-background');
    var page = document.querySelector('.page');
   
    popupArr = document.querySelectorAll('.popup');

    popupArr.forEach(function(v) {
      v.style.display = 'none';

      if (v.dataset.popupType === popupType) {
        v.style.display = 'block';
        v.querySelector('.popup-text-info__title').innerHTML = deviceName;
        v.querySelector('.popup-text-info__state').innerHTML = deviceState;
      }
    });

    background.style.display = 'block';
    page.style.filter = 'blur(4px)';

    popupWrap.classList.add('show');
    popupWrap.classList.remove('hide');

    popupWrap.style.display = 'block';

    document.body.appendChild(popupWrap);
    popupMoveSelector.init(popupWrap, popupType);
  },

  hidePopup: function(popupWrap, background, page,e) {
    popupWrap.classList.add('hide');
    popupWrap.classList.remove('show');
    background.style.display = 'none';
    page.style.filter = 'none';
  }
};

var popupMoveSelector = {

  init: function(popupWrap, popupType) {

    this.container = popupWrap.querySelector('.popup__' + popupType + '-selector');
    this.circle = this.container.querySelector('.selection-circle');

    this.circle.addEventListener('touchstart', this.onTouchStart.bind(this, popupWrap, popupType ));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));

    this.circle.addEventListener('mousedown', this.onTouchStart.bind(this, popupWrap, popupType ));
    document.addEventListener('mousemove', this.onTouchMove.bind(this));
    document.addEventListener('mouseup', this.onTouchEnd.bind(this));
  },

  onTouchStart: function(popupWrap, popupType, e){
    this.isTouching = true;
    this.containerCoordinates = this.getCoordinates(this.container);
  },

  onTouchMove: function(e) {
    var newCoord;
    var rightBorder;
    var bottomBorder;

    if (!this.isTouching) {
      return;
    }
    
    if (this.container.offsetWidth > this.container.offsetHeight){
      
      newCoord = this.positionHendler(e).posX -  this.containerCoordinates.left;
      
      if (newCoord < 0) {
        newCoord = 0;
      }
  
      rightBorder = this.container.offsetWidth - this.circle.offsetWidth;

      if (newCoord > rightBorder) {
        newCoord = rightBorder;
      }
      
      this.circle.style.left = newCoord + 'px';
    } else {

      newCoord = this.positionHendler(e).posY - this.containerCoordinates.top;

      if (newCoord < 0) {
        newCoord = 0 - this.circle.offsetHeight;
      }


      bottomBorder = this.container.offsetHeight - this.circle.offsetHeight;

      if (newCoord > bottomBorder) {
        newCoord = bottomBorder - this.circle.offsetHeight;
      }
      
      this.circle.style.top = newCoord + 'px';
    }
  },

  onTouchEnd: function(){
    this.isTouching = false;
  },

  positionHendler: function (e){
    if ((e.clientX) && (e.clientY)) {
     
      posX = e.clientX;
      posY = e.clientY;
      
      } else if (e.targetTouches) {
      posX = e.targetTouches[0].clientX;
      posY = e.targetTouches[0].clientY;
      e.preventDefault();
      }
     
      return{
        posX : posX,
        posY: posY
      }
  },

  getCoordinates: function(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

};

var scroll = {
  hideArrowElem: function() {
    var container = document.querySelector('.cards-container__scrolling');
    var showMoreElem = document.querySelector('.show-more-cards');

    container.addEventListener('scroll', function() {
      showMoreElem.style.display = 'none';
    });
  }
};
