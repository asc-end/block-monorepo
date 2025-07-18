import { ViewRoutine, api } from "@blockit/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackHeader } from "../components/BackHeader";
import type { Routine } from "@blockit/shared";

export function ViewRoutineScreen() {
    const { routineId } = useParams();
    const navigate = useNavigate();
    const [routineName, setRoutineName] = useState<string>("");

    useEffect(() => {
        const fetchRoutineName = async () => {
            try {
                const response = await api().get<Routine>(`/routines/${routineId}`);
                setRoutineName(response.data.name);
            } catch (error) {
                console.error('Failed to fetch routine name:', error);
            }
        };

        if (routineId) {
            fetchRoutineName();
        }
    }, [routineId]);

    return (
        <>
            <BackHeader title={routineName || "Routine"} />
            <ViewRoutine onBack={() => navigate(-1)} routineId={routineId as string} />
        </>
    );
}