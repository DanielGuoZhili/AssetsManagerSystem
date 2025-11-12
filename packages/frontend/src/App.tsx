import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { AuthProvider } from './state/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

