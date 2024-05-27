"use client";
import { useState } from 'react';

export default function Waiter() {
    const handlePrint = () => {
        window.print();
    };

    const waiters = [
        { name: 'Ajay', id: 1, status: 'Active' },
        { name: 'Neha', id: 2, status: 'Inactive' },
        { name: 'Ravi', id: 3, status: 'Active' },
        { name: 'Pooja', id: 4, status: 'Inactive' },
        { name: 'Vikram', id: 5, status: 'Active' },
    ];

    const [pendingItems, setPendingItems] = useState([
        { itemName: 'Pizza Sandwich', count: 1, tableNo: 1, waiterName: '' },
        { itemName: 'Cheese Maggie', count: 2, tableNo: 2, waiterName: '' },
        { itemName: 'Samosa', count: 1, tableNo: 3, waiterName: '' },
    ]);

    const availableWaiters = ['Ajay', 'Neha', 'Ravi', 'Pooja', 'Vikram'];

    const handleWaiterChange = (index: number, newWaiterName: string) => {
        const updatedItems = pendingItems.map((item, i) =>
            i === index ? { ...item, waiterName: newWaiterName } : item
        );
        setPendingItems(updatedItems);
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-lg font-semibold mb-4 text-red-500">Serving Window</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
                        <div className="overflow-x-auto col-span-2">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="text-left text-sm">
                                        <th className="py-2 px-4 border-b">Item Name</th>
                                        <th className="py-2 px-4 border-b text-center">Count</th>
                                        <th className="py-2 px-4 border-b text-center">Table No</th>
                                        <th className="py-2 px-4 border-b">Waiter Name</th>
                                        <th className="py-2 px-4 border-b">Invoice</th>
                                        <th className="py-2 px-4 border-b text-center">Served</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingItems.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="py-2 px-4 border-b">{item.itemName}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.count}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.tableNo}</td>
                                            <td className="py-2 px-4 border-b">
                                                <select
                                                    value={item.waiterName}
                                                    onChange={(e) => handleWaiterChange(index, e.target.value)}
                                                    className="border border-gray-300 rounded-md p-1"
                                                >
                                                    {availableWaiters.map((waiter, i) => (
                                                        <option key={i} value={waiter}>
                                                            {waiter}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-2 px-4 border-b hover:text-red-500 cursor-pointer" onClick={handlePrint}>
                                                Print
                                            </td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="overflow-x-auto col-span-1">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="text-left text-sm">
                                        <th className="py-2 px-4 border-b text-center">ID</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waiters.map((waiter, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="py-2 px-4 border-b text-center">{waiter.id}</td>
                                            <td className="py-2 px-4 border-b">{waiter.name}</td>
                                            <td className={`py-2 px-4 border-b text-center ${waiter.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{waiter.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
