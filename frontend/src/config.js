// config.js

import React, { createContext, useContext, useRef, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useToggle = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
  
  
  const GJinitRef = useRef(null);
  const GJcanvasRef = useRef(null);
  const [Menu, setMenu] = useState('Design');
  const [subMenu, setSubMenu] = useState('All');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [pages, setpages] = useState([]);
    
    const blocksRef = useRef(null);
    const LayerRef = useRef(null);
    const mainCanvas = useRef(null);
    const styleRef = useRef(null);
    const [site, setSite] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const LayerContainerRef = useRef(null);
    const subdomainRef = useRef(null);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const [showPublishModal, setShowPublishModal] = useState(false)
    const [showHurrayModal, setShowHurrayModal] = useState(false)
    const [blocks, setblocks] = useState([]);
    const [subcatatory,setSubcatatory] = useState([]);


  return (
    <Context.Provider value={{ Menu, setMenu,GJcanvasRef,blocksRef,LayerRef,LayerContainerRef,pages, setpages,mainCanvas,styleRef,selectedComponent, setSelectedComponent,subdomainRef,
      GJinitRef,site, setSite,isModalOpen, setIsModalOpen,isPopupVisible, setPopupVisible,showPublishModal, setShowPublishModal,showHurrayModal, setShowHurrayModal,blocks, setblocks,subMenu, setSubMenu,
      subcatatory,setSubcatatory
     }}>
      {children}
    </Context.Provider>
  );
};
