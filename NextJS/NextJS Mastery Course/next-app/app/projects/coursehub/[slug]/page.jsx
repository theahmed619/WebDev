"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { FaClock, FaLayerGroup, FaArrowLeft } from "react-icons/fa";

import { courseDetails } from "../data";

const page = ({ params }) => {
  const { slug } = React.use(params);

  const router = useRouter();

  // Find course based on slug
  const course = courseDetails.find((course) =>
    course.title.toLowerCase().includes(slug.toLowerCase())
  );

  console.log("getting course based on slug = ", course);

  return (
    <div>
      <div
        className="container-fluid min-vh-100 d-flex justify-content-center align-items-center text-center"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "#f8fafc",
          padding: "50px",
        }}
      >
        <div
          className="card p-4"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
            maxWidth: "630px",
            width: "100%",
          }}
        >
          <div className="card-body text-center">
            <h1 className="text-warning">{course.title}</h1>
            <span className="badge bg-gradient bg-primary px-3 py-2">
              <FaClock /> {course.duration}
            </span>
            <span className="badge mx-3 bg-gradient bg-success px-3 py-2">
              <FaLayerGroup /> {course.level}
            </span>
          </div>

          <h3 className="mt-4 text-light">Projects You Can Build:</h3>
          <ul className="list-group mt-3">
            {course.projects.map((project) => (
              <li
                key={project.id}
                className="list-group-item border-0 text-light"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transition: "all 0.3 ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)")
                }
              >
                {project.title}
              </li>
            ))}
          </ul>
          <div className="d-grid col-sm-6 mx-auto">
            <button className="btn btn-outline-warning mt-4 shadow-sm"
            onClick={()=>router.push("/projects/coursehub")}>
              <FaArrowLeft /> Back To Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;