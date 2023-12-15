import { UserProvider } from "./components/AccountTypes/UserContext";
import AppContent from "./AppContent";
import { CompanyProvider } from "./components/AccountTypes/CompanyContext";
import "./App.css"
function App() {

  return (
    <>
    {/* UserProvider: //Context for managing the current user */}
    {/* CompanyProvider: //Context for managing the current Company */}
    {/* AppContent: //Component with routes */}
      <UserProvider>
        <CompanyProvider>
          <AppContent />
        </CompanyProvider>
      </UserProvider>
    </>
  );
}

export default App;
