import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import HomePage from './components/HomePage'

function App() {
  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage/>
    </QueryClientProvider>  
  )
}

export default App
