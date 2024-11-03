import './desktop.css';
import { useState } from "react";
import { DesktopIcon } from "./Icon";
import DesktopIconGrid from "./DesktopIconGrid";

import computerIcon from "./assets/icons/Computer-with-programs.ico";
import agentIcon from "./assets/icons/Agent.ico";

export default function Desktop() {
    return (
        <div id="desktop">
            <DesktopIconGrid>
                <DesktopIcon imageUrl={computerIcon} width="50px" height="auto" >Hello!</DesktopIcon>
                <DesktopIcon imageUrl={agentIcon} width="50px" height="auto" >Click Here!</DesktopIcon>
            </DesktopIconGrid>
        </div>
    );
}