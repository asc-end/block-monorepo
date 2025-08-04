import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from "../stores/authStore";

interface UseAppUsageProps {
    beginDate?: Date;
    endDate?: Date;
    hourlyDate?: string;
}

interface HourlyData {
    date: string;
    hourlyBreakdown: Record<number, Record<string, { mobile: number; web: number }>>;
    totalStats: Record<string, { mobile: number; web: number }>;
}

type AppUsageData = Record<string, Record<string, { web: number, mobile: number, icon?: string | null }>>;

interface UseAppUsageQueryReturn {
    appUsage: AppUsageData;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    hourlyData: HourlyData | null;
    hourlyLoading: boolean;
    hourlyError: string | null;
    refetchHourly: () => void;
    refetchAll: () => Promise<void>;
    setOptimisticData: (date: string) => void;
    queryClient: any;
}

export function useAppUsageQuery(props: UseAppUsageProps = {}): UseAppUsageQueryReturn {
    const { beginDate, endDate, hourlyDate } = props;
    const queryClient = useQueryClient();
    
    // Get timezone offset in minutes
    const timezoneOffset = new Date().getTimezoneOffset();

    // Calculate date range
    let start = beginDate;
    let end = endDate;
    if (!start || !end) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        start = beginDate || today;
        end = endDate || new Date(today.getTime() + 86399999); // 23:59:59.999
    }

    // Query for daily/range stats
    const statsQuery = useQuery<AppUsageData>({
        queryKey: ['app-usage-stats', start.toISOString(), end.toISOString(), timezoneOffset],
        queryFn: async () => {
            const { data } = await api().get('/app-usage/stats', {
                params: {
                    startDate: start.toISOString(),
                    endDate: end.toISOString(),
                    timezoneOffset: timezoneOffset.toString()
                }
            });
            return data;
        },
        staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    });

    // Query for hourly stats
    const hourlyQuery = useQuery<HourlyData>({
        queryKey: ['app-usage-hourly', hourlyDate, timezoneOffset],
        queryFn: async () => {
            if (!hourlyDate) throw new Error('No date provided');
            
            const { data } = await api().get('/app-usage/hourly-stats', {
                params: {
                    date: hourlyDate,
                    timezoneOffset: timezoneOffset.toString()
                }
            });
            return data;
        },
        enabled: !!hourlyDate, // Only run if hourlyDate is provided
        staleTime: 1000 * 60 * 5,
    });

    // Function to invalidate and refetch all queries
    const refetchAll = async () => {
        await queryClient.invalidateQueries({ queryKey: ['app-usage-stats'] });
        await queryClient.invalidateQueries({ queryKey: ['app-usage-hourly'] });
    };

    // Function to set optimistic data while syncing
    const setOptimisticData = (date: string) => {
        // You could set temporary loading state or placeholder data here
        queryClient.setQueryData(
            ['app-usage-stats', start.toISOString(), end.toISOString(), timezoneOffset],
            (oldData: AppUsageData | undefined) => {
                if (!oldData) return oldData;
                // Could add a loading indicator for specific date
                return { ...oldData };
            }
        );
    };

    return {
        // Daily/Range stats - renamed to match Stats component expectations
        appUsage: statsQuery.data || {} as AppUsageData,
        loading: statsQuery.isLoading,
        error: statsQuery.error?.message || null,
        refetch: statsQuery.refetch,

        // Hourly stats
        hourlyData: hourlyQuery.data || null,
        hourlyLoading: hourlyQuery.isLoading,
        hourlyError: hourlyQuery.error?.message || null,
        refetchHourly: hourlyQuery.refetch,

        // Combined operations
        refetchAll,
        setOptimisticData,
        
        // Expose query client for advanced operations
        queryClient
    };
}