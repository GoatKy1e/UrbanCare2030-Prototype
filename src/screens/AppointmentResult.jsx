import { useLocation, useNavigate } from 'react-router-dom';
import ResultScreen from '../components/ResultScreen';

// Ported from "02e Appointment Successful.js" / "02e Appointment Unsuccessful.js"
export default function AppointmentResult() {
  const navigate = useNavigate();
  const { success } = useLocation().state || { success: true };

  if (success) {
    return (
      <ResultScreen
        success
        heading="Appointment Booking"
        badgeTitle="Successful"
        badgeSubtitle="Appointment Booked!"
        ctaLabel="Go to appointments"
        onCta={() => navigate('/appointments')}
        secondaryLabel="Back to home"
        onSecondary={() => navigate('/home')}
      />
    );
  }

  return (
    <ResultScreen
      success={false}
      heading="Appointment Booked"
      badgeTitle="Failed"
      badgeSubtitle="Please Try again"
      ctaLabel="Try again"
      onCta={() => navigate('/choose-datetime')}
      secondaryLabel="Back to home"
      onSecondary={() => navigate('/home')}
    />
  );
}
