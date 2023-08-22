import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePinContext } from "../contexts/PinContext";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../utils/consts";

const Filter = () => {
  const { setPage } = usePinContext();
  const [searchPar, setSearchPar] = useSearchParams();
  const [category, setCategory] = useState(searchPar.get("category") || "all");
  const handleChange = (_, val) => {
    val && setCategory(val);
  };

  useEffect(() => {
    const curPar = Object.fromEntries([...searchPar]);
    if (category === "all") {
      const { _limit, _page, q } = curPar;
      setSearchPar({
        _limit: LIMIT,
        _page: _page || 1,
        q: q || "",
      });
    } else {
      setSearchPar({
        ...curPar,
        category,
        _page: 1,
      });
      setPage(1);
    }
  }, [category]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={category}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        variant="error"
        sx={{
          border: "none",
          color: "red",
          fontWeight: 700,

          borderRadius: "25px",
        }}
        value="all"
      >
        All
      </ToggleButton>
      <ToggleButton
        sx={{
          border: "none",
          color: "red",
          fontWeight: 700,

          borderRadius: "50px",
        }}
        value="car"
      >
        Cars
      </ToggleButton>
      <ToggleButton
        sx={{
          border: "none",
          color: "red",
          fontWeight: 700,
          borderRadius: "50px",
        }}
        value="animal"
      >
        Animal
      </ToggleButton>
      <ToggleButton
        sx={{
          border: "none",
          color: "red",
          fontWeight: 700,
          borderRadius: "50px",
        }}
        value="anime"
      >
        Anime
      </ToggleButton>
      <ToggleButton
        sx={{
          border: "none",
          color: "red",
          fontWeight: 700,
          borderRadius: "50px",
        }}
        value="videogame"
      >
        VideoGames
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Filter;
