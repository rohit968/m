import React, { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Home,
  Search,
  Movies,
  TVShows,
  MoreMovies,
  DetailPage,
  Watchlist,
  LikedPage,
  RegisterLoginPage,
  Footer,
  NotFound
} from './pages/index';
import Navbar from './components/navbar/Navbar';
import { UserContext, UserContextProvider } from './UserContext';

const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { pathname } = useLocation();

  axios.defaults.baseURL = 'http://localhost:4001';
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tvshows" element={<TVShows />} />
          <Route exact path='/moremovies/:pagename' element={<MoreMovies />} />
          <Route exact path='/detail/:id' element={<DetailPage />} />
          {!isLoggedIn && (
            <Route path="/registerlogin" element={<RegisterLoginPage pathname={pathname} />} />
          )}
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/likes" element={<LikedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
};

export default App;
