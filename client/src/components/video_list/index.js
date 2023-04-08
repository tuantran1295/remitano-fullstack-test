import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoItem from '../video_item/index'

const Videos = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/funny-api/videos`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='grid grid-cols-2 max-[1366px]:grid-cols-1 gap-[32px]'>
      {
      video.map((video, index) => (
          <div key={index}>
            <VideoItem videoData={video}>
            </VideoItem>
          </div>
      ))
      }
    </div>
  );
};

export default Videos;
