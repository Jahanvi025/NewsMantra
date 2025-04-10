import react from "react";
import { Toaster } from "react-hot-toast"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import CurrentAffairs from "./Components/CurrentAffairs/CurrentAffairs";
import Navbar from "./Components/NavbarAndFooter/Navbar";
import Footer from "./Components/NavbarAndFooter/Footer";
import AllNews from "./Components/News/AllNews";
import FamousNews from "./Components/FamousNews/FamousNews";
import ContactUS from "./Components/ContactPage/ContactUS";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import NeonCursor from "./Components/StylesFolder/NeonCursor";
import CurrentNewsPage from "./Components/CurrentAffairs/CurrentNewsPage";
import Profile from "./Components/Profile/Profile";
import ViewNotes from "./Components/Notes/ViewNotes";
import CreateAndUpdateNote from "./Components/Notes/CreateAndUpdateNote";
import NewsArticlePage from "./Components/News/NewsArticlePage";
import DifferentNewsPapers from "./Components/News/DifferentNewsPapers";
import DifferentNewspaperArticlePage from "./Components/News/DifferentNewspaperArticlePage";

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
      path: '/news/times-of-india',
      element:
        <div>
          <Navbar />
          <DifferentNewsPapers/>
          <Footer />
        </div>
    },
    {
      path: '/news/indian-express',
      element:
        <div>
          <Navbar />
          <DifferentNewsPapers/>
          <Footer />
        </div>
    },
    {
      path: '/news/economic-times',
      element:
        <div>
          <Navbar />
          <DifferentNewsPapers/>
          <Footer />
        </div>
    },
    {
      path: '/news/the-hindu',
      element:
        <div>
          <Navbar />
          <DifferentNewsPapers/>
          <Footer />
        </div>
    },
    {
      path: '/news/hindustan-times',
      element:
        <div>
          <Navbar />
          <DifferentNewsPapers/>
          <Footer />
        </div>
    },
    {
      path: '/news/currentnews/:id',
      element:
        <div>
          <Navbar />
          <CurrentNewsPage/>
          <Footer />
        </div>
    },
    {
      path: '/news/:category/:id',
      element:
        <div>
          <Navbar />
          <NewsArticlePage />
          <Footer />
        </div>
    },
    {
      path: '/news/:newspaperName',
      element:
        <div>
          <Navbar />
         <DifferentNewspaperArticlePage/>
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
          <Footer />
        </div>
    },
    {
      path: '/articles/:id',
      element:
        <div>
          <Navbar />
          <ViewNotes/>
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
      path: '/profile',
      element:
        <div>
          <Navbar />
          <Profile />
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
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
}

export default App;
