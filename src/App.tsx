import Employees from "./features/employee/Employees";
import { Providers } from "./app/providers/Provider";

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
