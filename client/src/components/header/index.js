import React, { useEffect }  from 'react';
import { useRootStore } from '../../store/rootStore';
import "../../styles/header.css"
import { observer } from "mobx-react";
import { toJS } from 'mobx';

const Header = observer((props) => {
  const rootStore = useRootStore();
  const data = toJS(rootStore);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      rootStore.setUserInfo(userInfo);
    }
  }, []);

  const renderUserAction = () => {
    var HTMLUserAction = ''
    if (!data.userInfo) {
        HTMLUserAction = 
        <div className='flex gap-10 justify-end items-center h-full'>
            <div  className='text-[20px] flex items-center font-san underline-offset-1 h-full'>
               <p className='mb-[4px]'> You are currently not logged in.</p>
            </div>
            <div className='flex gap-3.5 h-full justify-end items-center'>
                <a href="/login">
                    <button
                        className="bg-[blue] hover:bg-[darkblue] rounded-[8px] outline-none border-none p-[12px] text-white w-full max-w-[200px]"
                    >
                        Login
                    </button>
                </a>
                <p className='mb-[4px] text-[18px] text-[grey]'>
                    or
                </p>
                <a href="/register">
                    <button
                        className="bg-[blue] hover:bg-[darkblue] rounded-[8px] outline-none border-none p-[12px] text-white w-full max-w-[200px]"
                    >
                        Register
                    </button>
                </a>
            </div>
        </div>
    }
    else {
        HTMLUserAction = 
        <div className='flex gap-12 justify-end items-center h-full'>
            <div  className='text-[20px] flex items-center font-san underline-offset-1 h-full'>
               <p className='mb-[4px]'> Welcome {data.userInfo.email}</p>
            </div>
            <div className='flex gap-10 h-full justify-end items-center'>
                {
                    !props.isSharing &&
                    <a href="/sharing">
                        <button
                            className="bg-[blue] hover:bg-[darkblue] rounded-[8px] outline-none border-none p-[12px] text-white w-full max-w-[200px]"
                        >
                            Share a movie
                        </button>
                    </a>
                }
                <a href="/login">
                    <button
                        className="bg-[blue] hover:bg-[darkblue] rounded-[8px] outline-none border-none p-[12px] text-white w-full max-w-[200px]"
                    >
                        Logout
                    </button>
                </a>
            </div>
        </div>
    }
    return HTMLUserAction;
  }

  return (
    <div className='w-screen fixed z-50 h-[80px] bg-white top-0 shadow-header'>
        <div className='w-full flex justify-between py-3 px-[40px] h-full items-center'>
            <div>
                <a href="/">
                    <div className="flex flex-col logo">
                        <img
                            src="/funny-videos-logo.png"
                            alt="logo" width="80"/>
                    </div>
                </a>
            </div>
            <div className='h-full'>
               {renderUserAction()}
            </div>
        </div>
    </div>
  );
});

export default Header;