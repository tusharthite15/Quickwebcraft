import React from 'react';
import { useToggle } from '../../config';

function Style() {
  const { selectedComponent } = useToggle();
  return (
    <div className="Style">
      {selectedComponent && (
        <div className="style-panel">
          
          <div className="section-header">
            <h2 className="section-title">Properties</h2>
            <button aria-label="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 00-1 1v10a1 1 0 102 0V4a1 1 0 00-1-1zM3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>

          {/* X, Y, Width, Height */}
          <div className="grid grid-2">
            <div className="input-group">
              <label className="input-label">X</label>
              <input
                type="number"
                className="input-field"
                placeholder="0"
                defaultValue={
                  selectedComponent && selectedComponent.getEl() instanceof Element
                    ? window.getComputedStyle(selectedComponent.getEl()).left.replace('px', '')
                    : ''
                }
                onChange={(e) => {
                  selectedComponent.setStyle({
                    left: e.target.value + 'px',
                  });
                }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Y</label>
              <input
                type="number"
                className="input-field"
                placeholder="0"
                defaultValue={
                  selectedComponent && selectedComponent.getEl() instanceof Element
                    ? window.getComputedStyle(selectedComponent.getEl()).top.replace('px', '')
                    : ''
                }
                onChange={(e) => {
                  selectedComponent.setStyle({
                    top: e.target.value + 'px',
                  });
                }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">W</label>
              <input
                type="number"
                className="input-field"
                placeholder="100"
                defaultValue={
                  selectedComponent
                    ? window.getComputedStyle(selectedComponent.getEl()).width.replace('px', '')
                    : ''
                }
                onChange={(e) => {
                  selectedComponent.setStyle({
                    width: e.target.value + 'px',
                  });
                }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">H</label>
              <input
                type="number"
                className="input-field"
                placeholder="100"
                defaultValue={
                  selectedComponent
                    ? window.getComputedStyle(selectedComponent.getEl()).height.replace('px', '')
                    : ''
                }
                onChange={(e) => {
                  selectedComponent.setStyle({
                    height: e.target.value + 'px',
                  });
                }}
              />
            </div>
          </div>

          {/* Opacity */}
          <div className="control-group">
            <label className="input-label">Opacity</label>
            <input
              type="range"
              min="0"
              max="100"
              className="range-input"
              defaultValue={selectedComponent ? window.getComputedStyle(selectedComponent.getEl()).opacity * 100 : ''}
              onChange={(e) => {
                selectedComponent.setStyle({
                  opacity: e.target.value / 100,
                });
              }}
            />
          </div>

          {/* Color Picker */}
          <div className="control-group">
            <label className="input-label">Fill</label>
            <div className="color-picker">
              <input
                type="color"
                defaultValue={selectedComponent ? window.getComputedStyle(selectedComponent.getEl()).backgroundColor : ''}
                onChange={(e) => {
                  selectedComponent.setStyle({
                    'background-color': e.target.value,
                  });
                }}
                className="color-input"
              />
              <input
                type="text"
                defaultValue={selectedComponent ? window.getComputedStyle(selectedComponent.getEl()).backgroundColor : ''}
                className="color-text"
              />
            </div>
          </div>

          {/* Font & Text Options */}
          <div className="control-group">
            <label className="input-label">Font</label>
            <select
              className="select-input"
              defaultValue="Inter"
              onChange={(e) => {
                selectedComponent.setStyle({
                  'font-family': e.target.value,
                });
              }}
            >
              <option>Inter</option>
              <option>Roboto</option>
              <option>Poppins</option>
            </select>
          </div>

          {/* Toggle for Bold & Italic */}
          <div className="toggle-group">
            <div className="toggle-item">
              <input type="checkbox" id="bold" className="toggle-checkbox" onChange={(e) => {
                selectedComponent.setStyle({
                  'font-weight': e.target.checked ? 'bold' : 'normal',
                });
              }} />
              <label htmlFor="bold" className="toggle-label">Bold</label>
            </div>
            <div className="toggle-item">
              <input type="checkbox" id="italic" className="toggle-checkbox" onChange={(e) => {
                selectedComponent.setStyle({
                  'font-style': e.target.checked ? 'italic' : 'normal',
                });
              }} />
              <label htmlFor="italic" className="toggle-label">Italic</label>
            </div>
          </div>

          {/* Border Radius & Rotation */}
          <div className="grid grid-2">
            <div className="input-group">
              <label className="input-label">Border Radius</label>
              <input
                type="number"
                className="input-field"
                placeholder="0"
                defaultValue={selectedComponent ? window.getComputedStyle(selectedComponent.getEl()).borderRadius.replace('px', '') : ''}
                onChange={(e) => {
                  selectedComponent.setStyle({
                    'border-radius': e.target.value + 'px',
                  });
                }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Rotation</label>
              <input
                type="number"
                className="input-field"
                placeholder="0°"
                defaultValue={selectedComponent ? window.getComputedStyle(selectedComponent.getEl()).transform : ''}
                onChange={(e) => {
                  selectedComponent.setStyle({
                    transform: `rotate(${e.target.value}deg)`,
                  });
                }}
              />
            </div>
          </div>

          {/* Stroke Section */}
          <div className="stroke-section">
            <label className="input-label">Stroke</label>
            <div className="stroke-controls">
              <input type="color" defaultValue="#000000" className="stroke-color" />
              <input type="number" className="stroke-width" placeholder="1" min="0" step="1" />
              <select className="stroke-style">
                <option>Solid</option>
                <option>Dashed</option>
                <option>Dotted</option>
              </select>
            </div>
            <div className="stroke-visibility">
              <span className="stroke-label">Visible</span>
              <input type="checkbox" className="stroke-checkbox" />
            </div>
          </div>

          {/* Auto Layout Section */}
          <div className="auto-layout">
            <h3 className="auto-layout-title">Auto Layout</h3>
            <div className="grid grid-2 mt-small">
              <div className="input-group">
                <label className="input-label">Direction</label>
                <select
                  className="select-input"
                  defaultValue="Horizontal"
                  onChange={(e) => {
                    selectedComponent.setStyle({
                      'flex-direction': e.target.value.toLowerCase(),
                    });
                  }}
                >
                  <option>Horizontal</option>
                  <option>Vertical</option>
                  <option>Grid</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Padding</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="8"
                  onChange={(e) => {
                    selectedComponent.setStyle({
                      padding: `${e.target.value}px`,
                    });
                  }}
                />
              </div>
            </div>
            <div className="grid grid-2 mt-small">
              <div className="input-group">
                <label className="input-label">Margin</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="8"
                  onChange={(e) => {
                    selectedComponent.setStyle({
                      margin: `${e.target.value}px`,
                    });
                  }}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Alignment</label>
                <select
                  className="select-input"
                  defaultValue="Left"
                  onChange={(e) => {
                    selectedComponent.setStyle({
                      'justify-content': e.target.value.toLowerCase(),
                    });
                  }}
                >
                  <option>Left</option>
                  <option>Center</option>
                  <option>Right</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Distribution</label>
              <select
                className="select-input"
                defaultValue="Evenly"
                onChange={(e) => {
                  selectedComponent.setStyle({
                    'justify-content': e.target.value.replace(' ', '-').toLowerCase(),
                  });
                }}
              >
                <option>Evenly</option>
                <option>Space Between</option>
                <option>Space Around</option>
              </select>
            </div>
          </div>

          {/* Drop Shadow Toggle */}
          <div className="drop-shadow-toggle">
            <label className="input-label">Drop Shadow</label>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => {
                  selectedComponent.setStyle({
                    'box-shadow': e.target.checked
                      ? '0px 4px 6px rgba(0, 0, 0, 0.1)'
                      : 'none',
                  });
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Style;
