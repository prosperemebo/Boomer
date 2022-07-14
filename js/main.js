const testimonialBody = document.querySelector('#testimonialBody');
const testimonialText = document.querySelector('#testimonialText');
const testifierText = document.querySelector('#testifier');
const prevTestimonial = document.querySelector('#prev-testimonial');
const nextTestimonial = document.querySelector('#next-testimonial');
const headerPopupButton = document.querySelector('#headerPopupBtn');
const footerPopupBtn = document.querySelector('#footerPopupBtn');
const footerPopupButton = document.querySelector('#close-contact-modal');

const testimonialData = [
  {
    testimony:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio illo nostrum at. Maxime laborum, error, porro cumque natus ab perferendis reprehenderit, velit reiciendis inventore numquam consequatur voluptatum animi eaque dolor.',
    testifier: 'Jack Bauer',
  },
  {
    testimony:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, praesentium.',
    testifier: 'Wale Applause',
  },
  {
    testimony:
      ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, illo dolor quaerat cum delectus suscipit esse debitis odit distinctio culpa explicabo unde, facilis ex voluptas.',
    testifier: 'Simeone Elliot',
  },
  {
    testimony:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eius accusamus unde adipisci debitis, repellendus non odio minima odit magni nisi voluptates quaerat laborum tempore deserunt doloremque quos ex natus quia culpa quisquam sapiente sit! Quo, fugit. Inventore, fugiat exercitationem.',
    testifier: 'Alexander Makgray',
  },
];

let index = 0;

function Timer(fn, t) {
  let timerObj = setInterval(fn, t);

  this.stop = function () {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
    return this;
  };

  this.start = function (newT = t) {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
    return this;
  };

  this.reset = function (newT = t) {
    t = newT;
    return this.stop().start();
  };
}

const nextTestimonialTimer = new Timer(() => {
  changeTestimonial('next');
}, 10000);

const setTestimonial = (index) => {
  testimonialText.innerHTML = testimonialData[index].testimony;
  testifierText.innerHTML = testimonialData[index].testifier;
};

const changeTestimonial = (type) => {
  nextTestimonialTimer.reset();
  testimonialBody.classList.add('hide');

  setTimeout(() => {
    if (type === 'prev') {
      if (index === 0) {
        index = testimonialData.length - 1;
      } else {
        index = index - 1;
      }
    }
    if (type === 'next') {
      if (index === testimonialData.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    }

    setTestimonial(index);
    testimonialBody.classList.remove('hide');
  }, 500);
};

prevTestimonial.addEventListener('click', () => {
  changeTestimonial('prev');
});

nextTestimonial.addEventListener('click', () => {
  changeTestimonial('next');
});

setTestimonial(index);

// ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  // markers: true,
  toggleActions: 'restart none none reverse',
  start: 'top 90%',
});

const slideInUp = [
  { opacity: 0, y: '150px' },
  { opacity: 1, duration: 1.5, y: '0', stagger: 0.25 },
];

const headingSecondaryAnimation = {
  y: 0,
  duration: 1,
  stagger: 0.15,
};

const tlHeader = gsap.timeline({
  defaults: {
    ease: 'power1.out',
  },
});

tlHeader.to('.intro .text', { y: '0%', duration: 1, stagger: 0.25 });
tlHeader.to('.slider1', { y: '-100%', duration: 2, delay: 0.5 });
tlHeader.to('.slider2', { y: '-100%', duration: 1.6 }, '-=1.8');
tlHeader.to('.slider3', { y: '-100%', duration: 2 }, '-=1.8');
tlHeader.to('.intro', { y: '-100%', duration: 1 }, '-=1.5');
tlHeader.fromTo(
  '.header__logo-box img',
  { opacity: 0, x: '-50px' },
  { opacity: 1, duration: 1.5, x: '0' },
  '-=.5'
);
tlHeader.fromTo('.header__text-items', ...slideInUp, '-=1.5');

const tlServices = gsap.timeline({
  defaults: {
    ease: Power1.easeOut,
  },
  scrollTrigger: {
    trigger: '.section-services',
  },
});

tlServices.fromTo('.section-services .heading-secondary .text', ...slideInUp);
tlServices.fromTo('.composition', ...slideInUp, '-=1.6');

const tlAbout = gsap.timeline({
  defaults: {
    ease: 'power1.easeOut',
  },
  scrollTrigger: {
    trigger: '.section-about',
    markers: true,
    start: 'top 90%',
    end: 'bottom 90%',
    scrub: true,
  },
});

tlAbout.fromTo('.section-about .anim-text', ...slideInUp);

tlAbout
  .set('.section-about .cell--composition', {
    transformOrigin: 'left center',
  })
  .to(
    '.section-about .cell--composition .overlay',
    {
      width: '0%',
      duration: 1.5,
      stagger: 0.25,
    },
    '-=1'
  );

const tlTeam = gsap.timeline({
  defaults: {
    ease: 'power1.easeIn',
  },
  scrollTrigger: {
    trigger: '.section-team',
  },
});

tlTeam.fromTo('.section-team .anim-text', ...slideInUp);
tlTeam.fromTo('.section-team .member', ...slideInUp, '-=1.5');

const tlTestimonial = gsap.timeline({
  defaults: {
    ease: 'power1.easeIn',
  },
  scrollTrigger: {
    trigger: '.section-testimonials',
  },
});

tlTestimonial.fromTo('.section-testimonials .anim-text', ...slideInUp);
tlTestimonial.fromTo(
  '.section-testimonials .testimonials',
  ...slideInUp,
  '-=1.5'
);

const tlFooter = gsap.timeline({
  defaults: {
    ease: 'power1.easeIn',
  },
  scrollTrigger: {
    trigger: '.footer',
  },
});

tlFooter.fromTo('.footer .anim-text', ...slideInUp);
tlFooter.fromTo(
  '.footer .foot .content',
  { opacity: 0 },
  { opacity: 1, duration: 1 }
);

// CONTACT POPUP

const tlPopup = gsap.timeline({
  defaults: {
    ease: 'power1.out',
  },
});

tlPopup.to('.contact-popup', { x: '0%', duration: 1 }), '+=2';
tlPopup.fromTo(
  '.contact-popup .content',
  { opacity: 0, x: '-30%' },
  { opacity: 1, duration: 1, x: '0' },
  '-=1'
);
tlPopup.fromTo(
  '.contact-popup .content',
  { opacity: 0 },
  { opacity: 1, duration: 1 },
  '-=1.8'
);
tlPopup.reverse();

const openContactModal = (open) => {
  tlPopup.play();
};

const closeContactModal = () => {
  tlPopup.reverse();
};

headerPopupButton.addEventListener('click', openContactModal);
footerPopupBtn.addEventListener('click', openContactModal);
footerPopupButton.addEventListener('click', closeContactModal);
