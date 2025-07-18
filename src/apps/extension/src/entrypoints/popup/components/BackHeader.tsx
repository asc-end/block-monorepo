import { Text, useTheme } from "@blockit/cross-ui-toolkit";
import { ChevronIcon } from "@blockit/ui";
import { useLocation, useNavigate } from "react-router-dom";

interface BackHeaderProps {
    title?: string;
}

export function BackHeader({ title }: BackHeaderProps = {}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentColors } = useTheme();
  
    // Map route paths to display names
    const routeNames: Record<string, string> = {
      '/stats': 'Stats',
      '/': 'Home',
    };
  
    // Get the current route name, fallback to path if not mapped
    const routeName = title || routeNames[location.pathname] || location.pathname.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
    return (
      <header className="flex items-center p-4 border-b" style={{gap: 20, borderColor: currentColors.neutral[200]}}>
        <button
          className=" flex items-center text-primary-500 hover:text-primary-600"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronIcon direction="left" size={20} color={currentColors.text.main} />
        </button>
        <Text variant='h5'>{routeName}</Text>
      </header>
    );
  }