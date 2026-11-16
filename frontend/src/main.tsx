import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/tokens.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/lists.css'
import './styles/dashboard.css'
import './styles/recipes.css'
import "./styles/ingredients.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
