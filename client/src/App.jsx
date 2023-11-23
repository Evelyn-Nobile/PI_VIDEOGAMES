import { Routes, Route, useLocation} from "react-router-dom";
import { Landing, Home, Detail, Form } from "./views";
import { Navbar } from "./components";





function App() {
  const location = useLocation();

  return (
    <div>
 
 
      {location.pathname !== "/"  && (<Navbar/>)}

         <Routes>        

      <Route path='/' element={<Landing />}>    
            </Route>

       <Route path='/home' element={<Home />}>    
            </Route>    

      <Route path='/details/:id' element={<Detail />}>
             </Route>      

        <Route path='/create' element={<Form />}>
     </Route>
    
     
      </Routes>
      
    </div>
  );
}

export default App;
