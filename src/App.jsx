import { Route, Routes } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import TalkBack from './components/TalkBack';
import { AppProvider } from './state/AppContext';

import Welcome from './screens/Welcome';
import Register from './screens/Register';
import SetPassword from './screens/SetPassword';
import RegisterResult from './screens/RegisterResult';
import Login from './screens/Login';
import Home from './screens/Home';
import Appointments from './screens/Appointments';
import FindDoctor from './screens/FindDoctor';
import DoctorProfile from './screens/DoctorProfile';
import ChooseDateTime from './screens/ChooseDateTime';
import AppointmentDetails from './screens/AppointmentDetails';
import AppointmentResult from './screens/AppointmentResult';
import CallScreen from './screens/CallScreen';
import MapPharmacy from './screens/MapPharmacy';
import ARMap from './screens/ARMap';
import MedicalRecords from './screens/MedicalRecords';
import VisitReport from './screens/VisitReport';
import SOSEmergency from './screens/SOSEmergency';

export default function App() {
  return (
    <AppProvider>
      <TalkBack />
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/password" element={<SetPassword />} />
          <Route path="/register/result" element={<RegisterResult />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/choose-datetime" element={<ChooseDateTime />} />
          <Route path="/appointment-details" element={<AppointmentDetails />} />
          <Route path="/appointment-result" element={<AppointmentResult />} />

          <Route path="/call" element={<CallScreen title="Video Call" />} />
          <Route path="/teleconsult" element={<CallScreen title="Teleconsult" />} />

          <Route path="/map" element={<MapPharmacy />} />
          <Route path="/ar-map" element={<ARMap />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/records/visit/:id" element={<VisitReport />} />
          <Route path="/sos" element={<SOSEmergency />} />

          <Route path="*" element={<Welcome />} />
        </Routes>
      </PhoneFrame>
    </AppProvider>
  );
}
