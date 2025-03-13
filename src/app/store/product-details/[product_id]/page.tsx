// import React from "react";
// import styles from "@/styles/productdetails.module.css";
// import Container from "@/components_welcome/Container";
// import { getProducts } from "@/library";

// export default async function ProductDetails({ params }) {
//     console.log(params);
//   const product = await getProducts(params.id);

//   return (
//     <Container className="col-span-4">
//       <div className="py-12 px-4">
//         <div className="flex flex-col md:flex-row items-start bg-white">
//           <img
//             src={product.image}
//             alt={product.title}
//             className={`${styles.productImage} w-full md:w-1/2 object-cover`}
//           ></img>

//           {/* Product details */}
//           <div className="p-6 md:w-1/2">
//             <h1 className="text-xl font-semibold text-gray-800 mb-4">
//               {product.title}
//             </h1>

//             <p className="text-md text-gray-600 mb-4">{product.description}</p>

//             <p className="text-gray-900 mb-4 text-md font-semibold">
//               Price: ${product.price}
//             </p>

//             <ul className="text-gray-700 space-y-2 text-md">
//               <li>
//                 <strong>Count:</strong>
//                 {product.count}
//               </li>
//               <li>
//                 <strong>Category:</strong>
//                 {product.category}
//               </li>
//             </ul>

//             <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

// ==================================================================================
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    if (!product_id) {
      // If `id` is not available yet, don't attempt to fetch data
      setLoading(false); // End loading if id is missing
      return;
    }
console.log(product_id);
    // Start loading
    setLoading(true);
    setError(null);
    console.log(product_id);
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${product_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data: Product = await response.json();

        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data); // Set the product data
      } catch (err) {
        setError("Failed to fetch product"); // Set error if something goes wrong
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProduct();
  }, [product_id]); // Only re-run when `id` changes

  if (loading) return <p>Loading...</p>; // Show loading text until data is fetched
  if (error) return <p>{error}</p>; // Show error message if any error occurs
  if (!product) return <p>Product not found</p>; // Fallback if no product found

  return (
    <div className="items-center bg-gray-100 justify-center">
      <div className="p-6 max-w-3xl mx-auto">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-2xl items-center size-100"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;




