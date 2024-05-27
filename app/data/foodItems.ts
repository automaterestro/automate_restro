// app/data/foodItems.ts

export interface FoodItem {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrl: string;
    sizes: string[];
}

export const foodItems: FoodItem[] = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 250,
        category: "Pizza",
        description: "Classic margherita pizza with fresh mozzarella and basil.",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 2,
        name: "Pasta Carbonara",
        price: 300,
        category: "Pasta",
        description: "Creamy pasta carbonara with pancetta and parmesan.",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 3,
        name: "Caesar Salad",
        price: 200,
        category: "Salad",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 4,
        name: "Chicken Burger",
        price: 180,
        category: "Burger",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 5,
        name: "Chocolate Cake",
        price: 150,
        category: "Dessert",
        description: "Rich chocolate cake with a molten chocolate center.",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 6,
        name: "Lemonade",
        price: 80,
        category: "Beverage",
        imageUrl: "/dhokla.avif",
        sizes: ["Small", "Medium", "Large", "XL"],
    },
];

export default foodItems;
