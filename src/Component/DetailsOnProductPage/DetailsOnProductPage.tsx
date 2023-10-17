import React from 'react'
import { Product } from '../../Interfaces/ProductInterface'

export default function DetailsOnProductPage({_id,name,brand,discription,price,discount,finalPrice,colors,avgRating,review}:Product) {


  return (
    <div>
<span className='text-muted mb-2'>{brand?.[0]?.name}</span>
<h2>{name}</h2>
<div className='col-md-4'>
{discount?  <>
  <div className='d-flex align-items-center m-3  justify-content-between '>
  
  <span className=''>Was:     </span>
  <h4 className='text-decoration-line-through text-muted'>        EGP {price}</h4>
 
  </div>
  <div className='d-flex align-items-center m-3 justify-content-between  '>

  <span>Now:    </span>
  <h4>     EGP {finalPrice}</h4>
  </div>
  <div className='d-flex align-items-center m-3 justify-content-between  '>

  <span>Saving:      </span>
  <h4>    EGP {price - finalPrice}</h4>
  
  </div>
  </>
  :  <div className='d-flex align-items-center m-3 justify-content-between  '>

  <span>now:    </span>
  <h4>     EGP {finalPrice}</h4>
  </div>
}

</div>

<div>
  <h4>Description:</h4>
  <p>{discription}</p>
</div>
{colors && (<div className=''>
  <span className='h5'>colors: </span>
    {colors?.map(color=>(
      <span>{color} </span>
    ))}
  </div>) }
 



    </div>
  )
}
