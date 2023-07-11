import React from "react";
import './Login.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { login, logout, authHeader } from "../../Service/AuthService.js";

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        console.log("Login:" + values.email + " " + values.password);
        // const response = login(values.email, values.password)
        navigate("/manager/view");
        window.location.reload();
            // .then((data) => {
            //     console.log("Data login: " + data);
            //     if (data) {
            //         if (data.role == "MANAGER") {
            //             navigate("/manager/dashboard");
            //             window.location.reload();
            //         }
            //     }
            // }, (error) => {
            //
            // });
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
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                                    message: "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
                                }
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