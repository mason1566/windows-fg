import './desktop-icon-grid.css';
import { useRef, useState, useEffect } from 'react';
import { DesktopIcon } from "./Icon";
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

// Manages the display and functions of the Desktop and icons
// Children are expected to be a DesktopIcon component
export default function DesktopIconGrid({ children = null }) {
    // let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" style={} ><strong>Shop Now</strong></DesktopIcon>;
    const iconGridRef = useRef(null);

    const [iconGrid, setIconGrid] = useState([]);
    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [middleIconSlot, setMiddleIconIndex] = useState(null);

    const shopIcon = <DesktopIcon id="shopIcon" imageUrl={webpageIcon} width="50px" height="auto" ><strong>Shop Now</strong></DesktopIcon>;

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
                if (row == 0 && col < children.length) {
                    tempIconGrid.push(children[col])
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

    // Swap 2 elements in the iconGrid array
    function swapElements(index1, index2) {
        let newIconGrid = [...iconGrid];
        [newIconGrid[index1], newIconGrid[index2]] = [newIconGrid[index2], newIconGrid[index1]];
    }

    function handleDrop (ev, fromIndex, toIndex) {
        ev.preventDefault();
        swapElements(fromIndex, toIndex);
    }

    useEffect(() => {
        const updateGridDimensions = () => {
            if (iconGridRef.current) { // iconGridRef.current is true when the component is loaded and ready
                setColumnCount(getGridColumnCount());
                setRowCount(getGridRowCount());
            }
        };

        updateGridDimensions(); // Set our component states to the initial grid values
        window.addEventListener('resize', updateGridDimensions); // Run updateGridDimensions when the window is resized

        return () => { window.removeEventListener('resize', updateGridDimensions) }; // This runs when the component is unmounted
    }, []);

    return (
        <div id="desktop-icon-grid" ref={iconGridRef}>
            { getIconGrid().map((icon, index) => (
                (icon && <div draggable={false} key={index} className="desktop-icon-slot" >{icon}</div>) || <div draggable={false} key={index} className="desktop-icon-slot" ></div>
            ))}
        </div>
    );
}

// This function is used to get the center int between 0 and a given number.
function getCenter(n) {
    return Math.floor(n / 2);
}