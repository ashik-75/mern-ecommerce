import { useState } from 'react';
import './sliders.scss';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Sliders = () => {
  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60',
      caption: 'image-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1471943038886-87c772c31367?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60',
      caption: 'image-2',
    },
    {
      url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60',
      caption: 'image 3',
    },
    {
      url: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60',
      caption: 'image-4',
    },
  ];
  const properties = {
    duration: 2000,
    autoplay: true,
    // transitionDuration: 500,
    arrows: false,
    indicators: true,

    // infinite: true,
    // easing: 'linear',
  };
  return (
    <div className="slider-container">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              className="slide"
              style={{
                // width: '100%',
                backgroundImage: `url(${slideImage.url})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              <span className="slider-content">{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>

      {/* <div
        style={{
          width: 900,
          height: 300,
          backgroundImage: `url(${slideImages[2].url})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      ></div> */}
    </div>
  );
};

export default Sliders;
