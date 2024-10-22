import './desktop-icon-manager.css';
import { useRef, useState, useEffect } from 'react';
import { DesktopIcon, IconDropZone } from "./Icon";
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

function getViewportWidth() {
    return window.innerWidth;
}

function getViewportHeight() {
    return window.innerHeight;
}

export default function DesktopIconManager({ children }) {
    // let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" style={} ><strong>Shop Now</strong></DesktopIcon>;
    const iconGrid = useRef(null);

    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [middleRow, setMiddleRow] = useState(0);
    const [middleColumn, setMiddleColumn] = useState(0);

    useEffect(() => {
        const updateGridDimensions = () => {
            if (iconGrid.current) {
                const gridStyle = window.getComputedStyle(iconGrid.current);
                
                const columnCount = gridStyle.getPropertyValue('grid-template-columns').split(' ').length; 
                setColumnCount(columnCount);

                const rowCount = gridStyle.getPropertyValue('grid-template-rows').split(' ').length; 
                setRowCount(rowCount);

                // Calculate middle row and column
                setMiddleRow(Math.floor(rowCount / 2));
                setMiddleColumn(Math.floor(columnCount / 2));
            }
        };

        updateGridDimensions(); // Initial calculation
        window.addEventListener('resize', updateGridDimensions); // Update on resize

        return () => { window.removeEventListener('resize', updateGridDimensions) }; // Ran on cleanup
    }, []);

    return (
        <div id="desktop-icon-grid" ref={iconGrid}>
            { children }
            <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" style={{gridRow: middleRow+1, gridColumn: middleColumn+1}} ><strong>Shop Now</strong></DesktopIcon>
        </div>
    );
}