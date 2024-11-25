import {ApiService} from "../../service/api";
import {AuthForm} from "../../components/AuthForm/AuthForm";

export const LoginPage = () =>  <AuthForm
    apiMethod={ApiService.signIn}
    buttonText="Sign In"
    title="Login"
    linkText="Don't have an account?"
    linkTo="/signup"
    linkChat ="/"
/>;

