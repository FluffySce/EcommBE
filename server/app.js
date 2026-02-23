import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import User from "./models/userModel.js";
import path from "path";

const app = express();

// Session configuration
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });
      const isValid = await user.checkPassword(password);
      if (!isValid) return done(null, false, { message: "Invalid password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// serve static files from the 'public directory
app.use(express.static(path.join(path.resolve(), "..", "public")));
app.use(express.json());
app.use(cors());

//parsing form data
app.use(express.urlencoded({ extended: true }));

//seting up EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});

app.get("/", (req, res) => {
  res.send("Ecommerce server is running");
});

//auth routes
app.use("/auth", authRoutes);

//product related routes
app.use("/products", productRoutes);

//reviews related
app.use("/reviews", reviewRoutes);

export default app;
