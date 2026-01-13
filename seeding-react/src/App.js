import './App.css'
import AppRoutes from "./routes/routes";
import { UserProvider } from "./context/UserContext";
import OtpPopup from "./PopUp/OtpPopUp";
import SuperAdminDashboard from "./SuperAdminDashboard/SuperAdminDashboard";
import BrowserForwardBack from './BrowserForwardBack';


function App() {
  
 
  return (
    <div className="App">
      <UserProvider>
        <AppRoutes/>
      </UserProvider>


      
     
    </div>
  );
}
export default App;