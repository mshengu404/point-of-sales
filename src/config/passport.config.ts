import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Example User model (replace this with your actual user model logic)
const users = [{ id: 1, username: 'test', password: 'test' }];

// Configure local strategy for username and password authentication
passport.use(new LocalStrategy(
  (username: string, password: string, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

// Serialize user information into session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user information from session
passport.deserializeUser((id: number, done) => {
  const user = users.find(u => u.id === id);
  done(null, user ? user : false);
});

export { passport };
