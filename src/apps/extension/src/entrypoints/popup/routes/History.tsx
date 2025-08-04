import { HistoricalSessions } from '@blockit/ui';
import { useNavigate } from 'react-router-dom';

export function HistoryScreen() {
  const navigate = useNavigate();

  return (
    <HistoricalSessions 
      onViewRoutine={(routineId) => navigate(`/routine/${routineId}`)}
      onViewFocusSession={(sessionId) => navigate(`/focus-session/${sessionId}`)}
    />
  );
}