import { CreateRoutine } from "@blockit/ui";
import { useNavigate } from "react-router-dom";

export function CreateRoutineScreen() {
    const navigate = useNavigate();

    return <CreateRoutine
        onBack={() => navigate("/")}
        onApps={() => navigate("/create-routine/apps")}
        onRoutineTime={() => navigate("/create-routine/time")}
        onCalendar={() => navigate("/create-routine/calendar")}
        onMoney={() => navigate("/create-routine/money")}
    />;
}