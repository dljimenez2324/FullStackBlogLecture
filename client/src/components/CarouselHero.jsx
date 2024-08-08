import React from 'react'
import { Carousel } from 'react-bootstrap';

import Laptop from '../assets/beachlaptop.jpg';
import coffe from '../assets/coffe.jpg';

const CarouselHero = ( { isDarkMode } ) => {
  return (
    <>
        <Carousel data-bs-theme={isDarkMode ? "light" : "dark"}>
            <Carousel.Item className='CItem'>
                <img
                className="carouselImage d-block w-100"
                src={coffe}
                alt="First slide"
                />
                
            </Carousel.Item>
            <Carousel.Item className='CItem'>
                <img
                className="carouselImage d-block w-100"
                src={Laptop}
                alt="Second slide"
                />
                
            </Carousel.Item>
            <Carousel.Item className='CItem'>
                <img
                className="carouselImage d-block w-100"
                src={Laptop}
                alt="Third slide"
                />
                
            </Carousel.Item>
        </Carousel>
    </>
  )
}

export default CarouselHero