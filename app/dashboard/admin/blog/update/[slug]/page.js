"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";

export default function AdminBlogCreate({ params }) {
  //state
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getBlog();
  }, [params]);

  async function getBlog() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/blog/${params.slug}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      const data = await response.json();
      setId(data._id);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setImage(data.image);
    } catch (err) {
      console.log(err);
      NextResponse.json({ err: "" });
    }
  }

  //image upload to cloudinary
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      console.log(formData);

      //upload to cloudinary
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setLoading(false);
          const data = await response.json();
          console.log("image upload response =>", data);
          setImage(data.secure_url);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  //submit to create blog api
  const handleSubmit = async (e) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/blog/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, content, category, image }),
        }
      );

      if (response.ok) {
        router.push("/dashboard/admin");
        toast.success("Blog updated successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again.");
    }
  };

  const handleDelete = async (e) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, content, category, image }),
        }
      );

      if (response.ok) {
        // router.push("/dashboard/admin");
        window.location.href = "/dashboard/admin/blog/list";
        toast.success("Blog deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again.");
    }
  };

  //return jsx / blog create form
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead">Create Blog</p>
          <label className="text-secondary">Blog title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control p-2 my-2"
          />

          <label className="text-secondary">Blog content</label>
          <ReactQuill
            className="border rounded my-2"
            value={content}
            onChange={(e) => setContent(e)}
          />

          <label className="text-secondary">Blog category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control p-2 my-2"
          />

          {image && (
            <img src={image} alt="preview image" style={{ width: "100px" }} />
          )}

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-secondary">
              <label htmlFor="upload-button">
                {loading ? "Uploading..." : "Upload image"}
              </label>
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                onChange={uploadImage}
                hidden
              />
            </button>
            <button
              className="btn bg-primary text-light"
              disabled={loading}
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="btn bg-danger text-light"
              disabled={loading}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
