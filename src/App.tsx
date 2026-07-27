import Employees from "./features/employee/Employees";
import { Providers } from "./providers/Provider";

function App() {
  return (
    <>
      <Providers>
        <Employees />
      </Providers>
    </>
  );
}

export default App;
