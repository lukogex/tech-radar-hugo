const d3 = require('d3');
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each')
};

const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const MalformedDataError = require('../exceptions/malformedDataError');
const ContentValidator = require('./contentValidator');
const ExceptionMessages = require('./exceptionMessages');

const CSVBuilder = function (url) {
  var self = {};

  self.build = function () {
    d3.csv(url, createBlips);
  }

  var createBlips = function (data) {
    try {
      var columnNames = data['columns'];
      delete data['columns'];
      var contentValidator = new ContentValidator(columnNames);
      contentValidator.verifyContent();
      contentValidator.verifyHeaders();
      var blips = _.map(data, new InputSanitizer().sanitize);
      var validBlips = validateBlips(blips);
      plotRadar('Tech-radar', validBlips);
      loadBuddy();
    } catch (exception) {
      plotErrorMessage(exception);
    }
  }

  // TODO(): Move this to contentValidator.js
  var validateBlips = function (blips) {
    var validBlips = [];
    _.each(blips, function(blip, i) {
      if (blip.name !== "" && blip.quadrant !== "" && blip.ring !== "") {
        validBlips.push(blip);
      }
    });

    return validBlips;
  }

  self.init = function () {
    plotLoading();
    return self;
  };

  return self;
};

const plotRadar = function (title, blips) {
  document.title = title;
  d3.selectAll(".loading").remove();

  var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
  var ringMap = {};
  var maxRings = 4;

  _.each(rings, function (ringName, i) {
    if (i == maxRings) {
      throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
    }
    ringMap[ringName] = new Ring(ringName, i);
  });

  var quadrants = {};
  _.each(blips, function (blip) {
    if (!quadrants[blip.quadrant]) {
      quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
    }
    quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
  });

  var radar = new Radar();
  _.each(quadrants, function (quadrant) {
    radar.addQuadrant(quadrant)
  });

  var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

  new GraphingRadar(size, radar).init().plot();
}

function loadBuddy() {
  if(document.getElementById('pageModals')) {
    const pageModals          = document.getElementById('pageModals'),
    boxModal            = pageModals.getElementsByClassName('box-modal'),
    triggerOpenModal    = document.getElementsByClassName('triggerOpenModal'),
    triggerCloseModal   = document.getElementsByClassName('triggerCloseModal'),
    body                = document.getElementsByTagName('body')[0],
    pageModalsOverlayer = document.getElementById('pageModalsOverlayer');

    const openModal = event => {
      const dataModal = event.currentTarget.getAttribute('data-modal');
      pageModals.classList.add('show');
      pageModals.removeAttribute('aria-hidden');
      body.classList.add('modal-open');

      for (let i=0, x=boxModal.length; i < x; i++) {
        if(boxModal[i].getAttribute('data-modal') == dataModal) {
          boxModal[i].classList.add('show');
        }
      }
    };

    const closeModal = () => {
      pageModals.classList.remove('show');
      body.classList.remove('modal-open');
      pageModals.setAttribute('aria-hidden', true);
      for (let i=0, x=boxModal.length; i < x; i++) {
        boxModal[i].classList.remove('show');
      }
    };

    for(let i=0, x=triggerOpenModal.length; i < x; i++) {
      triggerOpenModal[i].addEventListener('click', openModal);
    }

    for(let i=0, x=triggerCloseModal.length; i < x; i++) {
      triggerCloseModal[i].addEventListener('click', closeModal);
    }

    document.onkeydown = event => {
      if(pageModals.classList.contains('show')) {
        event = event || window.event;
        if (event.keyCode == 27) closeModal();
      }
    };

    pageModalsOverlayer.addEventListener('click', closeModal);
  }
  /********** component modal **********/



  /********** component form / input animation **********/
  const inputs = document.querySelectorAll('.input-animation input, .input-animation textarea'),
        textarea = document.querySelectorAll('.input-animation textarea');

  const focusInAnimation = event => {
    event.currentTarget.parentNode.classList.add('active');
  };

  const focusOutAnimation = event => {
    if(event.currentTarget.value == "")
    event.currentTarget.parentNode.classList.remove('active');
  };

  const resize = event => {
    event.currentTarget.style.height = "1px";
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
  };

  for (let i=0, x=inputs.length; i<x; i++) {
    inputs[i].addEventListener('focusin', focusInAnimation);
    inputs[i].addEventListener('change', focusInAnimation);
    inputs[i].addEventListener('keyup', focusInAnimation);
    inputs[i].addEventListener('blur', focusInAnimation);
    inputs[i].addEventListener('input', focusInAnimation);
    inputs[i].addEventListener('focusout', focusOutAnimation);
  }

  for (let i=0, x=textarea.length; i<x; i++) {
    textarea[i].addEventListener('keyup', resize);
  }

  /********** component form / input animation **********/




  /********** component collapse **********/
  const boxCollapseTrigger = document.querySelectorAll('.box-collapse .box-collapse-trigger button'),
        boxCollapseContent = document.querySelectorAll('.box-collapse .box-collapse-content');

  const toggleBoxCollapse = event => {
    const dataCollapse = event.currentTarget.getAttribute('data-collapse');

    for (let i=0, x=boxCollapseContent.length; i < x; i++) {
      if(boxCollapseContent[i].getAttribute('id') == dataCollapse) {

        if(boxCollapseContent[i].classList.contains('is-expanded')) {
          event.currentTarget.setAttribute('aria-expanded', false);
          boxCollapseContent[i].classList.remove('is-expanded');
        }
        else {
          event.currentTarget.setAttribute('aria-expanded', true);
          boxCollapseContent[i].classList.add('is-expanded');
        }
      }
    }
  };

  for(let i=0, x=boxCollapseTrigger.length; i<x; i++) {
    boxCollapseTrigger[i].addEventListener('click', toggleBoxCollapse);
  }
  /********** component collapse **********/



  /********** component tabs **********/
  if(document.getElementById('tabsWrapper')) {
    const tabsTriggers = document.querySelectorAll('.tabs-wrapper [role="tab"]'),
          tabsPanels = document.querySelectorAll('.tabs-wrapper [role="tabpanel"]'),
          tabsWrapper = document.getElementById('tabsWrapper');

    if(window.innerWidth > 640) {
      // set height to tabsWrapper depending of panel height + 100px
      tabsWrapper.style.height = document.querySelector('[aria-selected="true"]').nextElementSibling.clientHeight + 100 + 'px';
    }

    window.addEventListener('resize', function() {
      if(this.innerWidth > 640) tabsWrapper.style.height = document.querySelector('[aria-selected="true"]').nextElementSibling.clientHeight + 100 + 'px';
      else tabsWrapper.style.height = 'auto';
    });

    const toggleTabsContent = event => {
      const ariaControls = event.currentTarget.getAttribute('aria-controls');

      for(let i=0, x=tabsPanels.length; i<x; i++) {
        tabsPanels[i].setAttribute('hidden', 'true');
        tabsTriggers[i].setAttribute('aria-selected', 'false')
      }

      event.currentTarget.setAttribute('aria-selected', 'true');

      document.getElementById(ariaControls).removeAttribute('hidden');

      if(window.innerWidth > 640) {
        // set height to tabsWrapper depending of panel height + 100px
        tabsWrapper.style.height = document.getElementById(ariaControls).clientHeight + 100 + 'px';
      }

      window.addEventListener('resize', function() {
        if(this.innerWidth > 640) tabsWrapper.style.height = document.getElementById(ariaControls).clientHeight + 100 + 'px';
        else tabsWrapper.style.height = 'auto';
      });

    };

    for(let i=0, x=tabsTriggers.length; i<x; i++) {
      tabsTriggers[i].addEventListener('click', toggleTabsContent);
    }
  }
}

function plotLoading(content) {
  var content = d3.select('radar')
    .append('div')
    .attr('class', 'loading')
    .append('div')
    .attr('class', 'input-sheet');

  document.title = "Building...";
}

function plotErrorMessage(exception) {
  d3.selectAll(".loading").remove();
  var message = 'Oops! It seems like there are some problems with loading your data. ';

  if (exception instanceof MalformedDataError) {
    message = message.concat(exception.message);
  } else {
    console.error(exception);
  }

  d3.select('radar')
    .append('div')
    .attr('class', 'error-container')
    .append('div')
    .attr('class', 'error-container__message')
    .append('p')
    .html(message);
}

module.exports = CSVBuilder;
