import React from 'react'
import product8 from "../../public/assets/product8.png";
import product9 from "../../public/assets/product9.png";
import product10 from "../../public/assets/product10.png";
import product11 from "../../public/assets/product11.png";
import product12 from "../../public/assets/product12.png";
import product13 from "../../public/assets/product13.png";

const Categories = () => {
    const categories = [
        { img: product8, alt: "Men's Perfumes", title: "Men's Collection", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " },
        { img: product9, alt: "Women's Perfumes", title: "Women's Collection", description: "Elegant and long-lasting scents crafted for women." },
        { img: product10, alt: "Unisex Fragrances", title: "Unisex Collection", description: "Versatile perfumes that suit every style and identity." },
        { img: product11, alt: "Luxury Perfumes", title: "Luxury Line", description: "Premium fragrances made with rare and exotic ingredients." },
        { img: product12, alt: "Arabic Oud", title: "Arabic Oud", description: "Portable scents perfect for on-the-go freshness." },
        { img: product13, alt: "Gift Box Perfume", title: "Gift Sets", description: "Beautifully packaged perfumes for special occasions." },
    ];
    return (

        <section id='category' className='py-16 scroll-mt-20 bg-white'>
            <div className="container mx-auto px-4">
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-amber-950 mb-3'>
                        Explore Our Fragrance Collections
                    </h2>
                    <p className='text-lg text-gray-800 max-w-2x1 mx-auto'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                    {categories.map((category, index) => (
                        <div key={index} className='relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg 
                        transition-shadow duration-300'>
                            <div className='h-64 overflow-hidden'>
                                <img
                                    src={category.img}
                                    alt={category.alt}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                            </div>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'>
                                <div className='absolute bottom-0 left-0 p-6'>
                                    <h3 className='text-xl font-semibold text-white'>{category.title}</h3>
                                    <p className='text-gray-200 mt-1'>{category.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories