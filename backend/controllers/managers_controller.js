const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {
  loginManager: async (req, res) => {
    // TODO: Handle manager login
  },
  getManagerById: async (req, res) => {
    // TODO: Retrieve manager by their ID
  },
  updateManagerById: async (req, res) => {
    // TODO: Update manager details
  },
  deleteManagerById: async (req, res) => {
    // TODO: Delete manager
  },
  changeManagerPassword: async (req, res) => {
    // TODO: Change manager password
  },
};
