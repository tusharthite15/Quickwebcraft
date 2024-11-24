import { useToggle } from '../../config';
import '../index.css';
import React from 'react';

function Layer() {
    const {LayerRef,LayerContainerRef} = useToggle();

    return (
      <div ref={LayerRef} className="Layer">
        <div ref={LayerContainerRef}></div>
      </div>
    );
}

export default Layer;
