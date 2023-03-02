import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./Components/Header";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Outlet />
    </RecoilRoot>
  );
}

export default App;
