import {ApiService} from "../../service/api";
import {AuthForm} from "../../components/AuthForm/AuthForm";

export const RegisterPage = () => <AuthForm
    apiMethod={ApiService.signUp}
    buttonText="Sign Up"
    title="Register"
    linkText="Already have an account?"
    linkTo="/signin"
/>;

