import { useRef, useState } from "react";
import { usePosts } from "../contexts/PostContext.jsx";
import { useNavigate } from "react-router-dom";
import '../css/UploadImg.css'

function UploadImg() {
    const fileInputRef = useRef(null);
    const { addPost } = usePosts();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
    }

    // Unified click handler to open file picker
    function openFilePicker() {
        fileInputRef.current?.click();
    }

    // Update state whenever a file is selected
    function handleFileSelect(e) {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    }

    async function handleSubmit() {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);

        try {
            const newPost = await addPost(formData);
            console.log("Uploaded and added to feed:", newPost);

            // Reset form
            setTitle("");
            setDescription("");
            setFile(null);

            navigate("/", { replace: true });
        } catch (err) {
            console.error("Upload failed:", err);
        }
    }

    return (
        <div className="upload-container">
            <div className="upload-form">
                <input
                    type="text"
                    className="upload-input"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="upload-textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                />

                {/* Hidden file input always present */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                />

                <div className="upload-section">
                    {!file ? (
                        <div className="upload-button" onMouseMove={handleMove} onClick={openFilePicker}>
                            <span className="upload-icon">📤</span>
                            <span className="upload-text">Select Image</span>
                            <svg className="border-svg" width="100%" height="100%">
                                <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="20" ry="20" />
                            </svg>
                        </div>
                    ) : (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(file)} alt="Preview" />
                            <button className="change-image-btn" onClick={openFilePicker}>
                                Change Image
                            </button>
                        </div>
                    )}
                </div>

                <button className="submit-upload" onClick={handleSubmit} disabled={!file || !title}>
                    Upload Post
                </button>
            </div>
        </div>
    );
}

export default UploadImg;