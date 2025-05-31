import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
