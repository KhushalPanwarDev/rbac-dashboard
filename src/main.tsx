import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RbacAdminDashboard from './components/RbacDashboard/RbacDashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RbacAdminDashboard />
  </StrictMode>,
)
