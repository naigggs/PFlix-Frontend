import React from 'react'
import {Carousel, Image, Col, Container} from 'react-bootstrap'
import '../App.css'

function Slider() {
  return (
    <div>
        <Col md={12}>
       <Carousel>
      <Carousel.Item >
      <div style={{
            height:'100%',
            maxHeight:600,
            objectFit:'none',
            objectPosition:'50%',
        }}>
        <img 
          className="d-block w-100"
          src={'dummyposter/Bula.jpg'}
          alt="First slide"
        /></div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{
            height:'100%',
            maxHeight:600,
            objectFit:'none',
        }}>
        <img class='carousel-pics'
          className="d-block w-100"
          src={'dummyposter/Laruan.jpg'}
          alt="Second slide"
        /></div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{
            height:'100%',
            maxHeight:600,
            objectFit:'none',
        }}>
        <img class='carousel-pics'
          className="d-block w-100"
          src={'dummyposter/LovelyLady.jpg'}
          alt="Third slide"
        /></div>
      </Carousel.Item>
    </Carousel>
    </Col>
    </div>
  )
}

export default Slider