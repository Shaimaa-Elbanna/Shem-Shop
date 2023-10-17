import React from 'react'
import useUrl from '../hooks/useUrl'
import { Url } from '../Utilities/MainUrl'
import  { AllProductList ,Product} from '../Interfaces/ProductInterface';
import ProductDiv from '../Component/productDiv/ProductDiv';
import {Row} from 'react-bootstrap'
import HomeCat from '../Component/HomeCat/HomeCat';

export default function Home() {
  let { allData, loading, index } = useUrl<AllProductList>(Url + 'product')

let product=allData?.products



  return (
    

<div>
  {
    loading? 
    
    <div className="container mt-5">
<HomeCat/>



<div className="allProduct my-5 ">

  <h2 className='text-center my-5'>All Product</h2>
<Row xs={1} md={2} lg={3} className='g-3'>
      {product?.map((ele: Product, i: number) => (
        <ProductDiv {...ele} key={ele._id}   />
      ))}
    </Row>
</div>
   
  </div> 
  : 
    <div className='loading'>
    <i className="fa-solid fa-spinner fa-spin fa-2xl text-info "></i>
  </div>
  }
     
    </div>


 
       

    
  )
}

//محتاجه اظبط ال loading 
//ن اظبط ال 2 سيكشن 