import { supabase } from "../supabaseClient.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No autorizado",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    req.user = user;

    next();

  } catch (err) {
    console.error(err);

    return res.status(401).json({
      error: "No autorizado",
    });
  }
};