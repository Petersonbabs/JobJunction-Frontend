import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext.jsx'
import MessageProvider from './contexts/MessageContext.jsx'
import JobProvider from './contexts/JobContext.jsx'
import CompanyProvider from './contexts/CompanyContext.jsx'
import EmployeeProvider from './contexts/EmployeeContext.jsx'
import CategoryProvider from './contexts/CategoryContext.jsx'
import Navbar from './components/Navbar.jsx'
import ApplicationProvider from './contexts/ApplicationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplicationProvider>
          <JobProvider>
            <CompanyProvider>
              <EmployeeProvider>
                <CategoryProvider>
                  <MessageProvider>
                    
                    <App />
                  </MessageProvider>
                </CategoryProvider>
              </EmployeeProvider>
            </CompanyProvider>
          </JobProvider>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
