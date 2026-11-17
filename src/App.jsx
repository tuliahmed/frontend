import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ConfigureRouter from "./pages/ConfigureRouter.jsx";
import RouterList from "./pages/RouterList.jsx";
import Transactions from "./pages/Transactions.jsx";
import Balance from "./pages/Balance.jsx";
import Profile from "./pages/Profile.jsx";
import Pricing from "./pages/Pricing.jsx";
import SupportTickets from "./pages/SupportTickets.jsx";
import TicketConversation from "./pages/TicketConversation.jsx";
import Documents from "./pages/Documents.jsx";
import Login from "./pages/Login.jsx";
import Createaccount from "./pages/Createaccount.jsx";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Auth_Check } from "./reduxstore/Actioncreator.jsx";
import Productdetail from "./pages/Productdetail.jsx";
import Prouctcomponent from "./pages/Prouctcomponent.jsx";
const mapDispatchToProps = (dispatch) => {
  return {
    Auth_Check: () => dispatch(Auth_Check()),
  };
};

function App(props) {
  const { Auth_Check } = props;
  useEffect(() => {
    Auth_Check();
  });
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Createaccount />} />
      <Route element={<AppLayout />}>
        <Route path="/product/:id" element={<Productdetail />} />
        <Route index element={<Dashboard type={"Handcrafts"} />} />
        <Route path="/power-tools" element={<Prouctcomponent type={'Power Tools'}/>} />
          <Route path="/hand-tools" element={<Prouctcomponent type={'Hand Tools'}/>} />


      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default connect(null,mapDispatchToProps)(App)
