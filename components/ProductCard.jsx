import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import { getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard = ({ data }) => {

    if (!data || !data.attributes) {
        return null; // Return null or a placeholder component
      }
    
      const { attributes: p, id } = data;
  
  return (
    <Link href={`/product/${p.slug}`} 
    className='transform overflow-hidden bg-white duration-200 hover:scale-205 cursor-pointer hover:scale-105'>

<Image
                width={500}
                height={500}
                src={p.thumbnail.data[0].attributes.url}
                alt={p.name}
            />

      <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{p.name}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        &#8377;{p.price}
                    </p>

                    {p.original_price && (
                        <>
                            <p className="text-base  font-medium line-through">
                                &#8377;{p.original_price}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                { getDiscountedPricePercentage(
                                    p.original_price,
                                    p.price
                                ) }
                                % off
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;