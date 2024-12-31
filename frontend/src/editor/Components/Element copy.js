import axios from 'axios';
import { useToggle } from '../../config';
import '../index.css';
import React, { useEffect, useState } from 'react';

function Element() {
  const { Menu, GJinitRef, blocks, subMenu, setSubcatatory, setSubMenu } = useToggle();
  const [data, setData] = useState(null);
  const [nocatData, setNoCatData] = useState([]);

  // Helper function to fetch data from API
  const fetchData = async (url, callback) => {
    try {
      const result = await axios.get(url);
      if (result.data) callback(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch subcategories when Menu is "Design" or "Element"


  // Manage blocks in the block manager based on Menu and subMenu
  useEffect(() => {
    if (GJinitRef.current) {
      const blockManager = GJinitRef.current.Blocks;

      // Remove existing blocks
      if (blocks.length !== 0) {
        blocks.forEach((block) => blockManager.remove(block.id));

        // Add new blocks based on category and subcategory
        blocks.forEach((block) => {
          if (block.category === Menu && (subMenu === "All" || subMenu === block.subcategory)) {
            blockManager.add(block.id, {
              label: block.label,
              content: block.content,
              media: block.media,
              category: subMenu === "All" ? block.subcategory : block.type
            });
          }
        });
      }
    }
  }, [Menu, GJinitRef, blocks, subMenu]);

  // Deselect all blocks in the editor
  const handleDeselect = () => {
    if (GJinitRef.current) {
      GJinitRef.current.select(null);
    }
  };



  useEffect(() => {
    if (Menu === "Design" || Menu === "Element") {
      fetch('https://cdn.tailwindcss.com' + Menu)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data); // Set the fetched data
          // setLoading(false); // Turn off the loading state
        })
        .catch((error) => {
          // setError(error); // Handle any errors
          // setLoading(false); // Turn off the loading state
        });
    }
  }, [Menu]);

  useEffect(() => {
    if (Menu === "Design" || Menu === "Element") {
      fetch('http://localhost:8080/getblocksbysubCategories/' + Menu + '/' + subMenu)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setNoCatData(data); // Set the fetched data
          // setLoading(false); // Turn off the loading state
        })
        .catch((error) => {
          // setError(error); // Handle any errors
          // setLoading(false); // Turn off the loading state
        });
    }
  }, [subMenu]);

  const add = (thiss,html) => {
    console.log(html);
    if(html===null){

      GJinitRef.current.addComponents(
        `${thiss.target.innerHTML}`
      );
    }else{
      
      GJinitRef.current.addComponents(
        `${html}`
      );
    }

  }
  const RenderHTML = ({ htmlContent,html }) => {
    return <div onDragEnd={(event) => add(event,html)} className="draggable" draggable={true} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <div className="Element">
      {(Menu === "Design" || Menu === "Element") && subMenu === "All" ? (
        <div className='subcata'>


          {data?.subcategories.map((subcategory, index) => (
            <div key={index}>

              <div className='topbar'>
                <div className='name'>{subcategory.subcategory}</div>
                <div
                  onClick={() => {
                    handleDeselect();
                    setSubMenu(subcategory.subcategory);
                  }}
                  className='btn'
                >
                  See all
                </div>
              </div>

              <div className='overflow-auto'>
                <div className='cards'>
                  {subcategory.components.length > 0 ? (
                    subcategory.components.map((component) => (
                      <>               {component.media === 'null' ? <div key={component.id} className="card"> <RenderHTML html={null} htmlContent={component.content} />   </div> : <div key={component.id} className="card-img">  <RenderHTML htmlContent={component.media} html={component.content} />   </div>}
                      </>
                    ))
                  ) : (
                    <>
                      {/* <p>No components available</p> */}
                    </>
                  )}
                  <div className='addnew'>More</div>
                </div>

              </div>
            </div>
          ))}


        </div>
      ) : null}

      {(Menu === "Design" || Menu === "Element") && subMenu === "All" ? (
        <div className='nocata'>
          <div className='cards'>
            {nocatData.map((block, index) => (
              <div key={index} className='card'><RenderHTML htmlContent={block.content} /> </div>
            ))}
          </div>
        </div>
      ) : null}


    </div>
  );
}

export default Element;
