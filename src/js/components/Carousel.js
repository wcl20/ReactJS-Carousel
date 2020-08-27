import React, { useState, useEffect, useRef } from 'react';

function Carousel() {

  let data = [1, 2, 3, 4, 5];

  const ref = useRef(null);
  const [translation, setTranslation] = useState(-100);
  const [transition, setTransition] = useState(0.3);
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([data[data.length - 1], data[0], data[1]]);

  const prev = () => {
      current === 0 ? setCurrent(data.length - 1) : setCurrent(current - 1);
      setTranslation(translation + 100);
  }

  const next = () => {
      current === (data.length - 1) ? setCurrent(0) : setCurrent(current + 1);
      setTranslation(translation - 100);
  }

  // Update slides when transition ended. (Disable animation)
  useEffect(() => {

      function updateSlides(event) {
          if (current === (data.length - 1)) {
              setSlides([data[data.length - 2], data[data.length - 1], data[0]]);
          } else if (current === 0) {
              setSlides([data[data.length - 1], data[0], data[1]]);
          } else {
              setSlides(data.slice(current - 1, current + 2));
          }
          setTranslation(-100);
          setTransition(0);
      }

      let slide = ref.current;
      slide.addEventListener("transitionend", updateSlides);

      return function cleanup() {
          slide.removeEventListener("transitionend", updateSlides);
      }
  });

  // Enable animation after slides update.
  useEffect(() => { setTransition(0.3); }, [transition])

  return (
    <div className="carousel">  
      <div className="slider">
          {
              slides.map((item, index) => {
                  return (
                      <div className="slide" key={index} ref={ref}
                           style={{ transform: `translateX(${translation}%)`, transition: `${transition}s` }}>
                          <h1>{item}</h1>
                      </div>
                  );
              })
          }
      </div>
      <button className="prev" onClick={prev}>&lsaquo;</button>
      <button className="next" onClick={next}>&rsaquo;</button>
    </div>
  );
}

export default Carousel;
