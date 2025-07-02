
import OrgDetailsPage from '@/components/org/OrgDetailsPage';
import { useNavigate } from 'react-router-dom';

const OrgDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return <OrgDetailsPage onBack={handleBack} />;
};

export default OrgDetails;
