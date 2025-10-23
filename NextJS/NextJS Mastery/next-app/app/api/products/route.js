import { NextResponse } from "next/server";

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
  return NextResponse.json({
    message: "fetching all the products",
    success: true,
    products,
  });
}

export async function POST(req) {
  const data = await req.json();
  products.push(data);

  return NextResponse.json({
    message: "getting data from body",
    success: true,
    BodyData: data,
  });
}

// update product
// => http://localhost:3000/api/products?id=1

export async function PUT(req) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  const updatedProduct = await req.json();

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products[i].title = updatedProduct.title;
      products[i].category = updatedProduct.category;
      products[i].price = updatedProduct.price;
      products[i].userRating = updatedProduct.userRating;
    }
  }

  return NextResponse.json({
    message: "Your product has been updated Successfully...!",
    success: true,
    products,
  });
}

// delete product by id
export async function DELETE(req) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  products = products.filter((product) => product.id != id);

  return NextResponse.json({
    message: "Your product has been delete Successfully...!",
    success: true,
    products,
  });
}