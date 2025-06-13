import React from 'react'
import { FiClock, FiGift, FiPercent } from 'react-icons/fi';

const Offers = () => {
    const currentOffers = [
        {
            id: 1,
            title: "Free Perfume Offer",
            description: "Get a free perfume when you buy two products from our luxury brands",
            discount:"30%",
            endDate: '2026-08-31',
            code: "SUMMER30",
            bgColor: "bg-amber-200",
            textColor: "text-amber-700"
        },
        {
            id: 2,
            title: "Buy 1 Get 1 Free",
            description: "Buy one selected fragrance and get another one absolutely free!",
             discount:"Gift",
            endDate: '2026-07-15',
            code: "BOGOF2026",
            bgColor: "bg-rose-100",
            textColor: "text-rose-700"
        },
        {
            id: 3,
            title: "Weekend Special",
            description: "20% off on all perfumes during weekends only. Don't miss out!",
            discount:"20%",
            endDate: '2026-12-31',
            code: "WEEKEND20",
            bgColor: "bg-teal-100",
            textColor: "text-teal-700"
        }
    ];

    return (

        <section id='offers' className='container scroll-mt-20 mx-auto px-4 py-12'>
            <h2 className='text-3xl font-bold text-center mb-2 text-amber-900'>Special Offers</h2>
            <p className='text-center text-gray-600 mb-12'> Take advantage of these limited-time offers </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    currentOffers.map((offer) => (
                        <div key={offer.id}
                            className={`${offer.bgColor} rounded-xl shadow-lg overflow-hidden transition-transform 
duration-300 hover:scale-105`}>
                            <div className='p-6'>
                                <div className='flex justify-between items-start mb-4'>
                                    <h3 className={`${offer.textColor} text-xl font-semibold`}>
                                        {offer.title}
                                    </h3>

                                    {offer.discount.includes('%') ? (
                                        <span className='bg-white rounded-full p-3 shadow-md'>
                                            <FiPercent className={`${offer.text} text-2xl`} />
                                        </span>
                                    ) : (
                                        <span className='bg-white rounded-full p-3 shadow-md'>
                                            <FiGift className={`${offer.textColor} text-2xl`} />
                                        </span>
                                    )
                                    }
                                </div>

                                <p className='text-gray-700 mb-6'>{offer.description}</p>
                                <div className='flex items-center text-gray-600 mb-6'>
                                    <FiClock className='mr-2' />
                                    <span>Ends on {offer.endDate}</span>
                                </div>
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <p className='text-sm text-gray-500 mb-1'>Use Code</p>
                                    <p className='font-mono font-bold text-lg'>{offer.code}</p>
                                </div>
                                <button className={`w-full py-3 rounded-lg ${offer.textColor} font-semibold border 
                                ${offer.textColor.replace('text', 'border')} hover:bg-white`}>
                                    Claim Offer
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default Offers