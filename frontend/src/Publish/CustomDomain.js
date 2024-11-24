import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import axios from 'axios';


function CustomDomain () {
  const { path } = useParams();
  const domainName = window.location.hostname;


  const [site, setSite] = useState([]);
  const editorRef = useRef(null);
  const canvasRef = useRef(null);


  useEffect(()=>{

    const response = axios.post(process.env.REACT_APP_API_URL+'/sitesbydomain', { domainName });

    if (response.data.success) {
      setSite(response.data.sites[0]._id);

    } else {
      setSite([]);
    }

  },[domainName])

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize GrapesJS editor
    editorRef.current = grapesjs.init({
      container: canvasRef.current,
      fromElement: true,
      height: '100vh',
      width: '100%',
      storageManager: {
        type: 'remote',  // Use 'remote' to handle API calls
      },
      panels: { defaults: [] }, // No panels
      styleManager: { sectors: [] }, // No style manager
      // Disable editing mode
      readonly: true,
    });


  
    editorRef.current.on('load', () => {
      const iframeHead = editorRef.current.Canvas.getDocument().head;
      const tailwindLink = document.createElement('link');
      tailwindLink.rel = 'stylesheet';
      tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
      iframeHead.appendChild(tailwindLink);
    });
    editorRef.current.on('load', () => {
      const iframeHead = editorRef.current.Canvas.getDocument().head;
      const tailwindLink = document.createElement('link');
      tailwindLink.rel = 'stylesheet';
      tailwindLink.href = 'https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css';
      iframeHead.appendChild(tailwindLink);
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
    if (!canvasRef.current) return;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/projectload?_id=' + site); // Adjust the URL to your fetch route
        // setCategories(response.data.categories); 
        canvasRef.current.loadProjectData(response.data);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [canvasRef,site]);


  useEffect(() => {
    if (!canvasRef.current || site.length ===0) return;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/projectload?_id=' + site); // Adjust the URL to your fetch route
     
          editorRef.current.loadProjectData(response.data);
      
        

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [canvasRef,editorRef,site]);


  return (
    <>
    <div ref={canvasRef} className='landingcanvas' style={{ overflow: 'hidden' }} />

    </>
  )
}

export default CustomDomain