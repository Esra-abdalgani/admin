import CountriesList from './component/layout/CountriesList.jsx'
import {Route,Routes} from 'react-router-dom'
import Login from './component/login.jsx'
import Layout from './component/Layout.jsx'
import RequireAuth from './component/RequireAuth.jsx'
import Config from './component/layout/Config.jsx'
import Country from './component/layout/Country.jsx'
import ConfigEdit from './component/layout/ConfigEdit.jsx'



function App() {
  return (
    <Routes>
    
      <Route index element={<Login/>}/>

        <Route element={<RequireAuth/>} >
          <Route path='admin' element={<Layout />}>
          <Route path='countriesList' element={<CountriesList/>}/>
         <Route path='country/:id' element={<Country/>}/>
          
          <Route path="config" element={<Config />}/>
          <Route path='configEdit/:key' element={<ConfigEdit/>}/>
 
      
          </Route>


        </Route>
      
    </Routes>


  )
}

export default App
