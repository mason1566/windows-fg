import './desktop.css';
import { useState } from "react";
import { DesktopIcon } from "./Icon";
import DesktopIconManager from "./DesktopIconManager";

import computerIcon from "./assets/icons/Computer-with-programs.ico";
import agentIcon from "./assets/icons/Agent.ico";

export default function Desktop() {
    return (
        <div id="desktop">
            <DesktopIconManager>
                <DesktopIcon imageUrl={computerIcon} width="50px" height="auto" >Hello!</DesktopIcon>
                <DesktopIcon imageUrl={agentIcon} width="50px" height="auto" >Click Here!</DesktopIcon>
            </DesktopIconManager>
        </div>
    );
}