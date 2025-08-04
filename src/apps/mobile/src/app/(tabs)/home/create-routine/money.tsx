import { RoutineMoney } from "@blockit/ui";
import { router } from "expo-router";
import { useRoutineBackHandler } from "@/hooks/useRoutineBackHandler";

export default function MoneyScreen() {
    useRoutineBackHandler();
    return (
        <RoutineMoney onBack={() => {
            router.back();
        }} />
    );
}