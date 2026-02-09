
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export { QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60,
        },
        mutations: {
            retry: 2,
        },
    },
})
export { useMutation, useQuery, useQueryClient };