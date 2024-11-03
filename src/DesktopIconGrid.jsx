import './desktop-icon-grid.css';
import { useRef, useState, useEffect } from 'react';
import { DesktopIcon, DesktopIconSlot } from "./Icon";
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

function getIconWidthPx() {
    const rootStyles = getComputedStyle(document.documentElement);
    const colPx = rootStyles.getPropertyValue('--grid-column-px');
    return parseInt(colPx.substr(0, colPx.length-2)) + getGapPx();
}

function getIconHeightPx() {
    const rootStyles = getComputedStyle(document.documentElement);
    const rowPx =  rootStyles.getPropertyValue('--grid-row-px');
    return parseInt(rowPx.substr(0, rowPx.length-2)) + getGapPx();
}

function getGapPx() {
    const iconGridStyles = getComputedStyle(document.getElementById("desktop-icon-grid"));
    const gapPx =  iconGridStyles.getPropertyValue('gap');
    return parseInt(gapPx.substr(0, gapPx.length-2));
}

function getTaskbarHeightPx() {
    const rootStyles = getComputedStyle(document.documentElement);
    const taskbarHeight =  rootStyles.getPropertyValue('--taskbar-height');
    return parseInt(taskbarHeight.substr(0, taskbarHeight.length-2));
}

export default function DesktopIconGrid({ children = null }) {
    // let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" style={} ><strong>Shop Now</strong></DesktopIcon>;
    const iconGridRef = useRef(null);

    const [icons, setIcons] = useState(children);
    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [middleIconSlot, setMiddleIconIndex] = useState(null);

    const shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" ><strong>Shop Now</strong></DesktopIcon>;

    // Get the dynamic count of columns in the Desktop icon grid
    function getGridColumnCount() {
        return Math.floor(window.innerWidth / getIconWidthPx());
    }

    // Get the dynamic count of rows in the Desktop icon grid
    function getGridRowCount() {
        return Math.floor((window.innerHeight - getTaskbarHeightPx()) / getIconHeightPx());
    }

    function getIconGrid() {
        let tempIconGrid = []; // This will temporarily hold our icons at our desired positions
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < columnCount; col++) {
                if (row == 0 && col < icons.length) {
                    tempIconGrid.push(icons[col])
                }
                else if (row == getCenter(rowCount) && col == getCenter(columnCount)) {
                    tempIconGrid.push(shopIcon) // Place the shop icon at the center
                }
                else {
                    tempIconGrid.push(null)
                }
            }
        }
        return tempIconGrid;
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
            { getIconGrid().map((icon, index) => (
                (icon && <DesktopIconSlot index={index} >{icon}</DesktopIconSlot>) || <DesktopIconSlot index={index} />
            ))}
        </div>
    );
}

// This function is used to get the center int between 0 and a given number.
function getCenter(n) {
    return Math.floor(n / 2);
}