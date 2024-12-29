import ProductCard from '@/components/reusables/ProductCard'
import React from 'react'

export default function TrendingProduct() {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
     <ProductCard /> 
     <ProductCard /> 
    </section>
  )
}
