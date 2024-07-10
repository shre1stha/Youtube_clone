import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material";


import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
// import fetchFromAPI from "../utils/fetchFromAPI";


const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");

  useEffect(() => {
    setVideos(null);
    setLoading(true);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
      });
    }, [selectedCategory]);

  const handleLoadMore = () => {
    setLoading(true);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&pageToken=${nextPageToken}`)
      .then((data) => {
        setVideos([...videos, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
      });
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        {/* <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2022 JSM Media
        </Typography> */}
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />

        {loading && <CircularProgress sx={{ mx: "auto", my: 2, display: "block" }} />}

        {!loading && nextPageToken && (
          <Box display="flex" justifyContent="center" my={2}>
            <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
