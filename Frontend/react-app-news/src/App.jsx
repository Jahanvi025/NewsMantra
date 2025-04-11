import React from "react";
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
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  // Create a layout component to avoid repetition
  const MainLayout = ({ children }) => (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
          <CurrentAffairs />
        </MainLayout>
      )
    },
    {
      path: '/news',
      element: (
        <MainLayout>
          <AllNews />
        </MainLayout>
      )
    },
    {
      path: '/news/times-of-india',
      element: (
        <MainLayout>
          <DifferentNewsPapers />
        </MainLayout>
      )
    },
    {
      path: '/news/indian-express',
      element: (
        <MainLayout>
          <DifferentNewsPapers />
        </MainLayout>
      )
    },
    {
      path: '/news/economic-times',
      element: (
        <MainLayout>
          <DifferentNewsPapers />
        </MainLayout>
      )
    },
    {
      path: '/news/the-hindu',
      element: (
        <MainLayout>
          <DifferentNewsPapers />
        </MainLayout>
      )
    },
    {
      path: '/news/hindustan-times',
      element: (
        <MainLayout>
          <DifferentNewsPapers />
        </MainLayout>
      )
    },
    {
      path: '/news/currentnews/:id',
      element: (
        <MainLayout>
          <CurrentNewsPage />
        </MainLayout>
      )
    },
    {
      path: '/news/:category/:id',
      element: (
        <MainLayout>
          <NewsArticlePage />
        </MainLayout>
      )
    },
    {
      path: '/news/:newspaperName',
      element: (
        <MainLayout>
          <DifferentNewspaperArticlePage />
        </MainLayout>
      )
    },
    {
      path: '/famous-stories',
      element: (
        <MainLayout>
          <FamousNews />
        </MainLayout>
      )
    },
    {
      path: '/articles',
      element: (
        <MainLayout>
          <CreateAndUpdateNote />
        </MainLayout>
      )
    },
    {
      path: '/articles/:id',
      element: (
        <MainLayout>
          <ViewNotes />
        </MainLayout>
      )
    },
    {
      path: '/about',
      element: (
        <MainLayout>
          <About />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: '/register',
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      )
    },
    {
      path: '/profile',
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      )
    },
    {
      path: '/contact',
      element: (
        <MainLayout>
          <ContactUS />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (

    <div>
      <GoogleOAuthProvider clientId="815700070300-p0mgu0u2q2dshg4t59cci926c9bj8ssr.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <NeonCursor />
      <Toaster position="top-right" reverseOrder={false} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
