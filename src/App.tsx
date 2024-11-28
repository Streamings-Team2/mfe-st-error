import React from 'react'
import ReactDOM from 'react-dom/client'
// import Errors from './components/Errors'
// import NotFound from './components/pages/NotFound'
import Unavailable from './components/pages/Unavailable'
import ErrorBoundary from './components/ErrorBoundary'
// import BuggyComponent from './components/BuggyComponent'

const App = () => (
  <ErrorBoundary>
  <div>
    {/* <Errors/> */}
    {/* <BuggyComponent/> */}
    {/* <NotFound/> */}
    {/* <h1>App</h1> */}
    <Unavailable/>.
  </div>
  </ErrorBoundary>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)