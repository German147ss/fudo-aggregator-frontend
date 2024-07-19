const express = require('express');
const path = require('path');

const app = express();
const PORT = 5500;

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
