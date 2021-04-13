import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ LibraryStatus, setLibStatus }) => {
  return (
    <nav>
      <h1> Waves</h1>
      <button onClick={() => setLibStatus(!LibraryStatus)} className="lib-btn">
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
