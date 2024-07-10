import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
// import fetchFromAPI from "../utils/fetchFromAPI";


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  
  
  // useEffect(() => {
  //   const fetchResults = async () => {
  //     const channelData = await fetchFromAPI(`channels?part=snippet&id=${id}`);
  //     setChannelDetail(channelData?.items[0]);
  
  //     const maxResults = 50;
  //     let videosData = [];
  //     let nextPageToken = null;
  
  //     do {
  //       const pageToken = nextPageToken ? `&pageToken=${nextPageToken}` : '';
  //       const result = await fetchFromAPI(`search?channelId=${id}&part=snippet,id&order=date&maxResults=${maxResults}${pageToken}`);
  
  //       videosData = videosData.concat(result.items);
  //       nextPageToken = result.nextPageToken;
  //     } while (nextPageToken);
  
  //     setVideos(videosData);
  //   };
  
  //   fetchResults();
  // }, [id]);
  

  
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Box } from "@mui/material";

// import { Videos, ChannelCard } from "./";
// import { fetchFromAPI } from "../utils/fetchFromAPI";

// const ChannelDetail = () => {
//   const [channelDetail, setChannelDetail] = useState();
//   const [videos, setVideos] = useState(null);
//   const [nextPageToken, setNextPageToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const { id } = useParams();
//   const observerRef = useRef(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
//       setChannelDetail(data?.items[0]);
//       loadMoreVideos(null);
//     };

//     fetchResults();
//   }, [id]);

//   // useEffect(() => {
//   //   const options = {
//   //     rootMargin: "0px",
//   //     threshold: 1.0
//   //   };

//   //   const handleObserver = (entries) => {
//   //     const target = entries[0];
//   //     if (target.isIntersecting && !isLoading && nextPageToken) {
//   //       setIsLoading(true);
//   //     }
//   //   };

//   //   observerRef.current = new IntersectionObserver(handleObserver, options);

//   //   const element = document.querySelector(".infinite-scroll");
//   //   if (element) {
//   //     observerRef.current.observe(element);
//   //   }

//   //   return () => {
//   //     if (observerRef.current) {
//   //       observerRef.current.disconnect();
//   //     }
//   //   };
//   // }, [isLoading, nextPageToken]);

//   useEffect(() => {
//     const options = {
//       rootMargin: "0px",
//       threshold: 1.0
//     };
  
//     const handleObserver = (entries) => {
//       const target = entries[0];
//       if (target.isIntersecting && !isLoading && nextPageToken) {
//         setIsLoading(true);
//       }
//     };
  
//     observerRef.current = new IntersectionObserver(handleObserver, options);
  
//     const element = document.querySelector(".infinite-scroll");
//     if (element) {
//       observerRef.current.observe(element);
//     }
  
//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [isLoading, nextPageToken, observerRef]);
  
//   const loadMoreVideos = async (pageToken) => {
//     const nextPage = pageToken ? `&pageToken=${pageToken}` : "";
//     const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50${nextPage}`);
  
//     if (videosData) {
//       setVideos(prevVideos => prevVideos ? [...prevVideos, ...videosData.items] : videosData.items);
//       setNextPageToken(videosData.nextPageToken);
  
//       if (videosData.nextPageToken) {
//         await loadMoreVideos(videosData.nextPageToken);
//       }
//     }
//     setIsLoading(false);
//   }
  
//   return (
//     <Box minHeight="95vh">
//       <Box>
//         <div style={{
//           height: '300px',
//           background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
//           zIndex: 10,
//         }} />
//         <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
//       </Box>
//       <Box p={2} display="flex">
//         <Videos videos={videos} />
//         {isLoading && <div>Loading...</div>}
//         {nextPageToken && (
//           <div className="infinite-scroll" ref={observerRef}>
//             {isLoading ? "Loading..." : "Scroll down to load more"}
//           </div>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ChannelDetail;
