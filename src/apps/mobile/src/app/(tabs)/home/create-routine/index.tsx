import { router } from "expo-router";
import { CreateRoutine } from "@blockit/ui";
import { useSolana } from "@/hooks/solana/useSolana";

export default function CreateRoutinePage() {    
    const { signAndSendTransaction } = useSolana();

    return (
        <CreateRoutine
            onBack={() => router.back()}
            onApps={() => router.push("/(tabs)/home/create-routine/apps")}
            onRoutineTime={() => router.push("/(tabs)/home/create-routine/time")}
            onCalendar={() => router.push("/(tabs)/home/create-routine/calendar")}
            onMoney={() => router.push("/(tabs)/home/create-routine/money")}
            sendTransaction={signAndSendTransaction}
        />
    );
}
