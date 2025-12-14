import api from "./client";

export const investmentApi = {
  // Get all public projects
  getAll: () => api.get("/investments/projects"),

  // Get single project
  getById: (id) => api.get(`/investments/projects/${id}`),

  // ✅ ADD THIS: Get User Portfolio
  getPortfolio: () => api.get("/investments/portfolio"), // Check routes/investments.js to confirm path matches

  // Invest
  initialize: (data) => api.post("/investments/initialize", data),
  verify: (data) => api.post("/investments/verify", data),
};
