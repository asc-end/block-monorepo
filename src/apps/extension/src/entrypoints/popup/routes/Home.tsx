import { Home } from '@blockit/ui';
import { useNavigate } from 'react-router-dom';
import { Box } from '@blockit/cross-ui-toolkit';

export function HomeScreen() {
  const navigate = useNavigate();

  // Add a wrapper to offset the absolute positioned header in Home component
  return (
    <Box className="relative" style={{ paddingTop: '0px' }}>
      <Home 
        onCreateRoutine={() => navigate('/create-routine')} 
        onViewRoutine={(routineId) => navigate(`/routine/${routineId}`)}
      />
    </Box>
  )
}