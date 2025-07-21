import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router ,Link,Routes,Route} from 'react-router-dom'
import AllRoutes from './components/AllRoutes'


function App() {
  return (

      <>
      {/* after getting navbar add here */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/recruitments" style={{ margin: "0 10px" }}>Recruitments</Link>
        <Link to="/post-recruitment" style={{ margin: "0 10px" }}>Post Job</Link>
        <Link to="/achievements" style={{ margin: "0 10px" }}>Achievements</Link>
        <Link to="/post-achievement" style={{ margin: "0 10px" }}>Post Achievement</Link>
      </nav>
      <AllRoutes/>
    </>
  )
}

export default App
