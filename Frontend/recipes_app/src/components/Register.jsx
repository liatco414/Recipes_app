import { useFormik } from "formik";
import * as yup from "yup";
import "../css/form.css";
import { registerUser } from "../Service/users";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../Service/feedbackService";

function Register() {
    let nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: "",
            },
            phone: "",
            email: "",
            password: "",
            image: {
                url: "",
                alt: "",
            },
            isBlogger: false,
        },
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
                middle: yup.string(),
                last: yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
            }),
            phone: yup.string().max(10, "Phone number cannot be above 10 digits").required(),
            email: yup.string().email().required().min(2, "email must be at least 2 characters"),
            password: yup
                .string()
                .required("Password is required")
                .min(7)
                .max(20)
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/(?:.*\d){4,}/, "Password must contain at least 4 digits")
                .matches(/[!@%$#^&*-_*(]/, "Password must contain at least one of the special character: (!@%$#^&*-_*)"),
            image: yup.object({
                url: yup.string().min(14).url("Invalid URL format"),
                alt: yup.string().min(2, "Alt text must be at least 2 characters").max(256),
            }),
        }),
        onSubmit: async (values) => {
            try {
                await registerUser(values)
                    .then((response) => {
                        console.log(response);
                        successMsg("User registered successfully please login to confirm");
                        nav("/login");
                    })
                    .catch((error) => log.console(error));
            } catch (error) {
                console.log(error);
                errorMsg("couldn't create new user please try again", error.response?.data);
            }
        },
    });
    return (
        <>
            <div className="form">
                <div className="h1">Register</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row1">
                        <div className="form-floating mb-3">
                            <input type="text" name="name.first" className="form-control" id="first" placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="first">First Name</label>
                            {formik.errors.name?.first && formik.touched.name?.first && <p className="text-danger">{formik.errors.name?.first}</p>}
                        </div>
                        <div className="form-floating">
                            <input type="text" name="name.middle" className="form-control" id="middle" placeholder="Middle Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="middle">Middle Name</label>
                            {formik.errors.name?.middle && formik.touched.name?.middle && <p className="text-danger">{formik.errors.name?.middle}</p>}
                        </div>
                    </div>
                    <div className="rowname">
                        <div className="form-floating">
                            <input type="text" name="name.last" className="form-control" id="last" placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="last">Last Name</label>
                            {formik.errors.name?.last && formik.touched.name?.last && <p className="text-danger">{formik.errors.name?.last}</p>}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="form-floating">
                            <input type="email" name="email" className="form-control" id="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="email">Email</label>
                            {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                        </div>
                        <div className="form-floating">
                            <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="password">Password</label>
                            {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div className="rowphone">
                        <div className="form-floating">
                            <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="phone">Phone</label>
                            {formik.errors.phone && formik.touched.phone && <p className="text-danger">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className="row3">
                        <div className="form-floating">
                            <input type="text" name="image.url" className="form-control" id="url" placeholder="Image URL" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="url">Image URL</label>
                            {formik.errors.image?.url && formik.touched.image?.url && <p className="text-danger">{formik.errors.image?.url}</p>}
                        </div>
                        <div className="form-floating">
                            <input type="text" name="image.alt" className="form-control" id="alt" placeholder="Image alt" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="alt">Image alt</label>
                            {formik.errors.image?.alt && formik.touched.image?.alt && <p className="text-danger">{formik.errors.image?.alt}</p>}
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="isBlogger" checked={formik.values.isBlogger} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <span> Is this a blogger?</span>
                        </label>
                    </div>
                    <div className="submit">
                        <button className="btn btn-dark" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
