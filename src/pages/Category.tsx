import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useUrl from '../hooks/useUrl'
import { Url } from '../Utilities/MainUrl'
import { AllCat, Category,Subcategoty } from '../Interfaces/CartegoryInterface'
import { Card, Col, Row } from 'react-bootstrap'

export default function CategoryPage() {
    const { categoryId } = useParams()

    const { allData, loading } = useUrl<AllCat>(`${Url}category?_id=${categoryId}`)
    const category: Category | undefined = allData?.category[0]
    // const subcategory: Category | undefined = allData?.category[0]




    return (
        <div>
            {
                loading ? <div className="container mt-5">
                    <Row xs={1} md={2} lg={3} className='g-3'>

                        {category?.subcategoty&&category?.subcategoty.length>0&&(
 
 category?.subcategoty?.map((subCat:Subcategoty)=>(
    <Col id={subCat._id}>
    <Link to={`/subcategory/${subCat.slug}/${subCat._id}`} className='no-text-decoration'>

    <Card className="curser overflow-hidden item-zoom">

      <Card.Img variant='top' className=" " src={subCat.imag.secure_url} height="300px" width='200px' ></Card.Img>

      <Card.Body>

        <div className="d-flex justify-content-between align-items-baseline">
          <span className='h4 '>{subCat.name}</span>
        </div>
        

       

      </Card.Body>
    </Card>
      </Link>

  </Col>
    
 ))
                    )}
                      
                    </Row>
                </div>
                    :
                    <div className='loading'>
                        <i className="fa-solid fa-spinner fa-spin fa-2xl text-info "></i>
                    </div>
            }

        </div>
    )
}
