// import { useState, useEffect } from "react";
// import { Typography, Box } from "@mui/material";
// import { useParams } from "react-router-dom";

// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import { Videos } from "./";
// // import fetchFromAPI from "../utils/fetchFromAPI";

// const SearchFeed = () => {
//   const [videos, setVideos] = useState(null);
//   const { searchTerm } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
//       .then((data) => setVideos(data.items))
//   }, [searchTerm]);

//   return (
//     <Box p={2} minHeight="95vh">
//       <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
//         Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
//       </Typography>
//       <Box display="flex">
//         <Box sx={{ mr: { sm: '100px' } }}/>
//         {<Videos videos={videos} />}
//       </Box>
//     </Box>
//   );
// };

// export default SearchFeed;


import { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { searchTerm } = useParams();
  const loaderRef = useRef(null);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (!nextPageToken) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchFromAPI(`search?part=snippet&q=${searchTerm}&pageToken=${nextPageToken}`).then((data) => {
          setVideos([...videos, ...data.items]);
          setNextPageToken(data.nextPageToken);
        });
      }
    }, options);

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextPageToken, searchTerm, videos]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {videos && <Videos videos={videos} />}
      </Box>
      {nextPageToken && <div ref={loaderRef}></div>}
    </Box>
  );
};

export default SearchFeed;


