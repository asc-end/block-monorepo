import { ViewRoutine } from "@blockit/ui";
import { router, useLocalSearchParams } from "expo-router";

export default function RoutineScreen() {
    const { routineId } = useLocalSearchParams();

    return <ViewRoutine onBack={() => router.back()} routineId={routineId as string} />;
}