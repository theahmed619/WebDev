import { NextResponse } from "next/server";

// => http://localhost:3000/api/products/search?query=iphone&price=999
let products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 999,
    category: "Phones",
    userRating: 4.8,
  },
  {
    id: 2,
    title: "iPhone 16 Pro",
    price: 2099,
    category: "Phones",
    userRating: 4.5,
  },
  {
    id: 3,
    title: "Dell XPS 15",
    price: 1499,
    category: "Laptops",
    userRating: 4.7,
  },
  {
    id: 4,
    title: "Canon EOS R5",
    price: 3499,
    category: "Cameras",
    userRating: 4.8,
  },
  {
    id: 5,
    title: "AirPods Pro 2",
    price: 249,
    category: "Earbuds",
    userRating: 4.7,
  },
  { id: 6, title: "LG OLED C2", price: 1599, category: "TVs", userRating: 4.9 },
];

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  // console.log("searchParam = ", searchParams);

  const query = searchParams.get("query");
  const price = searchParams.get("price");

  const searchProduct = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.price == price
  );

  console.log("searchParams result = ", query, price);

  if (searchProduct.length == 0)
    return NextResponse.json({ message: "No product find", success: false });

  return NextResponse.json({
    message: "Query string",
    success: true,
    searchProduct,
  });
}
