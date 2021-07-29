import './App.css';
import {Route, Switch} from "react-router-dom";
import DashboardPage from "./pages/dashboard/dashboard-page";
import InformationPage from "./pages/information/information-page";
import BanksPage from "./pages/banks/banks-page";
import DumpsPage from "./pages/dumps/dumps-page";
import FundsPage from "./pages/funds/funds-page";
import InstructionsPage from "./pages/instructions/instructions-page";
import LoginsPage from "./pages/logins/logins-page";
import UsersPage from "./pages/users/users-page";
import OrdersPage from "./pages/orders/orders-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import ResetPasswordPage from "./pages/authentication/reset-password-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";
import LoginPage from "./pages/authentication/login-page";
import EditProfilePage from "./pages/profile/edit-profile-page";
import ProfilePage from "./pages/profile/profile-page";
import ScrollToTop from "./components/shared/scroll-top-top";
import ChequesPage from "./pages/cheques/cheques-page";
import ProtectedRoute from "./components/shared/protected-route";

function App() {

    return (
        <ScrollToTop>
            <Switch>
                <ProtectedRoute path="/" exact={true} component={DashboardPage}/>
                <ProtectedRoute path="/dumps" exact={true} component={DumpsPage}/>
                <ProtectedRoute path="/funds" exact={true} component={FundsPage}/>
                <ProtectedRoute path="/instructions" exact={true} component={InstructionsPage}/>
                <ProtectedRoute path="/logins" exact={true} component={LoginsPage}/>
                <ProtectedRoute path="/cheques" exact={true} component={ChequesPage}/>
                <ProtectedRoute path="/users" exact={true} component={UsersPage}/>
                <ProtectedRoute path="/orders" exact={true} component={OrdersPage}/>
                <ProtectedRoute path="/information" exact={true} component={InformationPage}/>
                <ProtectedRoute path="/banks" exact={true} component={BanksPage}/>
                <ProtectedRoute path="/profile" exact={true} component={ProfilePage}/>
                <ProtectedRoute path="/edit-profile" exact={true} component={EditProfilePage}/>
                <Route path="/auth/login" exact={true} component={LoginPage}/>
                <ProtectedRoute path="/auth/change-password" exact={true} component={ChangePasswordPage}/>
                <Route path="/auth/reset-password" exact={true} component={ResetPasswordPage}/>
                <Route path="/auth/forgot-password" exact={true} component={ForgotPasswordPage}/>
            </Switch>
        </ScrollToTop>
    );
}

export default App;
