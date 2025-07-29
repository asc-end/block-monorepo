import { RoutineMoney } from "@blockit/ui";
import { router } from "expo-router";

export default function MoneyScreen() {
    return (
        <RoutineMoney onBack={() => {
            router.back();
        }} />
    );
}