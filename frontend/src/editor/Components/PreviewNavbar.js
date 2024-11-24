import React from 'react'
import { PiDesktopDuotone, PiDeviceTabletSpeakerDuotone, PiDeviceMobileSpeakerDuotone } from "react-icons/pi";
import { IoRocketOutline, IoArrowBack } from "react-icons/io5";
import { useToggle } from "../../config";

export default function PreviewNavbar({ handlePreview, setDeviceMode }) {

  const { pages, GJinitRef, setShowPublishModal } = useToggle();

  const selectPage = (id) => {
    const pages = GJinitRef.current.Pages;
    pages.select(id);
  }

  return (
    <div className="PreviewNav">

      <button onClick={handlePreview} className='backbtn' ><IoArrowBack /></button>


      <div style={{ "display": "flex", "alignItems": "center" }}>

        <div className='previewpagesselector'>
          <select onClick={(e) => selectPage(e.target.value)}>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.id}
              </option>
            ))}
          </select>
        </div>
        <div className='devices'>

          <button onClick={() => setDeviceMode("Desktop")}><PiDesktopDuotone /></button>
          <button onClick={() => setDeviceMode("Tablet")}><PiDeviceTabletSpeakerDuotone /></button>
          <button onClick={() => setDeviceMode("Mobile")}><PiDeviceMobileSpeakerDuotone /></button>

        </div>

      </div>

      <button className='publish' onClick={() => setShowPublishModal(true)}><IoRocketOutline />Publish</button>

    </div>
  )
}
