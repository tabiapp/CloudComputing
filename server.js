const app = require("./app/app");

const PORT = process.env.PORT || 3002;

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});