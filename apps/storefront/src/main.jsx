import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext'
import { ContentProvider } from './context/ContentContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </AppProvider>
  </StrictMode>,
)
