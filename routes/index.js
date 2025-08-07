//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import authRoutes from './login_logout.js';
import userRoutes from './users.js';
import recipeRoutes from './recipes.js';

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  app.use('/login', authRoutes);
  app.use('/register', authRoutes);
  app.use('/logout', authRoutes);
  app.use('/users', userRoutes);
  app.use('/user/:id', userRoutes);
  app.use('/recipes', recipeRoutes);
  app.use('/:userID/recipe/:id', recipeRoutes);

  app.use('*', (req, res) => {
    return res.status(404).render("error", {errorMessage: 'Route Not found'});
  });
};

export default constructorMethod;