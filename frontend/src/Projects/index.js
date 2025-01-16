import { useParams } from 'react-router-dom';
import {
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, User
} from "@nextui-org/react";
import './index.css';
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";


// Reusable Project Modal Component
const ProjectModal = ({ isOpen, onClose, title, nameRef, onSave, defaultValue, func }) => (
  <Modal 
    isOpen={isOpen}
    onPress={onClose}
    placement="top-center"
    style={{
      backgroundColor: '#e9e9e9',
      display: isOpen ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 50,
    }}
  >
    <ModalContent
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '500px',
      }}
      // onPress={onClose}
    >
      {() => (
        <>
          <ModalHeader
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
            }}
          >
            {title}
          </ModalHeader>
          <ModalBody>
            <Input
              ref={nameRef}
              defaultValue={defaultValue}
              autoFocus
              placeholder="Enter your project name"
              variant="bordered"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                fontSize: '1rem',
                color: '#374151',
                marginBottom: '1rem',
              }}
            />
          </ModalBody>
          <ModalFooter
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <Button
              color="danger"
              variant="flat"
              onPress={onClose}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid #ddd',
                borderRadius: '0.375rem',
                // backgroundColor: 'transparent',
                color: '#000',
                // transition: 'background-color 0.2s',
              }}

            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => {
                onSave();
                func();
              }}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#2563eb')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#3b82f6')
              }
            >
              Save
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);


function Projects() {
  const { userid } = useParams();
  const [projects, setProjects] = useState([]);
  const [changes, setChanges] = useState(0);

  const [createModal, setCreateModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const projectnamerenameRef = useRef(null);
  const projectnameRef = useRef(null);
  const [projectname, setProjectname] = useState('');
  const [renameId, setRenameId] = useState('');
  const [isCreating, setIsCreating] = useState(false); // State to manage creating sites

  // API helper function
  const apiPost = (url, data) => {
    
    return axios.post(`${process.env.REACT_APP_API_URL}/${url}`, data);
  };

  useEffect(() => {

    let isMounted = true; // Track if the component is mounted

    const fetchProjects = async () => {
      if (localStorage.getItem('userid')) {
        const result = await apiPost('sites', { userid });
        if (isMounted) {
          if (result.data.message === 'found') {
            setProjects(result.data.sites);
          } else {
            setProjects([]);
          }
        }
      } else {
        window.location.replace(`/login`);
      }
    };

    fetchProjects();

    return () => { isMounted = false; }; // Cleanup on unmount

  }, [changes, userid]);


  const handleDelete = async (siteid) => {
    const result = await apiPost('deletesite', { _id: siteid });
    if (result.data.message === 'Deleted') {
      setChanges(prev => prev + 1);
    }
  };

  const handleDuplicate = async (siteid) => {
    const result = await apiPost('duplicateSite', { _id: siteid });
    if (result.data.message === 'Duplicate') {
      setChanges(prev => prev + 1);
    }
  };

  const createSite = async () => {
    if (isCreating) return; // Prevent duplicate requests
    setIsCreating(true);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/createsite', {
        name: projectnameRef.current.value,
        userid: userid,
        subdomain: 'null',
        domain: 'null',
        canvasdata: [],
        project: []
      });

      if (response.data.message === 'Created') {
        setChanges(prev => prev + 1); // Trigger a re-fetch of projects
      }
    } catch (error) {
      console.error("Error creating site:", error);
    } finally {
      setIsCreating(false); // Re-enable button after API call
    }
  };

  const renameSite = async (siteid) => {
    const response = await axios.post(process.env.REACT_APP_API_URL+'/renamesite', {
      _id: siteid,
      name: projectnamerenameRef.current.value
    });

    if (response.data.message === 'Renamed') {
      setChanges(prev => prev + 1); // Trigger a re-fetch of projects
    }
  };


  const logOut = () => {
    localStorage.clear();
    window.location.href = "/"
  };

  const [name, setName] = useState([]);
  useEffect(
    () => {
      axios.post(process.env.REACT_APP_API_URL+'/fetchuser', 
        {
        _id: userid
      }).then((result) => {
        if (result.data.message === "found") {
          setName(result.data.user);
        }
      })
    },
    [userid]
  );

  return (
    <div className='Projects'>
      <div className='nav'>
        <div className='logo'>QuickWebCraft</div>
        <div className='right'>
          <Button onPress={() => setCreateModal(true)} className='create' disabled={isCreating}>
            Create new website
          </Button>
          <ProjectModal
          className="modal-bg"
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
            title="Create new project"
            func={createSite}
            nameRef={projectnameRef}
            onSave={() => setCreateModal(false)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button className='profile'>{name.name ? name.name[0] : ''}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem key="new"> <User
                name={name.name}
                description={name.email}
                avatarProps={{
                  color: 'danger'
                }}
              /></DropdownItem>
              {/* <DropdownItem key="copy">Sites</DropdownItem> */}
              <DropdownItem key="delete" className="text-danger" onClick={logOut} color="danger">Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* <img src={Thumb} alt='thumb' className='thumb' /> */}

      <div className='container'>

      <div className='box'>
            <button onClick={() => setCreateModal(true)} className='addproject'>
              <IoMdAdd />
              create project
            </button>
             
          </div>

        {projects.map(project => (
          <div key={project._id} className='box'>
            <button onClick={() => (window.location.href = '/editor/' + project._id)} className='canvas'></button>
            <div className='more'>
              <div className='name'>{project.name}</div>
              <Dropdown>
                <DropdownTrigger>
                  <Button className='options'>
                    <SlOptionsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Project Actions">
                  <DropdownItem key="open" onClick={() => (window.location.href = '/editor/' + project._id)}>Open</DropdownItem>
                  <DropdownItem key="tab" onClick={() => window.open('/editor/' + project._id, '_blank')}>Open in tab</DropdownItem>
                  <DropdownItem key="duplicate" onClick={() => handleDuplicate(project._id)}>Duplicate</DropdownItem>
                  <DropdownItem key="rename" onClick={() => { setProjectname(project.name); setRenameId(project._id); setRenameModal(true); }}>Rename</DropdownItem>
                  <DropdownItem key="delete" onClick={() => handleDelete(project._id)} className="text-danger" color="danger">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        ))}
        <ProjectModal
          isOpen={renameModal}
          onClose={() => setRenameModal(false)}
          title="Rename project"
          nameRef={projectnamerenameRef}
          defaultValue={projectname}
          func={() => renameSite(renameId)} // Pass site ID to rename function
          onSave={() => setRenameModal(false)}
        />
      </div>
    </div>
  );
}

export default Projects;
