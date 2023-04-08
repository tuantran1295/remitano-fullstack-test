import React from 'react';
import Header from "../../components/header/index";
import Videos from "../../components/video_list/index";



const HomePage = () => {

  return (
    <div className='w-full h-full'>
      <Header></Header>
      <div className='bg-gray-50 mt-[100px] px-[48px] pt-[48px]'>
        <Videos></Videos>
      </div>
    </div>
  );
};

export default HomePage;