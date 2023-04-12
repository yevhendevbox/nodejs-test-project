import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Method to compare users password with existed in DB
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
}
// Method to create new hashed password
export const hashPassword = (password) => bcrypt.hash(password, 5);

export const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id,
    username: user.name
  }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
}
