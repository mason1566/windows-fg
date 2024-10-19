import './window.css';

function Window({ children, windowName, windowIcon }) {

    function closeWindow() {

    }
    
    function minimizeWindow() {

    }

    return (
        <div className="window">
            <div className="window-top">
                <WindowInfo windowName={windowName} windowIcon={windowIcon} />
                <WindowControls close={() => closeWindow()} minimize={() => minimizeWindow()}/>
            </div>
            <div className="window-content">

            </div>
        </div>
    );
}

function WindowInfo({ windowName, windowIcon }) {

}

function WindowControls({ close, minimize }) {

}

export default function WindowManager({ children }) {

}
