import CountriesList from './component/layout/mainPages/CountriesList.jsx'
import {Route,Routes} from 'react-router-dom'
import Login from './component/login.jsx'
import Layout from './component/Layout.jsx'
import RequireAuth from './component/RequireAuth.jsx'
import Config from './component/layout/mainPages/Config'
import Country from './component/layout/mainPages/Country.jsx'
import ConfigEdit from './component/layout/mainPages/ConfigEdit.jsx'



function App() {
  return (
    <Routes>
      <Route index element={<Login/>}/>
      <Route element={<RequireAuth/>} >
        <Route path='admin' element={<Layout />}>
          <Route path='countriesList' element={<CountriesList/>}/>
          <Route path='country/:id' element={<Country/>}/>
          <Route path="config" element={<Config />}/>
          <Route path='configEdit/:k' element={<ConfigEdit/>}/>
        </Route>
      </Route>
    </Routes>


  )
}

export default App
