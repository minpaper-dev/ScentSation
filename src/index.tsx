import React from 'react'
import ReactDOM from 'react-dom'
import CreateDOM from 'react-dom/client'
import './index.css'
import './font.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = CreateDOM.createRoot(rootElement)

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)

reportWebVitals(console.log)
