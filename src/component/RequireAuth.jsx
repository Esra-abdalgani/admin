import { useEffect } from "react";
import { useNavigate,useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  let navigate = useNavigate()
  useEffect(() =>{

    if(!auth){
      navigate('/')
    }}
  ,[])

  const location = useLocation();
  return(
    auth?.email
      ? <Outlet />
      : <Navigate to='/' state={{ from:location }} replace/>
  )
}

export default RequireAuth