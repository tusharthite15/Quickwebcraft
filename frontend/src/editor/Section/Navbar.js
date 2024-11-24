import React, { useRef, useState } from "react";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import {
  PiDesktopDuotone,
  PiDeviceTabletSpeakerDuotone,
  PiDeviceMobileSpeakerDuotone,
  PiEraserDuotone,
} from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { useToggle } from "../../config";
import PreviewNavbar from "../Components/PreviewNavbar";
import Modal from "../Components/clearScreen"; // Import Modal
import "../index.css";
import axios from "axios";
import PublishModal from "../Components/PublishModal";

export default function Navbar() {
  const { GJinitRef, site, setPopupVisible, setShowPublishModal } = useToggle();
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const renamesite = useRef();

  const setDeviceMode = (device) => {
    GJinitRef.current.setDevice(device);
  };

  const handleUndo = () => {
    GJinitRef.current.runCommand("core:undo");
  };

  const handleRedo = () => {
    GJinitRef.current.runCommand("core:redo");
  };

  const confirmClear = () => {
    GJinitRef.current.runCommand("core:canvas-clear");
    setShowClearModal(false);
  };

  const handlePreview = () => {
    if (isPreviewing) {
      GJinitRef.current.runCommand("stopPreview");
    } else {
      GJinitRef.current.runCommand("startPreview");
    }
    setIsPreviewing(!isPreviewing);
  };

  const renameSite = (siteid) => {
    axios.post(process.env.REACT_APP_API_URL + "/renamesite", {
      _id: siteid,
      name: renamesite.current.value,
    });
  };

  return (
    <>
      {!isPreviewing ? (
        <div className="Nav">
          <div className="navleft">
            <div className="logo">QuickWebCraft</div>
            <input
              ref={renamesite}
              onChange={() => renameSite(site[0]._id)}
              type="text"
              defaultValue={site[0] ? site[0].name : ""}
            />
          </div>
          <div className="navcenter">
            <button onClick={() => setDeviceMode("Desktop")}>
              <PiDesktopDuotone />
            </button>
            <button onClick={() => setDeviceMode("Tablet")}>
              <PiDeviceTabletSpeakerDuotone />
            </button>
            <button onClick={() => setDeviceMode("Mobile")}>
              <PiDeviceMobileSpeakerDuotone />
            </button>
          </div>
          <div className="navright">
            <button
              className="transparentbtn"
              onClick={() => setShowClearModal(true)}
            >
              <PiEraserDuotone />
            </button>
            <button className="transparentbtn" onClick={handleUndo}>
              <LuUndo2 />
            </button>
            <button className="transparentbtn" onClick={handleRedo}>
              <LuRedo2 />
            </button>
            <button className="borderbtn" onClick={handlePreview}>
              <FaEye /> Preview
            </button>
            <button
              className="solidbtn"
              onClick={() => setShowPublishModal(true)}
            >
              <IoRocketOutline /> Publish
            </button>
          </div>
        </div>
      ) : (
        <PreviewNavbar
          handlePreview={handlePreview}
          setDeviceMode={setDeviceMode}
        />
      )}

      {/* Call the Modal Component */}
      <Modal
        show={showClearModal}
        message="Are you sure you want to clear the canvas?"
        onConfirm={confirmClear}
        onClose={() => setShowClearModal(false)}
      />

      <PublishModal />
    </>
  );
}
