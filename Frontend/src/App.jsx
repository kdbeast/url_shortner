import Navbar from "./components/Navbar";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
