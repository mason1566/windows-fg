import { useState } from "react";
import { DesktopIcon } from "./Icon";
import computerIcon from "./assets/Computer-with-programs.ico";
import agentIcon from "./assets/Agent.ico";

export default function Desktop({ id }) {
    return (
        <div id={id}>
            <div id="desktop-icon-grid">
                <DesktopIcon imageUrl={computerIcon} width="50px" height="auto" />
                <DesktopIcon imageUrl={agentIcon} width="50px" height="auto" />
            </div>
        </div>
    );
}