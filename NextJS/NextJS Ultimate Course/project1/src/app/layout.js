import { Poppins} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const poppins=Poppins({subsets:["latin"],weight:['400','200'],display:'swap'})

export const metadata = {
  title: "Travel Guide",
  description: "Best Travel Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} w-screen h-screen bg-black  `}
      >
      <Nav/>
       <div className="mt-[100px]">
         {children}
       </div>
      </body>
    </html>
  );
}
