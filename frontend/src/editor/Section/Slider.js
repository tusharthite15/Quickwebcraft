import React, { useEffect, useState } from 'react';
import { useToggle } from '../../config';
import Element from '../Components/Element';
import Layer from '../Components/Layer';
import Page from '../Components/Page';
import Style from '../Components/Style';
import Ai from '../Ai/AI';

export default function Slider() {
  const { Menu, subMenu, setSubMenu, GJinitRef, blocks, subcatatory } = useToggle();
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
      ),
    ];

    setUniqueCategories(uniqueCategories);
  }, [blocks, Menu]);

  const handleSubcategoryClick = (category) => {
    handleDeselect();
    setSubMenu(category);
  };

  return (
    <div className="Slider">
      <div
        style={{ display: Menu === 'Layer' || Menu === 'Ai' || Menu === 'Page' || Menu === 'Style' ? 'none' : 'block' }}
        className="search"
      >
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
        <div className="overflow-auto">
          <div style={{ display: Menu === 'Design' ? 'flex' : 'none' }} className="tabs">
            <button onClick={() => handleSubcategoryClick('All')}>All</button>
            {subcatatory.map((category) => (
              <button
                key={category}
                className={subMenu === category ? 'active-tab' : ''}
                onClick={() => handleSubcategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{ display: Menu === 'Element' ? 'flex' : 'none' }} className="tabs">
            <button onClick={() => handleSubcategoryClick('All')}>All</button>
            {subcatatory.map((category) => (
              <button
                key={category}
                className={subMenu === category ? 'active-tab' : ''}
                onClick={() => handleSubcategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pass `subMenu` to `Element` to render specific designs */}
        <Element subMenu={subMenu} />
      </div>
      <div style={{ display: Menu === 'Layer' ? 'block' : 'none' }}>
        <Layer />
      </div>
      <div style={{ display: Menu === 'Page' ? 'block' : 'none' }}>
        <Page />
      </div>
      <div style={{ display: Menu === 'Style' ? 'block' : 'none' }}>
        <Style />
      </div>
      <div style={{ display: Menu === 'Ai' ? 'block' : 'none' }}>
        <Ai />
      </div>
    </div>
  );
}
