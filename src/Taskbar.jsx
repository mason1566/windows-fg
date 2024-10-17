export default function Taskbar({ id }) {
    return (
        <div id={id} className="display: flex; flex-direction: row;">
            <TaskbarAppsSection />
            <TaskbarTimeSection />
        </div>
    );
}



function TaskbarAppsSection() {
    return (
        <div id="main-taskbar"></div>
    );
}

function TaskbarTimeSection() {
    return (
        <div id="time-taskbar"></div>
    );
}