import { useState } from "react";
import { DesktopIcon } from "./Icon";
import computerIcon from "./assets/icons/Computer-with-programs.ico";
import agentIcon from "./assets/icons/Agent.ico";
import webpageIcon from "./assets/icons/Turn-Off-Computer-(full).ico";

export default function Desktop({ id }) {
    return (
        <div id={id}>
            <div id="desktop-icon-grid">
                <DesktopIcon imageUrl={computerIcon} width="50px" height="auto" >Hello!</DesktopIcon>
                <DesktopIcon imageUrl={agentIcon} width="50px" height="auto" >Click Here!</DesktopIcon>
                <DesktopIcon imageUrl={webpageIcon} width="50px" height="auto" ><strong>Shop Now</strong></DesktopIcon>
            </div>
        </div>
    );
}