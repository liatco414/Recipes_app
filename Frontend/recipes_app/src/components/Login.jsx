import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../Service/users";
import { successMsg } from "../Service/feedbackService";

function Login({ setIsLoggedIn }) {
    let nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email("Email must be a valid email").min(2),
            password: yup
                .string()
                .required()
                .min(7)
                .max(20)
                .matches(/[!@%$#^&*-_*]/),
        }),
        onSubmit: (values) => {
            loginUser(values).then((res) => {
                if (res) {
                    let userToken = res;
                    localStorage.setItem("token", userToken);
                    successMsg("User logged in succefully");
                    nav("/");
                    setIsLoggedIn(true);
                }
            });
        },
    });

    return (
        <>
            <div
                className="login-form"
                style={{
                    paddingTop: "90px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100vh",
                    gap: "60px",
                }}
            >
                <h1 style={{ fontSize: "3em", fontWeight: "900" }}>Log-in</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="form-floating mb-3" style={{ margin: "30px", width: "350px" }}>
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: "350px" }}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating" style={{ margin: "30px", width: "350px" }}>
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: "350px" }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>
                    <button style={{}} className="btn btn-dark" type="submit" disabled={!formik.dirty || !formik.isValid}>
                        login
                    </button>
                    <p>
                        Don't have an account? <Link to={"/register"}>Sign-Up</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
