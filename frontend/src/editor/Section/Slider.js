import React, { useEffect, useState } from 'react';
import { useToggle } from '../../config';
import Element from '../Components/Element';
import Layer from '../Components/Layer';
import Page from '../Components/Page';
import Style from '../Components/Style';

export default function Slider() {
  const { Menu,subMenu, setSubMenu, GJinitRef, blocks,subcatatory } = useToggle();
  const [uniqueCategories, setUniqueCategories] = useState([]);


  const handleDeselect = () => {
    if (GJinitRef.current) {
      const editor = GJinitRef.current;
      editor.select(null);


    }
  };


  useEffect(() => {
    const uniqueCategories = [
      ...new Set(
        blocks
          .filter((page) => page.category === Menu) // Filter by the category
          .map((page) => page.subcategory) // Get the subcategory
      )
    ];

    setUniqueCategories(uniqueCategories)
  }, [blocks, Menu])


  useEffect(() => {

    const blockCategories = document.getElementsByClassName('gjs-block-category gjs-open');
    console.log(blockCategories);
        
    if (blockCategories) {
      // Loop through HTMLCollection using a for loop
      for (let i = 0; i < blockCategories.length; i++) {
        const category = blockCategories[i];
    
        // Find the child element with class "gjs-blocks-c"
        const childBlock = category.querySelector('.gjs-blocks-c').lastChild;
      
        // Check if the child element exists and whether it's empty or not
        
          if (childBlock === null) {
            // If empty, set display to 'none'
            category.style.display = 'none';
          } else {
            // If not empty, set display to 'block'
            category.style.display = 'block';
          }
      }
    }
    


  },[Menu,subMenu])

  return (
    <div className='Slider'>



      <div style={{ display: Menu === ("Layer") || Menu === ("Page") || Menu === ("Style") ? 'none' : 'block' }} className='search'>
        <div className="search-input-container">
          <input type="Search" placeholder="Search..." />
          <span className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
      <div className='overflow-auto'>
        <div style={{ display: Menu === ("Design") ? 'flex' : 'none' }} className='tabs'>
          <button onClick={() => { handleDeselect(); setSubMenu('All') }}>All</button>
          {subcatatory.map((category) => (
            <button key={category} onClick={() => { handleDeselect(); setSubMenu(category) }}>{category}</button>

          ))}
        </div>
        
        <div style={{ display: Menu === ("Element") ? 'flex' : 'none' }} className='tabs'>
          <button onClick={() => { handleDeselect(); setSubMenu('All') }}>All</button>
          {subcatatory.map((category) => (
            <button key={category} onClick={() => { handleDeselect(); setSubMenu(category) }}>{category}</button>

          ))} </div>
        </div>

        <Element />
      </div>
      <div style={{ display: Menu === "Layer" ? 'block' : 'none' }}>
        <Layer />
      </div>
      <div style={{ display: Menu === "Page" ? 'block' : 'none' }}>
        <Page />
      </div>
      <div style={{ display: Menu === "Style" ? 'block' : 'none' }}>
        <Style />
      </div>
    </div>
  );
}
