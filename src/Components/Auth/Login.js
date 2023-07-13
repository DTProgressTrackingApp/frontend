import React from "react";
import './Login.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { login, logout, authHeader } from "../../Service/AuthService.js";

const Login = () => {
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        console.log("Login:" + values.email + " " + values.password);
        login(values.email, values.password)
            .then((response) => {
                console.log("Login RES: " + JSON.stringify(response))
                if (response.status == 200) {
                    if (response.data) {
                        localStorage.setItem("token", JSON.stringify(response.data.token));
                        if (response.data.user.role == "MANAGER") {
                            navigate("/manager/projects/dashboard", { state: response.data.user });
                        } else {
                            navigate("/member/projects/dashboard", { state: response.data.user });
                        }
                        window.location.reload();
                    }
                }
            }, (error) => {
                console.log("Login ERROR: " + JSON.stringify(error))
                if (error.response.status != 200) {
                    if (error.response.status == 400) {
                        // do something
                        console.log("error 400");
                        setError('email', {
                            type: 'server-400',
                            message: error.response.data.message
                        })
                    } else if (error.response.status == 403) {
                        // do something
                        console.log("error 403");
                        setError('email', {
                            type: 'server-403',
                            message: error.response.data.message
                        })
                    }
                }
            });
    }

    return (
        <div className="login-form">
            <form  onSubmit={handleSubmit(handleLogin)}>
                <h1>Login</h1>
                <div className="content">
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        {errors.email && errors.email.message}
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Required",
                                // pattern: {
                                //     value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                                //     message: "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
                                // }
                            })}
                        />
                        {errors.password && errors.password.message}
                    </div>
                    {/*<a href="#" className="link">Forgot Your Password?</a>*/}
                </div>
                <div className="action">
                    {/*<button>Register</button>*/}
                    <button type="submit">Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default Login;