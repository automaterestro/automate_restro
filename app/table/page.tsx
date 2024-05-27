export default function Table() {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold text-red-500">Automate Restro</h1>
                <h1 className="mt-8">Table No. 1</h1>
                <div className="grid grid-cols-2 mt-4 p-4 rounded-lg border-2 border-gray-500">
                    <div className="col-span-1 flex justify-center items-center">
                        <img src="qr-code.webp" alt="QR Code" className="h-48 w-48" />
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <p className="text-lg text-center">Scan QR <br /> & <br /> Order Your Food!</p>
                    </div>
                </div>
            </div>
        </>
    );
}
