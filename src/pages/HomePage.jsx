import React, { useEffect } from "react";
import PinList from "../components/PinList";
import { Box, Pagination } from "@mui/material";
import { LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { usePinContext } from "../contexts/PinContext";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getPins, pageTotalCount, page, setPage } = usePinContext();

  useEffect(() => {
    getPins();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      _page: page,
      _limit: LIMIT,
    });
  }, [page]);

  return (
    <div>
      <div>
        <PinList />
        <Box
          sx={{
            maxWidth: "max-content",
            margin: "30px auto",
            cursor: "pointer",
          }}
        >
          <Pagination
            count={pageTotalCount}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
