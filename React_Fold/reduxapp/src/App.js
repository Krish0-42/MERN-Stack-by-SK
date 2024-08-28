// npm i react-router-dom for react-router-dom for library 
// npm install react-redux 

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import { myStore } from './redux/config';
import Home from './Home';
import About from './About'; 
import Contact from './Contact';

function App() {
  const routerPaths = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/About", element: <About /> },
    { path: "/Contact", element: <Contact /> } 
  ]);

  return (
    <Provider store={myStore}>
      <div className="Navigate"> 
        <nav> 
          <link to="/Home"> Home</link> {/* <link> is similar to <a href="#"> */}
          <link to="/About"> About</link>
          <link to="/Contact"> Contact</link>
        </nav>
      </div>
    
      <div className="App">
        {/* <RouterProvider router={routerConfig} /> */}
        <RouterProvider router={routerPaths} />
      </div>
    </Provider>
  );
  
  // return (
  //   <Provider store={myStore}> 
  //     <div className = "App"> 
  //       {/* <RouterProvider router={routerConfig} /> */}
  //       <RouterProvider router={routerPaths} />
  //     </div>
  //   </Provider>
    
  //   <input type="button" value="add"/>
  //   <input type="button" value="sub"/>
  // );
  

}

export default App;
