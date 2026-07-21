import { useState } from "react";
import Login from "./features/auth/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>{isLogin ? <>YOU ARE NOW LOGIN </> : <Login setIsLogin={setIsLogin} />}</>
  );
}

export default App;
