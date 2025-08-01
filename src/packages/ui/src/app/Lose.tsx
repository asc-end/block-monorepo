import { Box, Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { Melt } from "./components/svgs/Melt";
import { Bruh } from "./components/svgs/Bruh";
import { useEffect, useState } from "react";
import { api } from "../stores/authStore";
import type { FocusSession } from "@blockit/shared";

const BruhText = () => <Text style={{ fontFamily: "ClashDisplay", fontSize: 96, lineHeight: 96, fontWeight: 700, letterSpacing: 28 }}>BRUH</Text>

interface LoseProps {
    sessionId?: string;
    onBack: () => void;
}

export function Lose({ sessionId, onBack }: LoseProps) {
    const { currentColors } = useTheme()
    const [session, setSession] = useState<FocusSession | null>(null);
    const [loading, setLoading] = useState(true);

    // sessionId ='000'
    useEffect(() => {
        
        if (sessionId) {
            handleSessionEnd();
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    const handleSessionEnd = async () => {
        try {
            // First fetch the session to get details
            const { data } = await api().get(`/focus-session/active`);
            console.log(data)
            setSession(data);
            
            // Then end the session if it's still active
            if (data && data.status === 'in_progress') {
                await api().post(`/focus-session/${sessionId}/disable`, {});
            }
        } catch (error) {
            console.error('Failed to handle session end:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log(session, sessionId, "looose")
    const stakeAmount = session?.commitment?.amount ? (parseFloat(session.commitment.amount) / 1e9).toFixed(2) : null;


    return (
        <Pressable onPress={() => onBack()} className="flex flex-col flex-1 items-center justify-center gap-4" style={{ backgroundColor: currentColors.background }}>
            <Box className="absolute left-0 right-0 top-0 z-40">
                <Melt />
            </Box>
            <Text></Text>
            <Bruh />
            <Text style={{ fontFamily: "ClashDisplay", fontWeight: "medium", fontSize: 24, lineHeight: 24 }}>Don't let your brain melt</Text>
            {stakeAmount && <Text style={{ fontFamily: "ClashDisplay", fontSize: 64, lineHeight: 64, fontWeight: "bold" }}>-{stakeAmount} SOL</Text>}
        </Pressable>
    )
}