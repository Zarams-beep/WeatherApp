import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "../component/Homepage";
import Footer from "../component/Footer";
import Search from '../component/Search';
import FloatingSocial from '../component/FloatingSocial';
function App() {
  
  return (
    <>
      <Router>
      <div>
        <FloatingSocial/>
        <Routes>
          <Route exact path="/" element={ <HomePage/>} />
          <Route path='/search' element={<Search/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
    </>
  )
}

export default App
