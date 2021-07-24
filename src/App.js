import './App.css';
import {Route, Switch, useHistory} from "react-router-dom";
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
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {

    const history = useHistory();
    const {loading: authLoading, token} = useSelector(state => state.auth);

    useEffect(() => {
        if(!authLoading && !token){
            history.push('/auth/login');
        }
    }, [authLoading, history, token]);

    return (
        <ScrollToTop>
            <Switch>
                <Route path="/" exact={true} component={DashboardPage}/>
                <Route path="/dumps" exact={true} component={DumpsPage}/>
                <Route path="/funds" exact={true} component={FundsPage}/>
                <Route path="/instructions" exact={true} component={InstructionsPage}/>
                <Route path="/logins" exact={true} component={LoginsPage}/>
                <Route path="/cheques" exact={true} component={ChequesPage}/>
                <Route path="/users" exact={true} component={UsersPage}/>
                <Route path="/orders" exact={true} component={OrdersPage}/>
                <Route path="/information" exact={true} component={InformationPage}/>
                <Route path="/banks" exact={true} component={BanksPage}/>
                <Route path="/profile" exact={true} component={ProfilePage}/>
                <Route path="/edit-profile" exact={true} component={EditProfilePage}/>
                <Route path="/auth/login" exact={true} component={LoginPage}/>
                <Route path="/auth/change-password" exact={true} component={ChangePasswordPage}/>
                <Route path="/auth/reset-password" exact={true} component={ResetPasswordPage}/>
                <Route path="/auth/forgot-password" exact={true} component={ForgotPasswordPage}/>
            </Switch>
        </ScrollToTop>
    );
}

export default App;
