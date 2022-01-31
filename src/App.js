import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HomeStore from "./pages/HomeStore";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import StoreAdmin from "./pages/StoreAdmin";
import StoreProfile from "./pages/StoreProfile";
import Products from "./pages/Products";
import StoreList from "./pages/StoreList";
import StoreMenu from "./pages/StoreMenu";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store_home" element={<HomeStore />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/Restaurants" element={<StoreList />} />
        <Route path="/menu/Markets" element={<StoreList />} />
        <Route path="/menu/Candy%20shops" element={<StoreList />} />
        <Route path="/menu/orders" element={<StoreMenu />} />
        <Route path="/store_admin" element={<StoreAdmin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store_profile" element={<StoreProfile />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
