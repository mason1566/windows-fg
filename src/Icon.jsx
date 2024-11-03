import { useState } from "react";
import './icon.css';

class IconObject {
    imageUrl = "";
    width = "10px";
    height = "10px";

    constructor( imageUrl, width, height) {
        this.imageUrl = imageUrl;
        this.width = width;
        this.height = height;
    }
}

export default function Icon({ imageUrl, width, height }) {
    const [icon, setIcon] = useState(new IconObject(imageUrl, width, height));

    return (
        <div className="icon" draggable={false}>
            <img className="icon-img" src={icon.imageUrl} height={icon.height} width={icon.width} draggable={false} />
        </div>
    );
}

export function DesktopIcon({ imageUrl, width, height, children, id, className = "", style = {} }) {

    function handleDoubleClick(event) {
        alert("Double click!");
    }

    function handleDragStart(event) {
        // event.preventDefault();
        event.dataTransfer.setData("text/html", event.target.id);
        console.log("ID is:", event.target.id)
        event.dataTransfer.dropEffect = "move";
    }

    function handleDrag(event) {

    }

    return (
        <div
            id={id}
            key={imageUrl}
            className={ "desktop-icon " + className }
            draggable={true}
            tabIndex={0}
            onDoubleClick={(e) => handleDoubleClick(e)}
            style={style}
            onDragStart={(e) => handleDragStart(e)}
        >
            <Icon imageUrl={imageUrl} width={width} height={height} />
            <p className="desktop-icon-text" >{children}</p>
        </div>
    );
}

// a DesktopIconSlot component is swapped with a DesktopIcon when the DesktopIcon is dropped in the zone.
export function DesktopIconSlot({ index, children }) {

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    } 

    function handleDrop(event) {
        event.preventDefault();
        const iconId = event.dataTransfer.getData("text/html");
        event.target.appendChild(document.getElementById(iconId));
    }

    return (
        <div 
            key={index} 
            className="desktop-icon-slot" 
            draggable={false}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
        >
            {children}
        </div>
    );
}