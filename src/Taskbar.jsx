import './taskbar.css';

export default function Taskbar() {
    return (
        <div id="taskbar" className="display: flex; flex-direction: row;">
            <TaskbarMain />
            <TaskbarClock />
        </div>
    );
}



function TaskbarMain() {
    return (
        <div id="main-taskbar"></div>
    );
}

function TaskbarClock() {
    return (
        <div id="time-taskbar"></div>
    );
}