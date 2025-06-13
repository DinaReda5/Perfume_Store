
import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Products = ({ onAddToCart,onAddToWish }) => {
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(4);

    useEffect(() => {
        fetch('/backend/products.json')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setProductsPerPage(1);
            else if (window.innerWidth < 768) setProductsPerPage(2);
            else if (window.innerWidth < 1024) setProductsPerPage(3);
            else setProductsPerPage(4);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(products.length / productsPerPage);
    const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

    const visibleProducts = products.slice(
        currentSlide * productsPerPage,
        (currentSlide + 1) * productsPerPage
    );

    return (
        <section id='Products' className='py-12 scroll-mt-20 bg-gray-50'>
            <div className="container mx-auto px-4">
                <div className='flex justify-between items-center mb-8'>
                    <h2 className="md:text-3x1 text-2x1 font-bold text-amber-900">Featured Products</h2>
                    <div className='flex space-x-4'>
                        <Link to="/products">
  <button className="bg-pink-900 hover:bg-pink-600 text-white px-4 py-2 rounded transition cursor-pointer">
    View All Products
  </button>
</Link>
                         
                        <button
                            onClick={prevSlide}
                            className='p-2 rounded-full bg-white shadow-md hover:bg-pink-100 text-pink-600 transition-colors'
                            aria-label="Previous slide">
                            <FiChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className='p-2 rounded-full bg-white shadow-md hover:bg-pink-100 text-pink-600 transition-colors'
                            aria-label="Next slide">
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </div>
                <div className='relative overflow-hidden'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            visibleProducts.map((product) => (
                                <div key={product.id}
                                    className='bg-white rounded-lg shadow-md overflow-hidden transition-all 
                                    duration-300 hover:scale-105'>
                                    <div className='relative'>
                                        <img src={product.image_url} alt={product.name}
                                            className='w-full h-64 object-cover' />
                                        {
                                            product.discount > 0 && (
                                                <span className='absolute top-3 right-3 bg-red-500 text-white
                                                text-xs font-bold px-2 py-1 rounded-full'>
                                                    -{product.discount}%
                                                </span>
                                            )
                                        }

                                        <button className='absolute top-3 left-3 p-2 bg-white rounded-full 
                                       shadow-md hover:bg-pink-100 text-gray-700'
                                          onClick={() => onAddToWish(product)}>
                                            <FiHeart size={18} />
                                        </button>
                                    </div>
                                    <div className='p-4'>
                                        <div className='flex items-center mb-2'>
                                            {
                                                [...Array(5)].map((_, i) => (
                                                    <FiStar key={i} size={16}
                                                        className={i < Math.floor(product.rating)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'}
                                                    />))}
                                            <span className='text-sm text-gray-500 ml-1'>
                                                ({product.rating})
                                            </span>
                                        </div>
                                        <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                                            {product.name}
                                        </h3>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <span className='text-lg font-bold text-pink-600'>
                                                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                                </span>
                                                {
                                                    product.discount > 0 && (
                                                        <span className='text-sm text-gray-500 line-through ml-2' >
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                            </div>
                                            <button className='p-2.5 bg-pink-950 rounded-full text-white
                                             hover:bg-pink-700 transition-colors'
                                             onClick={() => onAddToCart(product)}>
                                                <FiShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='flex justify-center mt-6 space-x-2'>
                    {[...Array(totalSlides)].map((__, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-pink-950' : ' bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Products