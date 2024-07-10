import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 500,
  },
  headers: {
    'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

// const options = {
//   params: {
//     maxResults: 10,
//   },
//   headers: {
//     'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
//   },
// };

// const App = () => {
//   const [videos, setVideos] = useState([]);
//   const [pageToken, setPageToken] = useState('');

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     const url = `search?q=react&part=snippet&type=video&pageToken=${pageToken}`;
//     const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//     setVideos([...videos, ...data.items]);
//     setPageToken(data.nextPageToken);
//   };

//   const loadMore = () => {
//     fetchVideos();
//   };

//   return (
//     <div>
//       <h1>React Videos</h1>
//       <InfiniteScroll
//         dataLength={videos.length}
//         next={loadMore}
//         hasMore={!!pageToken}
//         loader={<h4>Loading...</h4>}
//       >
//         {videos.map((video) => (
//           <div key={video.id.videoId}>
//             <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
//             <h2>{video.snippet.title}</h2>
//             <p>{video.snippet.description}</p>
//           </div>
//         ))}
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default App;
