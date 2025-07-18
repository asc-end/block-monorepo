import { RoutineApps } from "@blockit/ui";
import { useRouter } from "expo-router";

export default function AppsScreen() {
    const router = useRouter();
    
    return (
        <RoutineApps onBack={() => router.back()} />
    );
}