import React from 'react';

interface Order {
    itemName: string;
    count: number;
    rate: number;
    totalAmt: number;
    time: string;
    tableNo: number;
    waiterName: string;
    likes: number;
}

const orders: Order[] = [
    {
        itemName: "Pasta",
        count: 2,
        rate: 150,
        totalAmt: 300,
        time: "12:30 PM",
        tableNo: 5,
        waiterName: "Ajay",
        likes: 23,
    },
    {
        itemName: "Pizza Sandwich",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Neha",
        likes: 54,
    },
    {
        itemName: "Cheese Maggie",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Ravi",
        likes: 22,
    },
    {
        itemName: "Samosa",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Pooja",
        likes: 27,
    },
    {
        itemName: "Garlic Nan",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Vikram",
        likes: 20,
    }
];

const Manager: React.FC = () => {
    const sortedMenus = orders.sort((a, b) => b.likes! - a.likes!);
    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 py-4 border">
                <div className="col-span-1 flex flex-col gap-2 w-full">
                    <h1 className="text-red-500 font-semibold">Recent Orders</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="text-left text-sm">
                                    <th className="border border-gray-300 px-4 py-2">Item Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Time</th>
                                    <th className="border border-gray-300 px-4 py-2">Table No</th>
                                    <th className="border border-gray-300 px-4 py-2">Waiter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{order.itemName}</td>
                                        <td className="border border-gray-300 px-4 py-2">₹{order.totalAmt}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.time}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.tableNo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.waiterName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-1 grid grid-cols-3 gap-2">
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">89</p>
                        <p className="text-center">No. of Customers</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">6</p>
                        <p className="text-center">No. of Chefs</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">4</p>
                        <p className="text-center">No. of Serving Staff</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">14</p>
                        <p className="text-center">No. of Employees</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">25</p>
                        <p className="text-center">No. of Food Items</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2 py-4">
                        <p className="text-2xl font-semibold">126</p>
                        <p className="text-center">No. of Orders</p>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 py-4 border">
                <div className="col-span-1 flex flex-col gap-2 w-full">
                    <h1 className="text-red-500 font-semibold">Best Seller Menus</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="text-left text-sm">
                                    <th className="border border-gray-300 px-4 py-2">Item Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Likes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedMenus.map((order, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{order.itemName}</td>
                                        <td className="border border-gray-300 px-4 py-2">₹{order.totalAmt}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.likes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-2 w-full">
                    <h1 className="text-red-500 font-semibold">Customers</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="text-left text-sm">
                                    <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Latest Order Time</th>
                                    <th className="border border-gray-300 px-4 py-2">Favorite Item</th>
                                </tr>
                            </thead>
                            <tbody>
            <tr>
                <td className="border border-gray-300 px-4 py-2">Rahul Sharma</td>
                <td className="border border-gray-300 px-4 py-2">₹500</td>
                <td className="border border-gray-300 px-4 py-2">12:30 PM</td>
                <td className="border border-gray-300 px-4 py-2">Pasta</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">Sneha Patel</td>
                <td className="border border-gray-300 px-4 py-2">₹250</td>
                <td className="border border-gray-300 px-4 py-2">12:45 PM</td>
                <td className="border border-gray-300 px-4 py-2">Pizza Sandwich</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">Amit Gupta</td>
                <td className="border border-gray-300 px-4 py-2">₹150</td>
                <td className="border border-gray-300 px-4 py-2">1:00 PM</td>
                <td className="border border-gray-300 px-4 py-2">Cheese Maggie</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">Priya Singh</td>
                <td className="border border-gray-300 px-4 py-2">₹300</td>
                <td className="border border-gray-300 px-4 py-2">1:15 PM</td>
                <td className="border border-gray-300 px-4 py-2">Samosa</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">Vikram Kumar</td>
                <td className="border border-gray-300 px-4 py-2">₹200</td>
                <td className="border border-gray-300 px-4 py-2">1:30 PM</td>
                <td className="border border-gray-300 px-4 py-2">Garlic Nan</td>
            </tr>
        </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Manager;
