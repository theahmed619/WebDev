import React from "react";

const SkillsCard = ({icons, title, value }) => {
  return (
    <div className="flex justify-between items-center mt-5 backdrop-blur-xl shadow-xl p-3 border-2 rounded-lg border-gray-400 mr-2">
      <h3 className="font-bold text-xl text-white mr-2"><span className="flex justify-center items-center gap-1.5">{icons}{title}</span></h3>
      <progress max="100" value={value} className="progress-bar" />
    </div>
  );
};

export default SkillsCard;