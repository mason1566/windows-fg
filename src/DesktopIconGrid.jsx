import './desktop-icon-grid.css';
import { useRef, useState, useEffect } from 'react';
import { DesktopIcon, DesktopIconSlot } from "./Icon";
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

function getViewportWidth() {
    return window.innerWidth;
}

function getViewportHeight() {
    return window.innerHeight;
}

export default function DesktopIconGrid({ children }) {
    // let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" style={} ><strong>Shop Now</strong></DesktopIcon>;
    const iconGridRef = useRef(null);

    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [middleIconSlot, setMiddleIconSlot] = useState(null);

    const shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" ><strong>Shop Now</strong></DesktopIcon>;

    // Get the dynamic count of columns in the Desktop icon grid
    function getGridColumnCount() {
        const gridStyle = window.getComputedStyle(iconGridRef.current);
        return gridStyle.getPropertyValue('grid-template-columns').split(' ').length; 
    }

    // Get the dynamic count of rows in the Desktop icon grid
    function getGridRowCount() {
        const gridStyle = window.getComputedStyle(iconGridRef.current);
        return gridStyle.getPropertyValue('grid-template-rows').split(' ').length;
    }

    // Use useEffect hook to interact with our dynamically created icon grid
    useEffect(() => {
        const updateGridDimensions = () => {
            if (iconGridRef.current) {
                setColumnCount(getGridColumnCount());
                setRowCount(getGridRowCount());
            }
        };

        updateGridDimensions(); // Set our component states to the initial grid values
        window.addEventListener('resize', updateGridDimensions); // Run updateGridDimensions when the window is resized

        return () => { window.removeEventListener('resize', updateGridDimensions) }; // This piece of code is delayed to run on cleanup
    }, []);

    return (
        <div id="desktop-icon-grid" ref={iconGridRef}>
            { children }
            
        </div>
    );
}

// This function is used to get the center int between 0 and a given number.
function getCenter(n) {
    return Math.floor(n / 2);
}