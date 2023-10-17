import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useUrl from '../hooks/useUrl'
import { Url } from '../Utilities/MainUrl'
import { AllProductList, Product } from '../Interfaces/ProductInterface'
import { Container } from 'react-bootstrap'

import 'slick-carousel/slick/slick.css';

import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import DetailsOnProductPage from '../Component/DetailsOnProductPage/DetailsOnProductPage'

export default function ProductDetails() {
  let { id } = useParams()


  const [selectedImage, setSelectedImage] = useState('');



  let { allData, loading } = useUrl<AllProductList>(Url + `product?_id=${id}`)

  let product = allData?.products




  const SubImg = product?.[0]?.subImages?.map(img => {
    return img.secure_url
  })

  if (product && product.length > 0) {
    SubImg?.unshift(product?.[0]?.mainImage?.secure_url)
  }





  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      setSelectedImage(SubImg?.[nextSlide] || ' ');
    },
  };
  const handleImageSelect = (image: string) => {
    setSelectedImage(image || '');
  };

  return (
    <div>
      <Container className='my-5'>
        <div className="row g-5">
          <div className="col-md-5">
            <div>
              <div className="row g-4">
                <div className='col-md-3'>
                  {SubImg?.map((img, index) => (
                    <div key={index} className='cursor'>

                      <div key={index} onClick={() => handleImageSelect(img)}>
                        <img src={img} alt='' className='w-100' />
                      </div>

                    </div>
                  ))}
                </div>

                <div className='col-md-9'>
                  <div className='slide-container'>
                    <Slider {...settings}>
                      {SubImg?.map((img, index) => (
                        <div key={index}>
                          <div style={{ backgroundImage: `url(${img})` }}>
                            {
                              selectedImage ?
                                <div className="imgShow">
                                  <img src={selectedImage} alt='' style={{ objectFit: "cover" }} className='image-container  ' />

                                </div>


                                :
                                <div className="imgShow">
                                  <img src={img} alt='' style={{ objectFit: "cover" }} className='image-container  ' />

                                </div>
                            }
                          </div>
                        </div>

                      ))}



                    </Slider>
                  </div>
                </div>


              </div>
            </div>






          </div>
          <div className="col-md-6 offset-1">

            {product?.map((ele,i)=>(
            <DetailsOnProductPage {...ele} key={ele._id} />

            ))}
          </div>
        </div>


      </Container>
    </div>
  )
}
