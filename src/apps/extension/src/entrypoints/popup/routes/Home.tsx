import { useTheme } from '@blockit/cross-ui-toolkit';
import { Home } from '@blockit/ui';
import { Link, useNavigate } from 'react-router-dom';

export function HomeScreen() {
  const { currentColors } = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex justify-end items-center p-4 border-b" style={{ borderColor: currentColors.neutral[200] }}>
        <nav className="flex gap-4">
          <Link to="/stats" className="hover:opacity-70" style={{ color: currentColors.text.main }}>Stats</Link>
        </nav>
      </header>
      <Home 
        onCreateRoutine={() => navigate('/create-routine')} 
        onViewRoutine={(routineId) => navigate(`/routine/${routineId}`)}
      />
    </div>
  )
}