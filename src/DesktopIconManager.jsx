// CSS
import './desktop-icon-manager.css';
// React imports
import { useRef } from 'react';
// Custom Components
import { DesktopIcon } from "./Icon";
// Assets/Images
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

export default function DesktopIconManager({ children }) {
    let shopIcon = <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" className="shop-icon" ><strong>Shop Now</strong></DesktopIcon>;
    const iconGrid = useRef(null);

    return (
        <div id="desktop-icon-grid" ref={iconGrid}>
            { children }
            { shopIcon }
        </div>
    );
}