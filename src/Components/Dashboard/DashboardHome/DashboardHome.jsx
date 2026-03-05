import React, { useContext } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { motion } from "framer-motion";

function DashboardHome() {
  const { dashboardState } = useContext(DashboardContext);

  const stats = [
    {
      label: "Total Projects",
      value: dashboardState.projects.length,
      icon: "📋",
      color: "bg-blue-500",
    },
    {
      label: "Portfolio Items",
      value: dashboardState.portfolioItems.length,
      icon: "💼",
      color: "bg-green-500",
    },
    {
      label: "Total Likes",
      value: dashboardState.portfolioItems.reduce(
        (acc, item) => acc + item.likes,
        0,
      ),
      icon: "❤️",
      color: "bg-red-500",
    },
    {
      label: "Messages",
      value: dashboardState.messages.length,
      icon: "💬",
      color: "bg-purple-500",
    },
  ];

  const recentProjects = dashboardState.projects.slice(0, 3);
  const recentMessages = dashboardState.messages.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white text-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{project.title}</h3>
                  <span className="text-sm text-green-600 font-semibold">
                    {project.budget}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Posted by {project.postedBy} • {project.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Messages
          </h2>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${message.read ? "bg-gray-50" : "bg-green-50 border-l-4 border-green-500"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{message.from}</h3>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600">{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
