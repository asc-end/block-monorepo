import { RoutineCalendar } from "@blockit/ui";
import { useNavigate } from "react-router-dom";

export function CalendarScreen() {
    const navigate = useNavigate();
    return <RoutineCalendar onBack={() => navigate(-1)} />;
}