import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import PageList from "./screens/PageList";
import Store from "./screens/Store";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
        <Route
          exact
          path="/upload-variants"
          element={
            <Page>
              <UploadVariants />
            </Page>
          }
        />
        <Route
          exact
          path="/upload-details"
          element={
            <Page>
              <UploadDetails />
            </Page>
          }
        />
        <Route
          exact
          path="/connect-wallet"
          element={
            <Page>
              <ConnectWallet />
            </Page>
          }
        />
        <Route
          exact
          path="/faq"
          element={
            <Page>
              <Faq />
            </Page>
          }
        />
        <Route
          exact
          path="/activity"
          element={
            <Page>
              <Activity />
            </Page>
          }
        />
        <Route
          exact
          path="/gallery"
          element={
            <Page>
              <Search01 />
            </Page>
          }
        />
        <Route
          exact
          path="/store"
          element={
            <Page>
              <Store />
            </Page>
          }
        />
        <Route
          exact
          path="/search02"
          element={
            <Page>
              <Search02 />
            </Page>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Page>
              <Profile />
            </Page>
          }
        />
        <Route
          exact
          path="/profile-edit"
          element={
            <Page>
              <ProfileEdit />
            </Page>
          }
        />
        <Route
          exact
          path="/item"
          element={
            <Page>
              <Item />
            </Page>
          }
        />
        <Route
          exact
          path="/pagelist"
          element={
            <Page>
              <PageList />
            </Page>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
