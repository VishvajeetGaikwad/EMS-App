// utils/roleCheck.js
const isAdmin = (user) => user.role === "admin";
const isEmployee = (user) => user.role === "employee";

module.exports = { isAdmin, isEmployee };
