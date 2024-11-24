import { useToggle } from '../../config';
import '../index.css';
import React from 'react';
import {
    Button,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";

function Hurray({type,url}) {
    const { showHurrayModal, setShowHurrayModal } = useToggle();


    return (
        <Modal backdrop="blur" isOpen={showHurrayModal} placement="top-center">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Site is live</ModalHeader>
                        <ModalBody>
                            <h2 className="text-4xl text-center font-extrabold mb-4 font-mono ">
                                🎉Boom!
                            </h2>
                            
                            <h4 onPress={() => {
                                setShowHurrayModal(false); window.open(type==="Subdomain" ? "https://"+url+".toggl.site":"https://"+url, '_blank')
                            }} className="text-1xl text-center font-extrabold mb-4 font-mono ">
                                {type==="Subdomain" ? "https://"+url+".toggl.site":"https://"+url}
                            </h4>
                            <p className="text-gray-600 font-medium">
                                Your website is published!
                            </p>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={() => setShowHurrayModal(false)} variant="flat">
                                Close
                            </Button>
                            <Button color="primary" onPress={() => {
                                setShowHurrayModal(false); window.open(type==="Subdomain" ? "https://"+url+".toggl.site":"https://"+url, '_blank')
                            }}>
                                Visit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default Hurray;
