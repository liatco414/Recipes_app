import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { commentRecipe, GetCommentsByRecipeId } from "../Service/recipes";
import { successMsg } from "../Service/feedbackService";
import { useNavigate } from "react-router-dom";

function Comments({ show, onHide, recipeId, categoryId }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const nav = useNavigate();

    // טעינת תגובות קיימות
    useEffect(() => {
        if (show && recipeId) {
            GetCommentsByRecipeId(recipeId)
                .then((data) => {
                    if (Array.isArray(data)) setComments(data);
                    else setComments([]);
                })
                .catch((err) => {
                    console.error("Failed to fetch comments:", err);
                });
        }
    }, [show, recipeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return alert("Please enter a comment");

        try {
            const response = await commentRecipe(recipeId, comment);
            if (response) {
                successMsg("Comment submitted successfully!");
                setComment("");
                onHide();
                nav(`/recipes/${categoryId}/${recipeId}`);
            }
        } catch (err) {
            console.error("Failed to submit comment:", err);
            alert("Something went wrong while submitting your comment.");
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Review</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="commentTextArea">
                        <Form.Label>Your comment</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write your comment here..." value={comment} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

                {/* הצגת תגובות קיימות */}
                <hr />
                <h5>Previous Comments</h5>
                {comments.length === 0 && <p>No comments yet.</p>}
                {comments.map((c) => (
                    <div key={c._id} className="mb-2">
                        <strong>{c.username}</strong>: {c.comment}
                        <br />
                        <small className="text-muted">{new Date(c.date).toLocaleString()}</small>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default Comments;
