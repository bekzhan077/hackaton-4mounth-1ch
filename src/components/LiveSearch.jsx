import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePinContext } from "./../contexts/PinContext";
import Filter from "./Filter";

const LiveSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get("q") || "");
  const { setPage } = usePinContext();
  const [button, setButton] = useState(false);

  function handleButton() {
    setButton(!button);
  }

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      q: searchVal,
    });
    setPage(1);
  }, [searchVal]);
  return (
    <div className="search">
      <input
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        type="search"
        name=""
        placeholder=" &#128269; Search"
        id=""
      />
      <button
        onClick={handleButton}
        className="filter"
        style={{
          backgroundColor: "transparent",
          border: "2px solid black",
          fontWeight: "600",
          borderRadius: "0px",
          padding: "14px",
        }}
      >
        Filter
      </button>
      {button && <Filter />}
    </div>
  );
};

export default LiveSearch;
