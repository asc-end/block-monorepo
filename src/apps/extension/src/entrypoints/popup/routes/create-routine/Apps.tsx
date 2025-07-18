import { RoutineApps } from "@blockit/ui";
import { useNavigate } from "react-router-dom";

export function AppsScreen() {
    const navigate = useNavigate();
    return <RoutineApps onBack={() => navigate(-1)} />;
}