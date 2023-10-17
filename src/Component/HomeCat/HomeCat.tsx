import React from 'react'
import { Url } from '../../Utilities/MainUrl';
import { AllCat, Category } from '../../Interfaces/CartegoryInterface';
import useUrl from '../../hooks/useUrl';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomeCat() {

  const { allData, loading } = useUrl<AllCat>(`${Url}category`)
  const category: Category[] | undefined = allData?.category




  return (
    <>


      {loading ?<Row xs={1} md={2} lg={3} className='g-3'>

        { category?.map((cat) => (
          <Col id={cat._id} key={cat._id}>
            <Link to={`category/${cat.slug}/${cat._id}`} className='no-text-decoration'>

              <Card className="curser overflow-hidden item-zoom  position-relative">

                <Card.Img variant='top' className=" " src={cat.image.secure_url} height="300px" width='200px' ></Card.Img>

             

                  <div className="d-flex position-absolute bottom-0 start-0 h2  text-white bg-transparent m-3">
                  {cat.name}
                  </div>




              
              </Card>
            </Link>

          </Col>


        ))}</Row>
      :
      <div className='loading'>
        <i className="fa-solid fa-spinner fa-spin fa-2xl text-info "></i>
      </div>
                }

    </>


  )
}
