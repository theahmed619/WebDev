import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


// 1. Manually define the content for each event ID
const eventData = {
  1: {
    title: "Happy Diwali",
    image: "https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg",
    description: "Wishing you a bright and joyful Diwali!",
  },
  2: {
    title: "Happy New Year",
    image: "https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg",
    description: "Cheers to a fantastic new year ahead!",
  },
  //   2: {
  //   title: "Raksha Bandhan",
  //   image: "htt://res.clouinary.com/diw52naci/image/upload/v1762338843/IMG_20251105_155832_fsiuy.png",
  //   description: "Bond of Protection",
  // },
  3: {
    title: "Eid Mubarak",
    image: "https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg",
    description: "May this special day bring peace, happiness, and prosperity.",
  },
  4: {
    title: "Merry Christmas",
    image: "https://www.shutterstock.com/image-vector/coming-soon-speechbubble-advertising-megaphone-600nw-2511768889.jpg",
    description: "Wishing you all the joys of the Christmas season.",
  },
};

function EventDetail() {
  const { id } = useParams(); // 2. Get the ID from the URL
  const event = eventData[id]; // 3. Find the matching event

  // 4. If no event matches the ID, show the Not Found page
  if (!event) {
    return <NotFound />;
  }

  // 5. Render the event details
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 min-h-screen">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;