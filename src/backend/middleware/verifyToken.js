import admin from "../firebase.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Ejemplo típico: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6..."
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // guardamos el usuario en req para las rutas protegidas

    // ✅ Solo una vez
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      error: "Invalid token",
      details: error.message,
    });
  }
};
