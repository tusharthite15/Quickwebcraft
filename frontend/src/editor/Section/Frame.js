import React, { useEffect } from 'react'
import { useToggle } from '../../config'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import plugin from 'grapesjs-tailwind';
import { Menu } from '@nextui-org/react';

export default function Canvas({projectid}) {
  const { setpages,GJinitRef,GJcanvasRef, blocksRef, LayerRef, LayerContainerRef, mainCanvas, styleRef } = useToggle();

  useEffect(() => {
    if (!GJinitRef.current) {
      GJinitRef.current = grapesjs.init({
        container: GJcanvasRef.current,
        fromElement: true,
        height: '100%',
        width: 'auto',
        resizable: true,
        // plugins: [plugin],
        dragMode: 'translate',
        storageManager: {
          type: 'remote',  // Use 'remote' to handle API calls
          autosave: true,  // Enable autosaving
          autoload: true,  // Autoload saved data
          stepsBeforeSave: 1,  // Save after 1 change
          storeComponents: true,  // Store components data
          storeStyles: true,      // Store style data
          storeHtml: false,       // Don't store as HTML for persistence
          storeCss: false,        // Don't store as CSS for persistence

          options: {
            remote: {
              urlStore: process.env.REACT_APP_API_URL+'/updateproject',  // API endpoint for saving
              urlLoad: process.env.REACT_APP_API_URL+'/projectload?_id=' + projectid,    // API endpoint for loading

              // Modify fetch options based on method
              fetchOptions: (opts) => {
                const defaultOptions = {
                  method: opts.method,
                  headers: { 
                    'Content-Type': 'application/json',
                  },
                  credentials: 'omit',  // Exclude credentials from the request
                };

                // For save requests, use PATCH and include projectId in the body
                if (opts.method === 'POST') {
                  return {
                    ...defaultOptions,
                    method: 'POST',  // Change method to PATCH for saving
                    body: JSON.stringify({
                      _id: projectid,  // Include projectId in the body
                      project: opts.body  // Include the editor data
                    }),
                  };
                }

                // Default options for loading (GET request)
                return defaultOptions;
              },

              // Callbacks for successful store/load events
              onStore: (response) => {
                // console.log('Data saved successfully:', response);
              },
              onLoad: (response) => {
                // console.log('Data loaded successfully:', response);
              },
            },
          },
        },

        // plugins: [plugin],
        layerManager: {
          appendTo: LayerContainerRef.current
        },
        panels: {
          defaults: [{
            id: 'layers',
            el: LayerRef.current,
            // Make the panel resizable
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: 0, // Top handler
              cl: 1, // Left handler
              cr: 0, // Right handler
              bc: 0, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: 'flex-basis',
            },
          }]

        },
        blockManager: {
          appendTo: blocksRef.current,
        },
        deviceManager: {
          devices: [
            {
              name: "Desktop",
              width: "", // Default is '100%'
            },
            {
              name: "Tablet",
              width: "768px",
            },
            {
              name: "Mobile",
              width: "320px",
            },
          ],
        },
        commands: {
          defaults: [
            {
              id: 'startPreview',
              run() {
                GJinitRef.current.runCommand('preview');
                const canvas = mainCanvas.current;
                // canvas.classList.add('canvas-transition');
                canvas.style.width = '100%';
                canvas.style.height = '100vh';
                canvas.style.position = 'absolute';
                canvas.style.left = '0px';
                canvas.style.top = '60px';
                // setTimeout(() => {
                //   canvas.classList.remove('canvas-transition');
                // }, 500);
              },
            },
            {
              id: 'stopPreview',
              run() {
                GJinitRef.current.stopCommand('preview');
                const canvas = mainCanvas.current;
                // canvas.classList.add('canvas-transition');
                canvas.style.left = '380px';
                canvas.style.top = '60px';
                canvas.style.width = 'calc(100% - 380px)';
                canvas.style.height = 'calc(100vh - 60px)';
                // setTimeout(() => {
                //   canvas.classList.remove('canvas-transition');
                // }, 500);
              },
            }
          ],
        },
        selectorManager: {
          appendTo: styleRef.current
        },
        styleManager: {
          appendTo: styleRef.current,
          sectors: [{
            name: 'Container',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'height', 'border-radius', 'overflow', 'position', 'left', 'top'],

          }, {
            name: 'Layout',
            open: false,
            buildProps: ['display', 'flex-wrap'],
          }, {
            name: 'Fill',
            open: false,
            buildProps: ['background-color'],
          }, {
            name: 'Stroke',
            open: false,
            buildProps: ['border'],
          }, {
            name: 'Effect',
            open: false,
            buildProps: ['box-shadow', 'filter'],
          }]
        },

      });



      GJinitRef.current.on('component:selected', (model) => {
        model.set({
            resizable: {
                tl: false, // Top left
                tr: false, // Top right
                bl: false, // Bottom left
                br: true, // Bottom right
                tc: false, // Top
                bc: false, // Bottom
                cr: false, // Right
                cl: false // Left
            },
        });
    });

  
GJinitRef.current.on('page:select', (newPage, previousPage) => {
        const iframeHead = GJinitRef.current.Canvas.getDocument().head;

        // Create the script element
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com'; // URL for the external script
        
        // Append the script to the head
        iframeHead.appendChild(tailwindScript);
      })


      GJinitRef.current.on('component:add', (component) => {
        // console.log('Component added:', component);
    });
    

      GJinitRef.current.on('load', () => {
        const iframeHead = GJinitRef.current.Canvas.getDocument().head;

        // Create the script element
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com'; // URL for the external script
        
        // Append the script to the head
        iframeHead.appendChild(tailwindScript);
      })


      const Pages = GJinitRef.current.Pages;
      const allPages = Pages.getAll();
      setpages(allPages);

    }

    // Cleanup on unmount
    return () => {
      if (GJinitRef.current) {
        GJinitRef.current.destroy();
        GJinitRef.current = null;
      }
    };
  }, [GJcanvasRef, GJinitRef, blocksRef, LayerRef, LayerContainerRef, setpages, mainCanvas, styleRef, projectid]);


  

  return (
    <div  ref={mainCanvas} className='Frame'>
      <div ref={GJcanvasRef} className='canvas'>
      </div>
    </div>
  )
}
