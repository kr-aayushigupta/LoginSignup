

const getProducts=async(product_id=null)=>{
    // let API='https://fakestoreapi.in/api/products';

    let API='https://fakestoreapi.com/products';
    if(product_id!=null){
        API+="/"+product_id;
    }
    const response=await fetch(API)

    const data=await response.json()
    return product_id=data.product;
}

export {getProducts};