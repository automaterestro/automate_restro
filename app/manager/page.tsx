interface Order {
    itemName: string;
    count: number;
    rate: number;
    totalAmt: number;
    time: string;
    tableNo: number;
    waiterName: string;
}

const orders: Order[] = [
    {
        itemName: "Pasta",
        count: 2,
        rate: 150,
        totalAmt: 300,
        time: "12:30 PM",
        tableNo: 5,
        waiterName: "John",
    },
    {
        itemName: "Pizza",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    },
    {
        itemName: "Pizza",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    },
    {
        itemName: "Pizza",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    }
];

export default function Manager() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center px-4">
            <h1>Dashboard</h1>
            <section className="grid grid-cols-2 gap-4 w-full px-4 py-4">
                <div className="grid grid-cols-1 col-span-1 gap-4 w-full">
                    <h1 className="text-red-500 font-semibold">Recent Orders</h1>
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col gap-2 p-4 border-2">
                            <div className="flex justify-between flex-wrap">
                                <span>Item: {order.itemName}</span>
                                <span>Count: {order.count}</span>
                                <span>Rate: ₹{order.rate}</span>
                                <span>Total Amount: ₹{order.totalAmt}</span>
                                <span>Time Served: {order.time}</span>
                                <span>Table No: {order.tableNo}</span>
                                <span>Waiter Name: {order.waiterName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 col-span-1 gap-2">
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">89</p>
                        <p>No. of Customers</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">6</p>
                        <p>No. of Chefs</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">4</p>
                        <p>No. of Serving Staff</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">14</p>
                        <p>No. of Employees</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">25</p>
                        <p>No. of Food Items</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">126</p>
                        <p>No. of Orders</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
