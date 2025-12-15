import { useRef } from "react";
import { usePosts } from "../contexts/PostContext.jsx";
import '../css/UploadImg.css'


function UploadImg() {
    const fileInputRef = useRef(null);
    const { addPost } = usePosts();

    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
    }

    function handleClick() {
        fileInputRef.current.click();
    }

    async function handleFileChange(e) {
        //The [0] is to only select the first of many selected. Only 1 file will be uploaded.
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const newPost = await addPost(formData);
            console.log("Uploaded and added to feed:", newPost);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="upload-button" onMouseMove={handleMove} onClick={handleClick}>
                <span>Upload</span>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <svg className="border-svg" width="100%" height="100%">
                    <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="20" ry="20" />
                </svg>
            </div>
        </>
    );
}

export default UploadImg;