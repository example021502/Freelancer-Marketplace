import React, { createContext, useState, useEffect } from "react";

export const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [dashboardState, setDashboardState] = useState(() => {
    const saved = sessionStorage.getItem("dashboardState");
    return saved
      ? JSON.parse(saved)
      : {
          userProfile: {
            name: "John Doe",
            email: "john@example.com",
            skills: ["Web Development", "Design", "Marketing"],
            bio: "Experienced freelancer with 5+ years in web development and design.",
            avatar: "https://i.ibb.co/6n8p0tG/avatar.png",
            portfolio: [],
            projectsPosted: [],
          },
          projects: [
            {
              id: 1,
              title: "Web Developer Needed",
              description:
                "Looking for a skilled web developer to build a responsive e-commerce site.",
              budget: "$500-1000",
              skills: ["React", "Node.js", "MongoDB"],
              postedBy: "Client A",
              date: "2024-01-15",
            },
            {
              id: 2,
              title: "Logo Design Required",
              description:
                "Need a creative logo for my new startup in the tech industry.",
              budget: "$200-300",
              skills: ["Graphic Design", "Illustration"],
              postedBy: "Client B",
              date: "2024-01-14",
            },
          ],
          portfolioItems: [
            {
              id: 1,
              title: "E-commerce Website",
              description:
                "Complete e-commerce solution with React and Node.js",
              image: "https://i.ibb.co/6n8p0tG/avatar.png",
              likes: 24,
              comments: 8,
              date: "2024-01-10",
            },
            {
              id: 2,
              title: "Mobile App Design",
              description:
                "UI/UX design for fitness tracking mobile application",
              image: "https://i.ibb.co/6n8p0tG/avatar.png",
              likes: 15,
              comments: 3,
              date: "2024-01-05",
            },
          ],
          messages: [
            {
              id: 1,
              from: "Client A",
              message: "Hi, I'm interested in your web development services.",
              time: "2 hours ago",
              read: false,
            },
          ],
          notifications: [],
        };
  });

  useEffect(() => {
    sessionStorage.setItem("dashboardState", JSON.stringify(dashboardState));
  }, [dashboardState]);

  const addPortfolioItem = (item) => {
    setDashboardState((prev) => ({
      ...prev,
      portfolioItems: [
        ...prev.portfolioItems,
        { ...item, id: Date.now(), likes: 0, comments: 0 },
      ],
    }));
  };

  const addProject = (project) => {
    setDashboardState((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          ...project,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
        },
      ],
    }));
  };

  const toggleLike = (itemId) => {
    setDashboardState((prev) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item) =>
        item.id === itemId ? { ...item, likes: item.likes + 1 } : item,
      ),
    }));
  };

  const addComment = (itemId, comment) => {
    setDashboardState((prev) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item) =>
        item.id === itemId ? { ...item, comments: item.comments + 1 } : item,
      ),
    }));
  };

  const value = {
    dashboardState,
    setDashboardState,
    addPortfolioItem,
    addProject,
    toggleLike,
    addComment,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
