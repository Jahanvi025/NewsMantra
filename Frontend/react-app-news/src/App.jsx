import react from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import CurrentAffairs from "./Components/CurrentAffairs/CurrentAffairs";
import Navbar from "./Components/NavbarAndFooter/Navbar";
import Footer from "./Components/NavbarAndFooter/Footer";
import AllNews from "./Components/News/AllNews";
import FamousNews from "./Components/FamousNews/FamousNews";
import Notes from "./Components/Notes/Notes";
import ViewNotes from "./Components/Notes/ViewNotes";
import ContactUS from "./Components/ContactPage/ContactUS";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import NeonCursor from "./Components/StylesFolder/NeonCursor";
import CreateAndUpdateNote from "./Components/Notes/CreateAndUpdateNote";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <div>
          <Navbar />
          <HomePage />
          <CurrentAffairs />
          <Footer />
        </div>
    },
    {
      path: '/news',
      element:
        <div>
          <Navbar />
          <AllNews />
          <Footer />
        </div>
    },
    {
      path: '/famous-stories',
      element:
        <div>
          <Navbar />
          <FamousNews />
          <Footer />
        </div>
    },
    {
      path: '/articles',
      element:
        <div>
          <Navbar />
          <CreateAndUpdateNote />
          <Notes />
          <Footer />
        </div>
    },
    {
      path: '/view-article/:id',
      element:
        <div>
          <Navbar />
          <ViewNotes />
          <Footer />
        </div>
    },
    {
      path: '/about',
      element:
        <div>
          <Navbar />
          <About />
          <Footer />
        </div>
    },
    {
      path: '/login',
      element:
        <div>
          <Navbar />
          <Login />
          <Footer />
        </div>
    },
    {
      path: '/register',
      element:
        <div>
          <Navbar />
          <Register />
          <Footer />
        </div>
    },
    {
      path: '/contactus',
      element:
        <div>
          <Navbar />
          <ContactUS />
        </div>
    },
    {
      path: '*',
      element: <NotFound />
    }


  ])

  return (
    <div>
      <RouterProvider router={router} />
      <NeonCursor />
    </div>
  );
}

export default App;
