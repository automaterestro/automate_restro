"use client"
import React, { useState } from 'react';
import foodItems, { FoodItem } from '../data/foodItems';

// Define a type for items in the bill
type BillItem = {
    id: number;
    name: string;
    price: number;
    count: number;
};

const FoodMenu: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<BillItem[]>([]);

    // Function to handle adding items to the bill
    const addToBill = (item: FoodItem, count: number) => {
        const index = selectedItems.findIndex((i) => i.id === item.id);

        if (count > 0) {
            const newItem: BillItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                count: count,
            };

            if (index === -1) {
                setSelectedItems([...selectedItems, newItem]);
            } else {
                const updatedItems = [...selectedItems];
                updatedItems[index] = newItem;
                setSelectedItems(updatedItems);
            }
        } else {
            if (index !== -1) {
                const updatedItems = [...selectedItems];
                updatedItems.splice(index, 1);
                setSelectedItems(updatedItems);
            }
        }
    };

    // Function to calculate the total bill amount
    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + item.price * item.count, 0);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4">
            <h1 className="text-lg text-indigo-600 mb-4">Restro Menu</h1>
            <ul className="w-full gap-2 flex flex-col">
                {foodItems.map((item: FoodItem) => (
                    <li key={item.id} className='border-b pb-2 w-full'>
                        <div className="flex gap-6 items-center justify-between">
                            <div className='flex gap-4'>
                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-full" />
                                <div>
                                    <span className="font-semibold text-red-500">{item.name}</span><br />
                                    <span>₹{item.price}</span>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex gap-2'>
                                    <label htmlFor={`sizes-${item.id}`} className="">Sizes:</label>
                                    <select
                                        id={`sizes-${item.id}`}
                                        className="border"
                                        onChange={(e) => addToBill(item, parseInt(e.target.value))}
                                    >
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
                                        defaultValue={0}
                                        min={0}
                                        className="border w-20"
                                        onChange={(e) => addToBill(item, parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-3" id='bill'>
                <div className='col-span-2'>
                {selectedItems.length > 0 && (
                    <ul className="w-full gap-2 flex flex-col">
                        {selectedItems.map((item) => (
                            <li key={item.id} className='border-b pb-2 w-full'>
                                <div className="flex gap-6 items-center justify-between">
                                    <div className='flex gap-4'>
                                        <span className="font-semibold text-red-500">{item.name}</span><br />
                                        <span>₹{item.price} x {item.count} = ₹{item.price * item.count}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
                <li className='border-b pb-2 w-full col-span-1 list-none'>
                    <div className="flex gap-6 items-center justify-between">
                        <div className='flex gap-4'>
                            <span className="font-semibold text-red-500">Total Amount : </span><br />
                            <span>₹{calculateTotal()}</span>
                        </div>
                    </div>
                </li>
            </div>
            <div className='flex justify-between mt-4'>
                <a className="py-2 px-3 border-2 rounded hover:bg-indigo-600 hover:text-white cursor-pointer active:bg-red-500 select-none">Pay using UPI/Card</a>
            </div>
        </div>
    );
};

export default FoodMenu;
