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

class DragObject {
    dragStart = { x: null, y: null };
    dragEnd = { x: null, y: null };

    getDrag() {
        if (this.dragStart.x === null || this.dragStart.y === null || this.dragEnd.x === null || this.dragEnd.y === null) {
            throw new Error("DragObject.getDrag: Both drag points must be defined");
        }

        let newX = this.dragEnd.x - this.dragStart.x;
        let newY = this.dragEnd.y - this.dragStart.y;
        return {x: newX, y: newY};
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

export function DesktopIcon({ imageUrl, width, height, children, className = "" }) {

    function handleDoubleClick(event) {
        alert("Double click!");
    }

    return (
        <div className={ className + " desktop-icon" }
            draggable={true}
            tabIndex={0}
            onDoubleClick={(e) => handleDoubleClick(e)}
        >
            <Icon imageUrl={imageUrl} width={width} height={height} />
            <p className="desktop-icon-text" >{children}</p>
        </div>
    );
}

// an IconDropZone component is swapped with a DesktopIcon when the DesktopIcon is dropped in the zone.
export function IconDropZone() {

}