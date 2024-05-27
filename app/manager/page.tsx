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
        itemName: "Pizza Sandwich",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    },
    {
        itemName: "Cheese Maggie",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    },
    {
        itemName: "Samosa",
        count: 1,
        rate: 250,
        totalAmt: 250,
        time: "12:45 PM",
        tableNo: 3,
        waiterName: "Doe",
    },
    {
        itemName: "Garlic Nan",
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
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 py-4 border">
                <div className="col-span-1 flex flex-col gap-2 w-full">
                    <h1 className="text-red-500 font-semibold">Recent Orders</h1>
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col gap-2 p-4 border-2">
                            <div className="flex justify-between flex-wrap">
                                <span className="text-red-500 font-semibold">{order.itemName}</span>
                                <span>{order.count}</span>
                                <span>₹{order.rate}</span>
                                <span>Total: ₹{order.totalAmt}</span>
                                <span>Time: {order.time}</span>
                                <span>Table No: {order.tableNo}</span>
                                <span>Waiter: {order.waiterName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-1 grid grid-cols-3 gap-2">
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">89</p>
                        <p className="text-center">No. of Customers</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">6</p>
                        <p className="text-center">No. of Chefs</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">4</p>
                        <p className="text-center">No. of Serving Staff</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">14</p>
                        <p className="text-center">No. of Employees</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">25</p>
                        <p className="text-center">No. of Food Items</p>
                    </div>
                    <div className="col-span-1 flex flex-col h-full items-center justify-center border-2">
                        <p className="text-2xl font-semibold">126</p>
                        <p className="text-center">No. of Orders</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
