import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './assets/layout';
import theme from './assets/theme';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={new QueryClient()}>
				<Layout>
					<RouterProvider router={router} />
				</Layout>
			</QueryClientProvider>
		</ChakraProvider>
  	</React.StrictMode>
);
