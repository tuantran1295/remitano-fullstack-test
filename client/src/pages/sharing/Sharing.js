import React, { useState, useEffect } from "react";
// import { RootStoreContext } from '../../store/rootStore';
import { observer } from "mobx-react";
import Header from "../../components/header/index";
import "../../styles/sharing.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SharingPage = observer(() => {
  //   const rootStore = useContext(RootStoreContext);

  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const navigate = useNavigate();
  const youtubeLinkRegex =/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  const checkLogin = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login') 
    }
    else return;
  }

  useEffect(() => {
    checkLogin() 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/funny-api/video`, {
          url: videoUrl,
          video_id: videoId
        });
        setIsError(false)
        setMessage(response.data.message)
        return response;
      } catch (error) {
        setIsError(true)
        setMessage(error.response.data.message)
      }
  };

  const handleChange = (e) => {
    const link =  e.target.value
    const extractedVideoId = extractVideoId(link);
    youtubeLinkRegex.test(e.target.value) ?  setIsLinkValid(true) : setIsLinkValid(false)
    setVideoId(extractedVideoId); 
    setVideoUrl(e.target.value);
  };

  const closePopUp = () => {
    setMessage('')
  }

  function extractVideoId(link) {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = link.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  return (
    <div className="w-full h-full">
      <Header isSharing></Header>
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="w-[500px] h-[300px] flex flex-col rounded-lg bg-white shadow-box-sharing py-[32px] px-[20px] justify-between">
            <div>
              <p className="user-action-link font-mono text-[blue] font-bold text-[21px]">
                Share a Youtube movie
              </p>
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <p className="text-[16px] font-mono">Youtube URL:</p>
              <input
                name="videoTitle"
                required
                type="text"
                onChange={handleChange}
                className="w-full outline-none rounded h-[40px] pl-3 border border-solid border-black focus:border-[blue] hover:border-[blue]"
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type={"submit"}
                disabled={isLinkValid ? false : true}
                className="bg-[blue] text-white hover:bg-[darkblue] w-6/12 rounded-md outline-none p-3 disabled:text-gray-400 disabled:bg-gray-700"
              >
                Share
              </button>
            </div>
          </div>
        </form>
      </div>
      {
        message && 
        <div className='register-overlay justify-center'>
            <div className='rounded-lg shadow-lg p-10 bg-white justify-center flex flex-col gap-8 mt-[350px]'>
                <div className='text-[24px]'>
                    <p className={isError ? 'text-[red]' : 'text-[blue]'}>
                       {message}
                    </p> 
                </div>
                <div className='text-center'>
                    <button onClick={closePopUp} className='p-2 bg-[blue] hover:bg-[darkblue] text-white rounded-md w-[100px] text-[20px] font-mono font-bold'>
                        Ok
                    </button>
                </div>
            </div>
        </div>
      }
    </div>
  );
});

export default SharingPage;
