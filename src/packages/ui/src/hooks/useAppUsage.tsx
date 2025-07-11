import { useState, useEffect } from 'react';
import { api } from "../stores/authStore";

interface UseAppUsageProps {
    beginDate?: Date;
    endDate?: Date;
}

interface HourlyData {
    date: string;
    hourlyBreakdown: Record<number, Record<string, { mobile: number; web: number }>>;
    totalStats: Record<string, { mobile: number; web: number }>;
}

export function useAppUsage(props: UseAppUsageProps & { hourlyDate?: string } = {}) {
    const { beginDate, endDate, hourlyDate } = props;

    // Daily/Range stats
    const [appUsage, setAppUsage] = useState<Record<string, Record<string, { web: number, mobile: number }>>>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Hourly stats
    const [hourlyLoading, setHourlyLoading] = useState(false);
    const [hourlyError, setHourlyError] = useState<string | null>(null);
    const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);

    // Fetch daily/range stats
    const loadStats = async () => {
        try {
            setLoading(true);

            let start = beginDate;
            let end = endDate;
            if (!start || !end) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                start = beginDate || today;
                end = endDate || new Date(today.getTime() + 86399999); // 23:59:59.999
            }

            const { data } = await api().get('/app-usage/stats', {
                params: {
                    startDate: start.toISOString(),
                    endDate: end.toISOString()
                }
            });

            setAppUsage(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching app usage stats:', err);
            setError('Failed to load app usage stats');
        } finally {
            setLoading(false);
        }
    };

    // Fetch hourly stats
    const loadHourlyStats = async () => {
        if (!hourlyDate) return;
        setHourlyLoading(true);
        setHourlyError(null);

        try {
            const { data } = await api().get('/app-usage/hourly-stats', {
                params: {
                    date: hourlyDate
                }
            });
            setHourlyData(data);
        } catch (err) {
            setHourlyError(err instanceof Error ? err.message : 'An error occurred');
            setHourlyData(null);
        } finally {
            setHourlyLoading(false);
        }
    };

    useEffect(() => { loadStats(); }, [beginDate, endDate]);
    useEffect(() => { loadHourlyStats(); }, [hourlyDate]);

    return {
        appUsage,
        error,
        loading,
        refetch: loadStats,

        // Hourly stats
        hourlyData,
        hourlyLoading,
        hourlyError,
        refetchHourly: loadHourlyStats
    };
};
