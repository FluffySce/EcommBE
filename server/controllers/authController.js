import User from "../models/userModel.js";
import passport from "passport";

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({
      username,
      password,
      role,
    });
    await user.save();
    req.flash("success", "Registration successful! Please login.");
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", "Error registering user: " + error.message);
    res.redirect("/auth/register");
  }
};

export const login = passport.authenticate("local", {
  successRedirect: "/products/view",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Error logging out");
      return res.redirect("/products/view");
    }
    req.flash("success", "Logged out successfully");
    res.redirect("/auth/login");
  });
};

export const renderLogin = (req, res) => {
  res.render("auth/login");
};

export const renderRegister = (req, res) => {
  res.render("auth/register");
};
