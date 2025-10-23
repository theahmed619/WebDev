"use client";
import React, { useState, useEffect } from "react";

const page = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setselectedMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
      setselectedMeme(data.data.memes[0]);
      console.log("meme data = ", data.data.memes);
    };

    fetchMemes();
  }, []);

  // Handle meme selection
  const handleChange = (e) => {
    const memeId = e.target.value;
    const meme = memes.find((m) => m.id == memeId);
    setselectedMeme(meme);
  };

  const downloadMeme = () => {
    if (!selectedMeme) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    (img.crossOrigin = "anonymous"), (img.src = selectedMeme.url);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Text Styling
      ctx.font = "bold 70px black";
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      // Top Text
      ctx.strokeText(topText.toUpperCase(), canvas.width - 350, 300);
      ctx.fillText(topText.toUpperCase(), canvas.width - 350, 300);

      // Bottom Text
      ctx.strokeText(
        bottomText.toUpperCase(),
        canvas.width - 350,
        canvas.height - 200
      );
      ctx.fillText(
        bottomText.toUpperCase(),
        canvas.width - 350,
        canvas.height - 200
      );

      // convert to image and trigger download
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div>
      <div className="container text-center mt-5">
        <h1 className="mb-4 text-primary">🔥 Meme Generator 🔥</h1>

        {/* Meme Selection Dropdown */}
        <div className="mb-3">
          <select className="form-select" onChange={handleChange}>
            {memes.map((meme) => (
              <option key={meme.id} value={meme.id}>
                {meme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Meme Preview */}
        {selectedMeme && (
          <div className="position-relative d-inline-block">
            <img
              src={selectedMeme.url}
              width={400}
              height={400}
              alt="meme"
              className="img-fluid rounded"
            />

            <p className="position-absolute top-0 start-50 translate-middle-x text-black fw-bold fs-4">
              {topText}
            </p>
            <p className="position-absolute bottom-0 start-50 translate-middle-x text-black fw-bold fs-4">
              {bottomText}
            </p>
          </div>
        )}

        {/* input feidls */}
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Top text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Bottom text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
        </div>

        {/* Download Button */}
        <button className="btn btn-success mt-3" onClick={downloadMeme}>
          Download meme
        </button>
      </div>
    </div>
  );
};

export default page;