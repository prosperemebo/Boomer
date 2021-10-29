const testimonialBody = document.querySelector('#testimonialBody');
const testimonialText = document.querySelector('#testimonialText');
const testifierText = document.querySelector('#testifier');
const prevTestimonial = document.querySelector('#prev-testimonial');
const nextTestimonial = document.querySelector('#next-testimonial');

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
