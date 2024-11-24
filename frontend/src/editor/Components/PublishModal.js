import { useToggle } from '../../config';
import '../index.css';
import React, { useRef } from 'react';
import {
    Button,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input
} from "@nextui-org/react";

import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from 'axios';
import Hurray from './Hurray';

function PublishModal() {
    const { showPublishModal, setShowPublishModal,site,setShowHurrayModal } = useToggle();
    const subdomainRef = useRef(null);
    const domainRef = useRef(null)

    const updatedomain = (siteid) => {
        if(subdomainRef.current){

            axios.post(process.env.REACT_APP_API_URL+'/updatesubdomain', {
                _id: siteid,
                domain: '',
                subdomain: subdomainRef.current.value
              }).then((result) => {
                if (result.data.message === "Updated") {
                  // setChanges(changes + 1);
                  setShowHurrayModal(true);
                  setShowPublishModal(false);
                }
              })

        }

        if(domainRef.current){

            axios.post(process.env.REACT_APP_API_URL+'/updatedomain', {
                _id: siteid,
                domain: domainRef.current.value,
                subdomain: ''
              }).then((result) => {
                if (result.data.message === "Updated") {
                  // setChanges(changes + 1);
                  setShowHurrayModal(true);
                  setShowPublishModal(false);
                }
              })
              
        }

      }

    return (
    
<>

<div
    className={`fixed inset-0 ${showPublishModal ? 'backdrop-blur-sm bg-black/30' : ''} z-10`}
    style={{ display: showPublishModal ? 'block' : 'none' }}
>
    <Modal isOpen={showPublishModal} placement="top-center">
        <ModalContent
            className="bg-gray-100 p-5 rounded-lg shadow-lg"
            style={{
                zIndex: 20, // Ensures modal stays above the blurred background
            }}
        >
            {() => (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        Choose a domain before you publish
                    </ModalHeader>
                    <ModalBody>
                        <Accordion defaultExpandedKeys="1">
                            <AccordionItem key="1" aria-label="Get a free webcraft domain" title="Get a free wbcraft domain">
                                <Input
                                    type="url"
                                    ref={subdomainRef}
                                    placeholder="yourwebsitename"
                                    labelPlacement="outside"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">https://</span>
                                        </div>
                                    }
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">.webcraft.app</span>
                                        </div>
                                    }
                                />
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Connect your own customized domain" title="Connect your own customized domain">
                                <Input
                                    type="url"
                                    ref={domainRef}
                                    placeholder="yourdomain.com"
                                    labelPlacement="outside"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">https://</span>
                                        </div>
                                    }
                                />
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onPress={() => setShowPublishModal(false)} variant="flat">
                            Close
                        </Button>
                        <Button
                            color="primary"
                            onPress={() => {
                                window.ConfettiPage.play();
                                updatedomain(site[0]._id);
                            }}
                        >
                            Publish
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
</div>


        
<Hurray type={subdomainRef.current ? 'Subdomain' : 'Domain'} url={subdomainRef.current ? subdomainRef.current.value : domainRef.current ? domainRef.current.value : null} />
</>
    );
}

export default PublishModal;
