import React from 'react'

import Container from './Container'
// import ProductBox from '../ProductBox';
import ProductBox from './ProductBox';

async function FeaturedProducts() {

  const response=await fetch("https://fakestoreapi.com/products")

  const data=await response.json();


  return (
    <div className="p-3">
      <Container>
        <h1 className="text-center text-3xl font-bold">
          Welcome 
        </h1>

        <div className="grid grid-cols-5 gap-2">
          {/* <ProductBox></ProductBox> */}

          {data.map((prod) => {
            return <ProductBox product={prod} key={prod.id} />;
          })}
        </div>


      </Container>
    </div>
  )
}

export default FeaturedProducts