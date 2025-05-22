import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import login from './login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  
  return code? <Dashboard /> : <login />
}

export default App
