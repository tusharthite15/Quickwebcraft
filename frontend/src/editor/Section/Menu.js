import React from 'react'
import { SiCloudflarepages,SiOpenai } from "react-icons/si";
import { LiaElementor } from "react-icons/lia";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { useToggle } from '../../config';


export default function Modules() {
  const { Menu, setMenu, GJinitRef,setSubMenu } = useToggle();

  const handleDeselect = () => {
    if (GJinitRef.current) {
      const editor = GJinitRef.current;
        editor.select(null);
    }
  };


  return (
    <div className='Menu'>
    <button onClick={() => { handleDeselect(); setMenu('Design'); setSubMenu('All') }} className={Menu === "Design" ? 'activebtn' : ''}>
      <MdOutlineDesignServices />
      <div className='btntxt'>Design</div>
    </button>
      <button onClick={() => { handleDeselect(); setMenu('Element'); setSubMenu('All') }} className={Menu === "Element" ? 'activebtn' : ''}>
        <LiaElementor />
        <div className='btntxt'>Element</div>
      </button>
      <button onClick={() => { handleDeselect(); setMenu('Layer') }} className={Menu === "Layer" ? 'activebtn' : ''}>
        <IoLayersOutline />
        <div className='btntxt'>Layer</div>
      </button>
      <button onClick={() => { handleDeselect(); setMenu('Page') }} className={Menu === "Page" ? 'activebtn' : ''}>
        <SiCloudflarepages />
        <div className='btntxt'>Page</div>
      </button>
      <button onClick={() => { handleDeselect(); setMenu('Ai') }} className={Menu === "Ai" ? 'activebtn' : ''}>
        <SiOpenai />
        <div className='btntxt'>Ai</div>
      </button>

    </div>
  )
}
