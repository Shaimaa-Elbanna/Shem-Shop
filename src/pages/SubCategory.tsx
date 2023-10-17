import React from 'react'
import { useParams } from 'react-router-dom'
import useUrl from '../hooks/useUrl'
import { Url } from '../Utilities/MainUrl'
import { AllProductList, Product } from '../Interfaces/ProductInterface'
import { Row } from 'react-bootstrap'
import ProductDiv from '../Component/productDiv/ProductDiv'

export default function SubCategory() {
  const { subcCtegoryId } = useParams()

  let { allData, loading, index } = useUrl<AllProductList>(`${Url}product?subCategoryId=${subcCtegoryId}`)
  let product: Product[] | undefined = allData?.products

  return (


    <div>
      {
        loading ? <div className="container mt-5">
          <Row xs={1} md={2} lg={3} className='g-3'>
            {product?.map((ele) => (
              <ProductDiv {...ele} key={ele._id} />
            ))}
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
