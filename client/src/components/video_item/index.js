import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/video_item.css';
import YouTube from 'react-youtube';


const VideoItem = (props) => {
  const [videoDetail, setVideoDetail] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/video/${props.videoData.video_id}`)
        .then((response) => {
          setVideoDetail(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchVideoData();
  },[props]);

  const opts = {
    height: '290',
    width: '100%',
    origin: window.location.origin,
  };  
  
  return (
    <div className='bg-gray-100 h-full cursor-pointer transition-all ease-in-out'>
      {videoDetail && (
        <div className="h-full flex justify-start p-6 gap-5 rounded-[16px] video-item">
          <div className='w-[60%]'>
            <YouTube style={{ width: '100%' }} opts={opts} videoId={props.videoData.video_id} />
          </div>
          <div className="flex flex-col gap-3 w-[40%]">
            <div>
              <a href={props.videoData.url}>
                <p className="text-[20px] text-[blue] max-h-[100px] overflow-hidden text-ellipsis line-clamp-3 video-title">
                  {videoDetail.snippet.title}
                </p>
              </a>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='text-[18px]'>
                  Shared by:  
                </p>
                <p className="text-[16px] text-[darkblue]">
                    {videoDetail.snippet.channelTitle}
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-[18px]'>
                    Description:
                </p>
                <div className='video-description text-[14px] max-h-27 overflow-hidden text-ellipsis line-clamp-4'>
                    {videoDetail.snippet.description}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
