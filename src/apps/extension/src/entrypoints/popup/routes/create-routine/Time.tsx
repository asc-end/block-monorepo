import { RoutineTime } from "@blockit/ui";
import { useNavigate } from "react-router-dom";

export function TimeScreen() {
    const navigate = useNavigate();
    return <RoutineTime onBack={() => navigate(-1)} />;
}