import { useLocation, useNavigate } from 'react-router-dom';
import ResultScreen from '../components/ResultScreen';

// Ported from "00c Registration Successful.js" / "00c Registration Unsuccessful.js"
export default function RegisterResult() {
  const navigate = useNavigate();
  const { success, method, value } = useLocation().state || { success: true };

  if (success) {
    return (
      <ResultScreen
        success
        heading="Welcome to UrbanCare"
        badgeTitle="Success"
        badgeSubtitle="Registration Complete"
        ctaLabel="Continue to log in"
        onCta={() => navigate('/login')}
      />
    );
  }

  return (
    <ResultScreen
      success={false}
      heading="Registration Unsuccesful"
      badgeTitle="Failed"
      badgeSubtitle="Please Try again"
      ctaLabel="Try again"
      onCta={() => navigate('/register/password', { state: { method, value } })}
      secondaryLabel="Back to start"
      onSecondary={() => navigate('/')}
    />
  );
}
