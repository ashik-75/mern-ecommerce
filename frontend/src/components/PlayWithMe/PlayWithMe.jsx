import React, { useState } from "react";
import PlayOne from "./PlayOne";

const PlayWithMe = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const store = <PlayOne />; //<PlayOne /> equevalnt to PlayOne();

  return (
    <div>
      <PlayOne />
    </div>
  );
};

export default PlayWithMe;
