"use client"

import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react';

const client = new QueryClient();

export function QueryClientProvider({children}: PropsWithChildren){
    return <Provider client={client}>{children}</Provider>

}