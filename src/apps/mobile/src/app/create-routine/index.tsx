import { router } from "expo-router";
import { CreateRoutine } from "@blockit/ui";

export default function CreateRoutinePage() {

    return (
        <CreateRoutine
            onBack={() => router.back()}
            onApps={() => router.push("create-routine/apps")}
            onRoutineTime={() => router.push("create-routine/time")}
            onCalendar={() => router.push("create-routine/calendar")}
            onMoney={() => router.push("create-routine/money")}
        />
    );
}
