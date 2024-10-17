import "./App.css";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";

export default function App() {
  return (
    <>
      <Desktop id="desktop" />
      <Taskbar id="taskbar" />
    </>
  );
}