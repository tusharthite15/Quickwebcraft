import { useParams } from "react-router-dom";
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import axios from 'axios';
import {useEffect, useRef, useState } from "react";
import './index.css'
import { Suspense } from "react";
// import toggl_loader from '../assets/toggl_loader.gif'
function Subdomain() {
  const { path } = useParams();
  function getSubdomain() {
    const hostname = window.location.hostname; // e.g., subdomain.example.com
    const parts = hostname.split("."); // Split the hostname into parts

    // Check if there's a subdomain (more than 2 parts)
    if (parts.length > 2) {
      return parts[0]; // Return the first part as the subdomain 
    }

    
    // No subdomain present, return null or empty string
    return null;
  }

  // Usage
  const subdomain = getSubdomain();

  const [site, setSite] = useState([]);
  const editorRef = useRef(null);
  const canvasRef = useRef(null);


  useEffect(()=>{

    const fetchSitesByDomain = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL+'/sitesbysubdomain', { subdomain });

        if (response.data.success) {
          setSite(response.data.sites[0]._id); // Set the site ID if success
        } else {
          setSite([]); // Handle cases where the request was not successful
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
        setSite([]); // Optionally handle the error state
      }
    };

    // Call the async function
    fetchSitesByDomain();
  },[subdomain])

  useEffect(() => {
    if (!canvasRef.current || site.length ===0) return;

    // Initialize GrapesJS editor
    editorRef.current = grapesjs.init({
      container: canvasRef.current,
      fromElement: true,
      height: '100vh',
      width: '100%',
      storageManager: {
        type: 'remote',  // Use 'remote' to handle API cal  // Autoload saved data    // Don't store as CSS for persistence
      },
      panels: { defaults: [] }, // No panels
      styleManager: { sectors: [] }, // No style manager
      // Disable editing mode
      readonly: true,
      canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', // Bootstrap CSS
          // Add more CSS CDN links here if needed
        ],
      },
    });

    const fn = (ev) => ev.stopPropagation();

    editorRef.current.on('run:core:preview', () => {
      const frameDoc = editorRef.current.Canvas.getDocument();
      frameDoc.addEventListener('dblclick', fn, { capture: true })
    });

    editorRef.current.on('stop:core:preview', () => {
      const frameDoc = editorRef.current.Canvas.getDocument();
      frameDoc.removeEventListener('dblclick', fn, { capture: true })
    });

    setTimeout(() => {


      editorRef.current.runCommand('preview');

    }, 1000);


    return () => {
      editorRef.current.destroy(); // Cleanup on component unmount
    };


  }, [site]);



  useEffect(() => {
    if (!canvasRef.current || site.length ===0) return;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/projectload?_id=' + site); // Adjust the URL to your fetch route
     
          editorRef.current.loadProjectData(response.data);


          setTimeout(() => {
            
            
            editorRef.current.on('load', () => {
              const iframeHead = editorRef.current.Canvas.getDocument().head;
              const tailwindLink = document.createElement('link');
              tailwindLink.rel = 'stylesheet';
              tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
              iframeHead.appendChild(tailwindLink);
            });

          }, 3000);



      
        

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, [canvasRef,editorRef,site]);

  return (
    <>  
      <Suspense fallback={<div className="flex justify-center items-center h-screen"></div>}>
        <div ref={canvasRef} className='landingcanvas' style={{ overflow: 'hidden' }}></div>
      </Suspense>
    </>
  );
}

export default Subdomain;
