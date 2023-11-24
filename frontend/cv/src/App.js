import { UserProvider } from "./components/AccountTypes/UserContext";
import AppContent from "./AppContent";
import { CompanyProvider } from "./components/AccountTypes/CompanyContext";
import "./App.css"
function App() {

  return (
    <>
      <UserProvider>
        <CompanyProvider>
          <AppContent />
        </CompanyProvider>
      </UserProvider>
    </>
  );
}

export default App;
