import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import AppRoute from './app/routes/AppRoute.tsx'
import { store } from './app/store/store.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AppRoute />
        </Provider>
    </QueryClientProvider>
)
