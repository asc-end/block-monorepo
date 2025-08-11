import { RoutineApps } from "@blockit/ui";
import { useRouter } from "expo-router";
import { useRoutineBackHandler } from "@/hooks/useRoutineBackHandler";
import { useAppBlocker } from "@/context/AppBlockerContext";

export default function AppsScreen() {
    useRoutineBackHandler();
    const router = useRouter();
    const { installedApps } = useAppBlocker()

    return (
        <RoutineApps onBack={() => router.back()} nativeApps={installedApps} />
    );
}