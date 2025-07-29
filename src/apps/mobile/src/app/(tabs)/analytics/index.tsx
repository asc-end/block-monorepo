import { Stats } from "@blockit/ui";
import { router } from "expo-router";

export default function StatsScreen () {
  return <Stats onNavigateToHistorical={() => router.push("/(tabs)/analytics/historical")}/>
}