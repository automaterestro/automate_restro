// app/components/foodMenu.tsx

import React from 'react';
import foodItems, { FoodItem } from '../data/foodItems';

const FoodMenu: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4">
            <h1 className="text-lg bg-indigo-600 text-white w-full text-center py-2 font-semibold mb-4">Restro Menu</h1>
            <ul className="w-full gap-2 flex flex-col">
                {foodItems.map((item: FoodItem) => (
                    <li key={item.id} className='border-b pb-2 w-full'>
                        <div className="flex gap-6 items-center justify-between">
                            <span className="font-semibold text-red-500">{item.name}</span>
                            <span>₹{item.price}</span>
                            <div className='flex gap-2'>
                                <label htmlFor={`sizes-${item.id}`} className="">Sizes:</label>
                                <select id={`sizes-${item.id}`} className="border">
                                    {item.sizes.map((size, index) => (
                                        <option key={index} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor={`count-${item.id}`}>Count:</label>
                                <input
                                    id={`count-${item.id}`}
                                    type="number"
                                    defaultValue={1}
                                    min={1}
                                    className="border w-20"
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='flex justify-between mt-4'>
                <a className="py-2 px-3">Total Amount : </a>
                <a className="py-2 px-3 border-2 rounded hover:bg-indigo-600 hover:text-white">Pay using UPI/Card</a>
            </div>
        </div>
    );
}

export default FoodMenu;
