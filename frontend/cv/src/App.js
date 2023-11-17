import { UserProvider } from "./components/AccountTypes/UserContext";
import AppContent from "./AppContent";


function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App