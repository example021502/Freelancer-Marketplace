import React, { useContext, useState } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { motion } from "framer-motion";

function ProjectsSection() {
  const { dashboardState, addProject } = useContext(DashboardContext);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    skills: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProject.title && newProject.description && newProject.budget) {
      addProject({
        ...newProject,
        skills: newProject.skills.split(",").map((skill) => skill.trim()),
      });
      setNewProject({ title: "", description: "", budget: "", skills: "" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Post New Project */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Post New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Web Developer Needed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                type="text"
                value={newProject.budget}
                onChange={(e) =>
                  setNewProject({ ...newProject, budget: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., $500-1000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <input
              type="text"
              value={newProject.skills}
              onChange={(e) =>
                setNewProject({ ...newProject, skills: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe what you need help with..."
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Post Project
          </button>
        </form>
      </div>

      {/* Browse Projects */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Browse Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardState.projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">
                    {project.budget}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted by {project.postedBy}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{project.date}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
