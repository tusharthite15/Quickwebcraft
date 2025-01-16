import axios from 'axios';
import { useToggle } from '../../config';
import '../index.css';
import React, { useEffect, useState } from 'react';

function Element() {
  const { Menu, GJinitRef, blocks, subMenu, setSubcatatory, setSubMenu } = useToggle();
  const [data, setData] = useState(null);
  const [nocatData, setNoCatData] = useState([]);

  // Helper function to fetch data from an API
  const fetchData = async (url, callback) => {
    try {
      const result = await axios.get(url);
      if (result.data) callback(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch subcategories for Menu
  useEffect(() => {
    if (Menu === 'Design' || Menu === 'Element') {
      fetchData(`${process.env.REACT_APP_API_URL}/getAllblocksbyCategories/${Menu}`, (data) => {
        setSubcatatory(data.subcategories);
      });
    }
  }, [Menu, setSubcatatory]);

  // Update blocks in GrapesJS block manager based on Menu and subMenu
  useEffect(() => {
    if (GJinitRef.current) {
      const blockManager = GJinitRef.current.Blocks;

      // Remove existing blocks
      blocks.forEach((block) => blockManager.remove(block.id));

      // Add new blocks based on category and subcategory
      blocks.forEach((block) => {
        if (block.category === Menu && (subMenu === 'All' || subMenu === block.subcategory)) {
          blockManager.add(block.id, {
            label: block.label,
            content: block.content,
            media: block.media,
            category: subMenu === 'All' ? block.subcategory : block.type,
          });
        }
      });
    }
  }, [Menu, GJinitRef, blocks, subMenu]);

  // Fetch block data when the Menu changes
  useEffect(() => {
    if (Menu === 'Design' || Menu === 'Element') {
      fetchData(`http://localhost:8080/getblockbysubcat/${Menu}`, setData);
    }
  }, [Menu]);

  // Fetch blocks based on subcategories
  useEffect(() => {
    if (Menu === 'Design' || Menu === 'Element') {
      fetchData(`http://localhost:8080/getblocksbysubCategories/${Menu}/${subMenu}`, setNoCatData);
    }
  }, [subMenu]);

  // Add component to GrapesJS editor
  const add = (event, html) => {
    const editor = GJinitRef.current;
    if (editor) {
      editor.addComponents(html || event.target.innerHTML);
    }
  };

  // Component for rendering HTML
  const RenderHTML = ({ htmlContent, html }) => (
    <div
      onDragEnd={(event) => add(event, html)}
      className="draggable"
      draggable={true}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );

  // Handle deselection of blocks
  const handleDeselect = () => {
    if (GJinitRef.current) {
      GJinitRef.current.select(null);
    }
  };

  return (
    <div className="Element">
      {(Menu === 'Design' || Menu === 'Element') && subMenu === 'All' && (
        <div className="subcata">
          {data?.subcategories.map((subcategory, index) => (
            <div key={index}>
              <div className="topbar">
                <div className="name">{subcategory.subcategory}</div>
                <div
                  onClick={() => {
                    handleDeselect();
                    setSubMenu(subcategory.subcategory);
                  }}
                  className="btn"
                >
                  See all
                </div>
              </div>
              <div className="overflow-auto">
                <div className="cards">
                  {subcategory.components.length > 0
                    ? subcategory.components.map((component) => (
                        <React.Fragment key={component.id}>
                          {component.media === 'null' ? (
                            <div className="card">
                              <RenderHTML html={null} htmlContent={component.content} />
                            </div>
                          ) : (
                            <div className="card-img">
                              <RenderHTML htmlContent={component.media} html={component.content} />
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(Menu === 'Design' || Menu === 'Element') && subMenu === 'All' && (
        <div className="nocata">
          <div className="cards">
            {nocatData.map((block, index) => (
              <div key={index} className="card">
                <RenderHTML htmlContent={block.content} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Element;
