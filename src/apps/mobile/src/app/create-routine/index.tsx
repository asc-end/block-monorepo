import { router } from "expo-router";
import { CreateRoutine } from "@blockit/ui";
import { useSolana } from "@/hooks/solana/useSolana";

export default function CreateRoutinePage() {    
    const { signAndSendTransaction } = useSolana();

    return (
        <CreateRoutine
            onBack={() => router.back()}
            onApps={() => router.push("/create-routine/apps")}
            onRoutineTime={() => router.push("/create-routine/time")}
            onCalendar={() => router.push("/create-routine/calendar")}
            onMoney={() => router.push("/create-routine/money")}
            sendTransaction={signAndSendTransaction}
        />
    );
}
