import { useEffect } from "react";
import { useToggle } from "../../config";
import axios from "axios";


export const TriggerComponentClick = async () => {
    const { GJinitRef, Menu, setMenu, setSelectedComponent, } = useToggle();
    useEffect(()=>{
        if(GJinitRef.current){
          GJinitRef.current.on('component:selected', (component) => {
            console.error("ddd", Menu);
            if (Menu !== 'Layer') {
              setMenu('Style');  
            } else {
              setMenu('Layer'); 
            }
            setSelectedComponent(component);
          });
        }
       
    
    
      }, [GJinitRef, Menu, setSelectedComponent, setMenu])
    
};

export const FetchSiteData = async (projectid) => {
    const {setSite} = useToggle();
    useEffect(
        () => {
          axios.post(process.env.REACT_APP_API_URL+'/site', {
            _id: projectid
          }).then((result) => {
            if (result.data.message === "found") {
              setSite(result.data.site);
            }
          })
        },
        [projectid,setSite]
      );
};