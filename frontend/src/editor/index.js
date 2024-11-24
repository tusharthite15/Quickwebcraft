import './index.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Section/Navbar';
import Menu from './Section/Menu';
import Slider from './Section/Slider';
import Canvas from './Section/Frame';
import FeedbackTrigger from './Components/FeedbackTrigger';
import { toast } from "react-toastify";
import { TriggerComponentClick, FetchSiteData } from './Modules/Grapesjs';





function Editor() {
  const { projectid } = useParams();
  FetchSiteData(projectid);
  TriggerComponentClick();

  return (
    <>
      <div className="Editor ">
        <Navbar />
        <div className='App'>
          <Menu />
          <Slider />
          <Canvas projectid={projectid} />

        </div>


        <div className='fixed bottom-8 right-8 z-50'>
        <FeedbackTrigger toast={toast} />
      </div>
      
      </div>
   
    </>
  );
}

export default Editor;
