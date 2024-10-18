import { useState } from "react";

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
    const [drag, setDrag] = useState(new DragObject());
    const [position, setPosition] = useState({top: 0, left: 0})


    function handleDrag(event) {
        // console.log(event);
        let newDrag = new DragObject();
        newDrag.dragStart = { x: event.clientX, y: event.clientY };
        setDrag(newDrag);
        // console.log(drag);
    }

    function handleDragEnd(event) {
        // console.log(event);
        let newDrag = new DragObject();
        newDrag.dragStart = drag.dragStart;
        newDrag.dragEnd = { x: event.clientX, y: event.clientY };

        let dragCalculation = newDrag.getDrag();
        let newPosition = {top: dragCalculation.y + position.top, left: dragCalculation.x + position.left};
        setPosition(newPosition);
        console.log(newPosition)

        // reset the drag
        setDrag(new DragObject());
    }



    return (
        <div className="icon"
            style={{top: position.top, left: position.left}}
            onDragEnd={(e) => handleDragEnd(e)} 
            onDragStart={(e) => handleDrag(e)}
        >
            <img className="icon-img" src={icon.imageUrl} height={icon.height} width={icon.width} />
        </div>
    );
}


// const container = document.querySelector(".container");
// function onMouseDrag({ movementX, movementY }) {
//     let getContainerStyle = window.getComputedStyle(container);
//     let leftValue = parseInt(getContainerStyle.left);
//     let topValue = parseInt(getContainerStyle.top);
//     container.style.left = `${leftValue + movementX}px`;
//     container.style.top = `${topValue + movementY}px`;
// }
// container.addEventListener("mousedown", () => {
//     container.addEventListener("mousemove", onMouseDrag);
// });
// document.addEventListener("mouseup", () => {
//     container.removeEventListener("mousemove", onMouseDrag);
// });


// function DesktopIcon({ imageUrl, width, height }) {
//     const [icon, setIcon] = useState(new IconObject(imageUrl, width, height));

//     return (
//         <div className="desktop-icon">
//             <img className="desktop-icon-img" src={icon.imageUrl} height={icon.height} width={icon.width} />
//         </div>
//     );
// }

// function TaskbarIcon({ imageUrl, width, height }) {
//     const [icon, setIcon] = useState(new IconObject(imageUrl, width, height));

//     return (
//         <div className="taskbar-icon">
//             <img className="taskbar-icon-img" src={icon.imageUrl} height={icon.height} width={icon.width} />
//         </div>
//     );
// }