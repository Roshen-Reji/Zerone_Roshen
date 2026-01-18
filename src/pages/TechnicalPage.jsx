import React from 'react';
import propTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BezierEasing from 'bezier-easing';
import './TechnicalPage.css';

// Helper function from the original script
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

// ========================================================================
// CONTENT CONFIGURATION START
// ========================================================================

const DATA_CONFIG = {
  brandName: "IEEE CEK's",
  logoText: "Zerone-2026",
  navText: "IEEE CEK-KGR",
  buttonText: "Zerone",

  // PRODUCT SLIDES
  items: [
    {
      id: 1,
      name: "Signature",
      desc: "ZERONE stands as the definitive IEEE CEK-KGR signature initiative, engineered to set the annual benchmark for innovation, scale, and student engagement. It represents the organization’s strategic commitment to building high-impact technical culture from day zero.",
      color: "#0047fd",
      // Images removed
      stat1: { value: 6, suffix: "yrs", label: "Experience" },
      stat2: { value: 120, suffix: "no.", label: "Participants" },
      stat3: { value: 4, suffix: "no.", label: "Events" },
      bckgHeight: 300,
      objShadowHeight: 300,
      shadowOpacity: 0.2,
    },
    {
      id: 2,
      name: "Genesis",
      desc: "Designed exclusively for first-year students, ZERONE acts as the starting point of their IEEE journey—shaping mindset, curiosity, and confidence before habits are set and ceilings are assumed.",
      color: "#ee0101",
      // Images removed
      stat1: { value: 6, suffix: "yrs", label: "Experience" },
      stat2: { value: 120, suffix: "no.", label: "Participants" },
      stat3: { value: 4, suffix: "no.", label: "Events" },
      bckgHeight: 250,
      objShadowHeight: 200,
      shadowOpacity: 0.5,
    },
    {
      id: 3,
      name: "CoLab",
      desc: "At its core, ZERONE blends collaborative problem-solving with applied technology, pushing participants to think, build, and iterate as teams—mirroring real-world engineering and startup ecosystems.",
      color: "#28a745",
      // Images removed
      stat1: { value: 6, suffix: "yrs", label: "Experience" },
      stat2: { value: 120, suffix: "no.", label: "Participants" },
      stat3: { value: 4, suffix: "no.", label: "Events" },
      bckgHeight: 340,
      objShadowHeight: 150,
      shadowOpacity: 0.5,
    }
  ]
};

/* Set CSS Variables */
class SetCSSVariables extends React.Component {
  render() {
    const { cssVariables, children } = this.props;
    const child = React.Children.only(children);
    // This injects the variables as inline styles into the child element
    // instead of setting them globally on the HTML document.
    return React.cloneElement(child, {
      style: { ...child.props.style, ...cssVariables }
    });
  }
}
_defineProperty(SetCSSVariables,"propTypes",{ cssVariables: propTypes.object.isRequired, className: propTypes.string });

function SlideAside(props) {
  const activeItem = props.activeItem;
  return React.createElement(
    "div",
    { className: "app-slide-aside" },
    React.createElement(
      "h1",
      { className: "app-slide-aside__wholename" },
      React.createElement("span", null, DATA_CONFIG.brandName),
      React.createElement(
        TransitionGroup,
        { component: "span", className: "app-slide-aside__name" },
        React.createElement(
          CSSTransition,
          {
            key: activeItem.name,
            timeout: { enter: 800, exit: 1000 },
            className: "app-slide-aside__name-part",
            classNames: "app-slide-aside__name-part-",
            mountOnEnter: true,
            unmountOnExit: true,
          },
          React.createElement("span", null, activeItem.name),
        ),
      ),
    ),
    React.createElement(
      TransitionGroup,
      { className: "app-slide-aside__desc" },
      React.createElement(
        CSSTransition,
        {
          key: activeItem.desc,
          timeout: { enter: 900, exit: 1200 },
          className: "app-slide-aside__desc-text",
          classNames: "app-slide-aside__desc-text-",
          mountOnEnter: true,
          unmountOnExit: true,
        },
        React.createElement("p", null, activeItem.desc),
      ),
    ),
    React.createElement(
      "div",
      { className: "app-slide-aside__button" },
      React.createElement("button", { className: "button" }, DATA_CONFIG.buttonText),
      React.createElement(
        TransitionGroup,
        null,
        React.createElement(
          CSSTransition,
          {
            key: activeItem.color,
            timeout: { enter: 800, exit: 1000 },
            mountOnEnter: true,
            unmountOnExit: true,
            classNames: "button__border-",
          },
          React.createElement(
            SetCSSVariables,
            { cssVariables: { "--btn-color": activeItem.color } },
            React.createElement("span", { className: "button__border" }),
          ),
        ),
      ),
    ),
  );
}
SlideAside.propTypes = { activeItem: propTypes.object.isRequired };

/* Slide animate values */
function animate(render, duration, easing, next = () => null) {
  const start = Date.now();
  (function loop() {
    const current = Date.now(), delta = current - start, step = delta / duration;
    if (step > 1) { render(1); next(); } else { requestAnimationFrame(loop); render(easing(step * 2)); }
  })();
}

const myEasing = BezierEasing(0.4, -0.7, 0.1, 1.5);

class AnimValue extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "node", null);
    _defineProperty(this, "timeout", null);
    _defineProperty(this, "setValue", (value, step) => {
        if (!this.node) { return; }
        if (step === 1) { this.node.style.opacity = 1; } else { this.node.style.opacity = 0.7; }
        this.node.innerHTML = value;
      },
    );
  }
  animate(previousValue, newValue, applyFn) {
    window.clearTimeout(this.timeout);
    this.timeout = null;
    const diff = newValue - previousValue;
    const renderFunction = (step) => {
      this.timeout = setTimeout(() => {
        applyFn(this.props.transformFn(previousValue + diff * step, step), step);
      }, this.props.delay);
    };
    animate(renderFunction, this.props.duration, myEasing);
  }
  componentDidMount() { this.animate(0, this.props.value, this.setValue); }
  componentWillReceiveProps(props) {
    let previousValue = this.props.value;
    if (previousValue !== props.value) { this.animate(previousValue, props.value, this.setValue); }
  }
  componentWillUnmount() { window.clearTimeout(this.timeout); this.timeout = null; }
  render() {
    return React.createElement("span", {
      className: this.props.className,
      children: "0",
      ref: (node) => (this.node = node),
    });
  }
}
_defineProperty(AnimValue, "defaultProps", {
  delay: 0, duration: 800, transformFn: (value) => Math.floor(value),
});

class AnimateValue extends React.Component {
  render() {
    return React.createElement(AnimValue, {
      className: this.props.className,
      delay: this.props.delay,
      value: this.props.value,
      transformFn: (value, step) => step === 1 ? (value % 1 != 0 ? value.toFixed(1) : value) : Math.abs(Math.floor(value)),
    });
  }
}

let DELAY_STAT_1 = 200, DELAY_STAT_2 = 700, DELAY_STAT_3 = 1200;

class SlideParams extends React.Component {
  componentWillReceiveProps(props) {
    if (!props.animationForward) { DELAY_STAT_1 = 1200; DELAY_STAT_3 = 200; } else { DELAY_STAT_1 = 200; DELAY_STAT_3 = 1200; }
  }
  render() {
    const { activeItem } = this.props;
    return React.createElement(
      "div",
      { className: "app-slide-params" },
      React.createElement(
        "ul",
        { className: "app-slide-params__list" },
        // STAT 1
        React.createElement(
          "li",
          { className: "app-slide-params__item" },
          React.createElement(
            "div",
            { className: "app-slide-params__wrapper" },
            React.createElement("span", { className: "app-slide-params__prefix" }, "+"),
            React.createElement(AnimateValue, {
              className: "app-slide-params__value",
              value: activeItem.stat1.value,
              delay: DELAY_STAT_1,
            }),
            React.createElement("span", { className: "app-slide-params__sufix" }, activeItem.stat1.suffix),
          ),
          React.createElement("p", { className: "app-slide-params__name" }, activeItem.stat1.label),
        ),
        // STAT 2
        React.createElement(
          "li",
          { className: "app-slide-params__item" },
          React.createElement(
            "div",
            { className: "app-slide-params__wrapper" },
            React.createElement(AnimateValue, {
              className: "app-slide-params__value",
              value: activeItem.stat2.value,
              delay: DELAY_STAT_2,
            }),
            React.createElement("span", { className: "app-slide-params__sufix" }, activeItem.stat2.suffix),
          ),
          React.createElement("p", { className: "app-slide-params__name" }, activeItem.stat2.label),
        ),
        // STAT 3
        React.createElement(
          "li",
          { className: "app-slide-params__item" },
          React.createElement(
            "div",
            { className: "app-slide-params__wrapper" },
            React.createElement(AnimateValue, {
              className: "app-slide-params__value",
              value: activeItem.stat3.value,
              delay: DELAY_STAT_3,
            }),
            React.createElement("span", { className: "app-slide-params__sufix" }, activeItem.stat3.suffix),
          ),
          React.createElement("p", { className: "app-slide-params__name" }, activeItem.stat3.label),
        ),
      ),
    );
  }
}
_defineProperty(SlideParams, "propTypes", {
  activeItem: propTypes.object.isRequired,
  animationForward: propTypes.bool.isRequired,
});

class Slide extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "handleEnter", (e) => { this.props.setAnimationState(this.props.ANIMATION_PHASES.STOP); });
  }
  render() {
    const { activeSlide, animationForward } = this.props;
    return React.createElement(
      "div",
      { className: `app-slide ${animationForward ? "animation-forward" : "animation-back"}` },
      React.createElement(SlideAside, { activeItem: activeSlide }),
      // --- REMOVED THE RECTANGULAR BACKGROUND "BOX" COMPONENT HERE ---
      // The block that rendered .app-slide__bckg is deleted.
      
      // --- KEEPING THE GRADIENT ORB ---
      React.createElement(
        TransitionGroup,
        null,
        React.createElement(
          CSSTransition,
          {
            key: activeSlide.name,
            timeout: { enter: 700, exit: 1200 },
            classNames: "app-slide__img-",
            mountOnEnter: true,
            unmountOnExit: true,
            onEntered: this.handleEnter,
          },
          React.createElement(
            "div",
            { className: "app-slide__img" },
             // Inject CSS vars for color here since we removed the previous container
             React.createElement(
              SetCSSVariables,
              {
                cssVariables: {
                  "--accent-color": activeSlide.color,
                },
              },
              React.createElement("div", {
                className: "app-slide__gradient-orb"
              })
            ),
          ),
        ),
      ),
      React.createElement(SlideParams, {
        activeItem: activeSlide,
        animationForward: animationForward,
      }),
    );
  }
}
_defineProperty(Slide, "propTypes", {
  activeSlide: propTypes.object.isRequired,
  animationForward: propTypes.bool.isRequired,
  setAnimationState: propTypes.func.isRequired,
  ANIMATION_PHASES: propTypes.object.isRequired,
});

class SliderNavigation extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "app-slider-navigation" },
      React.createElement(
        "ul",
        { className: "app-slider-navigation__list" },
        this.props.itemsNames.map((item) =>
          React.createElement(
            "li",
            { key: item.id, className: "app-slider-navigation__item" },
            React.createElement(
              "a",
              {
                href: "#",
                onClick: (event) => {
                  event.preventDefault();
                  this.props.setActiveSlide(this.props.itemsNames.indexOf(item));
                },
                className: `app-slider-navigation__link ${
                  this.props.itemsNames[this.props.activeSlide] === item ? "app-slider-navigation__link--active" : ""
                }`,
                style: {
                  color: this.props.itemsNames[this.props.activeSlide] === item ? item.color : "",
                },
              },
              item.name,
            ),
          ),
        ),
      ),
    );
  }
}
_defineProperty(SliderNavigation, "propTypes", {
  setActiveSlide: propTypes.func.isRequired,
  itemsNames: propTypes.array.isRequired,
});

/* Slider */
const ANIMATION_PHASES = { PENDING: "PENDING", STOP: "STOP" };

class Slider extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      activeSlide: 0,
      animationForward: true,
      slidesCount: DATA_CONFIG.items.length,
      animationState: null,
    });
    _defineProperty(this, "slider", { header: "", content: "" });
    _defineProperty(this, "setAnimationState", (animationState) => this.setState({ animationState }));
    _defineProperty(this, "setActiveSlide", (slideId) => {
        this.setState({
          activeSlide: slideId,
          animationForward: this.state.activeSlide < slideId ? true : false,
        });
        this.setAnimationState(ANIMATION_PHASES.PENDING);
      },
    );
    _defineProperty(this, "timeout", null);
    _defineProperty(this, "handleScroll", (e) => {
        let sliderHeight = this.slider.content.clientHeight,
          headerHeight = this.slider.header.clientHeight;
        if (window.innerHeight < sliderHeight + headerHeight) { return; }
        e.preventDefault();
        window.clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          if (e.deltaY < 0 && this.state.activeSlide !== 0) {
            this.setActiveSlide(this.state.activeSlide - 1);
          }
          if (e.deltaY > 0 && this.state.activeSlide !== this.state.slidesCount - 1) {
            this.setActiveSlide(this.state.activeSlide + 1);
          }
        }, 50);
      },
    );
  }
  componentDidMount() {
    this.setState({ activeSlide: 0 }); // Start at first slide
    this.setAnimationState(ANIMATION_PHASES.PENDING);
    this.slider.header = document.querySelector(".app-header");
    this.slider.content = document.querySelector(".app-slider");
    document.body.addEventListener("wheel", this.handleScroll);
  }
  componentWillUnmount() {
    document.body.removeEventListener("wheel", this.handleScroll);
    window.clearTimeout(this.timeout);
    this.timeout = null;
  }
  render() {
    return React.createElement(
      "div",
      { className: "app-slider" },
      React.createElement(SliderNavigation, {
        activeSlide: this.state.activeSlide,
        setActiveSlide: this.setActiveSlide,
        itemsNames: DATA_CONFIG.items.map((slide) => ({
          id: slide.id, name: slide.name, color: slide.color,
        })),
      }),
      React.createElement(Slide, {
        animationForward: this.state.animationForward,
        activeSlide: DATA_CONFIG.items[this.state.activeSlide],
        animationState: this.state.animationState,
        setAnimationState: this.setAnimationState,
        ANIMATION_PHASES: ANIMATION_PHASES,
      }),
      React.createElement(
        "div",
        { className: "app-slider__scroll" },
        React.createElement("span", null, "SCROLL")
      ),
    );
  }
}

/* Header */
function Header() {
  return React.createElement(
    "div",
    { className: "app-header" },
    React.createElement("div", { className: "app-header__logo" }, DATA_CONFIG.logoText),
    React.createElement("div", { className: "app-header__nav" }, DATA_CONFIG.navText),
  );
}

/* App */
class TechnicalPage extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "technical-page-wrapper" }, // New Wrapper
      React.createElement(
        "div", 
        { className: "container" },
        React.createElement(Header, null),
        React.createElement(Slider, null),
      )
    );
  }
}

export default TechnicalPage;