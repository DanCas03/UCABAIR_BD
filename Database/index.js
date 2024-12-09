const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./Routes/userRoutes');

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});