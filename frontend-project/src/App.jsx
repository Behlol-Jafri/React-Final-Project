import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainlayout';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Categories from './components/categories';
import UserDashboard from './components/userDashboard';
import CarDetailsComponent from './components/carDetails';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/category/:categoryName' element={<Categories/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/userDashboard' element={<UserDashboard/>}/>
          <Route path='/carDetails/:Id' element={<CarDetailsComponent/>}/>
      </Route>
    </Routes>
    </>
  )
}

library.add(far);
library.add(fas);
library.add(fab);
export default App
