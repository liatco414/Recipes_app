import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { getAllCategories } from "../Service/categories";
import "bootstrap/dist/css/bootstrap.min.css";
import { addRecipe } from "../Service/recipes";
import { useNavigate } from "react-router-dom";
import { successMsg } from "../Service/feedbackService";

function PostRecipe() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            recipeContent: {
                ingredients: "",
                instructions: "",
            },
            image: {
                url: "",
                alt: "",
            },
            title: "",
            subtitle: "",
            category: [],
        },
        validationSchema: yup.object({
            recipeContent: yup.object({
                ingredients: yup.string().min(3, "Ingredients must contain at least three characters").required("Ingredients are required"),
                instructions: yup.string().min(5, "Instructions must contain a valid text of at least 5 characters").required("Instructions are required"),
            }),
            image: yup.object({
                url: yup.string().matches(/^https?:\/\/.+\..+/, "Enter a valid URL"),
                alt: yup.string().min(3, "Alt text must be at least 3 characters"),
            }),
            title: yup.string().min(2, "Title must contain at least 2 characters").required("Title is required"),
            subtitle: yup.string().min(2, "Subtitle must contain at least two characters"),
            category: yup.array().min(1, "Please select at least one category").of(yup.string()).required("At least one category is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await addRecipe(values);
                if (response) {
                    successMsg("Recipe added successfully");
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="form container mt-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="title">Title</label>
                    {formik.touched.title && formik.errors.title && <div className="invalid-feedback">{formik.errors.title}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.subtitle && formik.errors.subtitle ? "is-invalid" : ""}`}
                        id="subtitle"
                        name="subtitle"
                        placeholder="Subtitle"
                        value={formik.values.subtitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="subtitle">Subtitle</label>
                    {formik.touched.subtitle && formik.errors.subtitle && <div className="invalid-feedback">{formik.errors.subtitle}</div>}
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        className={`form-control ${formik.touched.recipeContent?.ingredients && formik.errors.recipeContent?.ingredients ? "is-invalid" : ""}`}
                        id="recipeContent.ingredients"
                        name="recipeContent.ingredients"
                        placeholder="Ingredients"
                        style={{ height: "100px" }}
                        value={formik.values.recipeContent.ingredients}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="recipeContent.ingredients">Ingredients</label>
                    {formik.touched.recipeContent?.ingredients && formik.errors.recipeContent?.ingredients && <div className="invalid-feedback">{formik.errors.recipeContent.ingredients}</div>}
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        className={`form-control ${formik.touched.recipeContent?.instructions && formik.errors.recipeContent?.instructions ? "is-invalid" : ""}`}
                        id="recipeContent.instructions"
                        name="recipeContent.instructions"
                        placeholder="Instructions"
                        style={{ height: "120px" }}
                        value={formik.values.recipeContent.instructions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="recipeContent.instructions">Instructions</label>
                    {formik.touched.recipeContent?.instructions && formik.errors.recipeContent?.instructions && <div className="invalid-feedback">{formik.errors.recipeContent.instructions}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.image?.url && formik.errors.image?.url ? "is-invalid" : ""}`}
                        id="image.url"
                        name="image.url"
                        placeholder="Image URL"
                        value={formik.values.image.url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="image.url">Image URL</label>
                    {formik.touched.image?.url && formik.errors.image?.url && <div className="invalid-feedback">{formik.errors.image.url}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.image?.alt && formik.errors.image?.alt ? "is-invalid" : ""}`}
                        id="image.alt"
                        name="image.alt"
                        placeholder="Alt Text"
                        value={formik.values.image.alt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="image.alt">Alt Text</label>
                    {formik.touched.image?.alt && formik.errors.image?.alt && <div className="invalid-feedback">{formik.errors.image.alt}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Select Categories:</label>
                    <div className="d-flex flex-wrap gap-2 flex-row">
                        {categories.map((cat) => {
                            const catId = cat._id;
                            const isSelected = formik.values.category.includes(catId);

                            return (
                                <button
                                    type="button"
                                    key={catId}
                                    className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-outline-secondary"}`}
                                    onClick={() => {
                                        const selected = formik.values.category;
                                        if (isSelected) {
                                            formik.setFieldValue(
                                                "category",
                                                selected.filter((id) => id !== catId)
                                            );
                                        } else {
                                            formik.setFieldValue("category", [...selected, catId]);
                                        }
                                    }}
                                >
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                    {formik.touched.category && formik.errors.category && <div className="text-danger mt-2">{formik.errors.category}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Selected Categories:</label>
                    <div className="border p-2 rounded" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {formik.values.category.length > 0 ? (
                            formik.values.category.map((id) => {
                                const cat = categories.find((c) => c._id === id);
                                return (
                                    <span key={id} className="badge bg-secondary me-2 d-flex align-items-center">
                                        {cat?.name}
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white btn-sm ms-2"
                                            aria-label="Remove"
                                            onClick={() =>
                                                formik.setFieldValue(
                                                    "category",
                                                    formik.values.category.filter((catId) => catId !== id)
                                                )
                                            }
                                            style={{ fontSize: "0.4rem" }}
                                        ></button>
                                    </span>
                                );
                            })
                        ) : (
                            <span className="text-muted">No categories selected</span>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-success">
                    Submit Recipe
                </button>
            </form>
        </div>
    );
}

export default PostRecipe;
