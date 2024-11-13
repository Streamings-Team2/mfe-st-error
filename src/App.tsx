import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
// import Errors from './components/Errors'
// import NotFound from './components/pages/NotFound'
import Unavailable from './components/pages/Unavailable'

const App = () => (
  <div>
    {/* <Errors/> */}
    {/* <NotFound/> */}
    <Unavailable/>.
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)