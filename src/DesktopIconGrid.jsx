import './desktop-icon-grid.css';
import { useRef, useState, useEffect } from 'react';
import { DesktopIcon, IconDropZone } from "./Icon";
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

function getViewportWidth() {
    return window.innerWidth;
}

function getViewportHeight() {
    return window.innerHeight;
}

export default function DesktopIconGrid({ children }) {
    // let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" style={} ><strong>Shop Now</strong></DesktopIcon>;
    const iconGrid = useRef(null);

    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [middleIconSlot, setMiddleIconSlot] = useState(null);

    const shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" ><strong>Shop Now</strong></DesktopIcon>;

    // Get the dynamic count of columns in the Desktop icon grid
    function getGridColumnCount() {
        return gridStyle.getPropertyValue('grid-template-columns').split(' ').length; 
    }

    // Get the dynamic count of rows in the Desktop icon grid
    function getGridRowCount() {
        return gridStyle.getPropertyValue('grid-template-rows').split(' ').length;
    }

    useEffect(() => {
        const updateGridDimensions = () => {
            if (iconGrid.current) {
                const gridStyle = window.getComputedStyle(iconGrid.current);
                
                setColumnCount(getGridColumnCount());
                 
                setRowCount(getGridRowCount());
            }
        };

        updateGridDimensions(); // Initial calculation
        window.addEventListener('resize', updateGridDimensions); // Update on resize

        return () => { window.removeEventListener('resize', updateGridDimensions) }; // Ran on cleanup
    }, []);

    return (
        <div id="desktop-icon-grid" ref={iconGrid}>
            { children }
            
        </div>
    );
}