import api from "./client";

export const investmentApi = {
  // Get all public projects
  getAll: () => api.get("/investments"),

  // Get single project details
  getOne: (id) => api.get(`/investments/${id}`),

  // Invest in a project (Buy Slots)
  invest: (data) => api.post("/investments/invest", data),
};
