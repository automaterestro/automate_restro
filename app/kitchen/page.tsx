"use client"
import { useState } from 'react';

export default function Kitchen() {
    const chefs = [
        { name: 'Amit', id: 1, status: 'Active' },
        { name: 'Anjali', id: 2, status: 'Inactive' },
        { name: 'Rahul', id: 3, status: 'Active' },
        { name: 'Priya', id: 4, status: 'Inactive' },
        { name: 'Suresh', id: 5, status: 'Active' },
    ];

    const [pendingItems, setPendingItems] = useState([
        { name: 'Pizza Sandwich', size: 'Large', comment: 'Do not add pepper', count: 1 },
        { name: 'Cheese Maggie', size: 'Medium', comment: 'Add extra cheese', count: 2 },
        { name: 'Samosa', size: 'Regular', comment: 'No Green Chatney', count: 1 },
    ]);

    const [completedItems, setCompletedItems] = useState([
        { name: 'Pizza Regular', size: 'Large', comment: 'Do not add pepper', count: 2 },
        { name: 'Garlic Nan', size: 'small', comment: 'Add extra cheese', count: 4 },
    ]);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold text-red-500">Automate Restro</h1>
                <h1 className="my-8">Kitchen Window</h1>
                <div className="grid grid-cols-3">
                    <div className='col-span-2'>
                        <div className="overflow-x-auto">
                            <h1 className="mx-8 mb-2 text-red-500 font-semibold">Prepare Items</h1>
                            <table className="bg-white border border-gray-200 mx-8">
                                <thead>
                                    <tr className="text-left font-semibold">
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Size</th>
                                        <th className="py-2 px-4 border-b">Comment</th>
                                        <th className="py-2 px-4 border-b text-center">Count</th>
                                        <th className="py-2 px-4 border-b text-center">Completed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingItems.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="py-2 px-4 border-b">{item.name}</td>
                                            <td className="py-2 px-4 border-b">{item.size}</td>
                                            <td className="py-2 px-4 border-b">{item.comment}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.count}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="overflow-x-auto mt-8">
                            <h1 className="mx-8 mb-2 font-semibold text-gray-500">Completed</h1>
                            <table className="bg-white border border-gray-200 mx-8">
                                <thead>
                                    <tr className="text-left font-semibold">
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Size</th>
                                        <th className="py-2 px-4 border-b">Comment</th>
                                        <th className="py-2 px-4 border-b text-center">Count</th>
                                        <th className="py-2 px-4 border-b text-center">Date/Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedItems.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="py-2 px-4 border-b">{item.name}</td>
                                            <td className="py-2 px-4 border-b">{item.size}</td>
                                            <td className="py-2 px-4 border-b">{item.comment}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.count}</td>
                                            <td className="py-2 px-4 border-b text-center">time span</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="overflow-x-auto col-span-1">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="text-left text-sm">
                                        <th className="py-2 px-4 border-b">ID</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chefs.map((chef, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="py-2 px-4 border-b">{chef.id}</td>
                                            <td className="py-2 px-4 border-b">{chef.name}</td>
                                            <td className={`py-2 px-4 border-b ${chef.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{chef.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </>
    );
}
