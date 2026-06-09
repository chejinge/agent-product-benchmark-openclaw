const express = require('express');
const app = express();
app.use(express.json());

let items = [];
let nextId = 1;

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) {
    res.status(200).json({ item: null }); // BUG: should be 404
  } else {
    res.status(200).json({ item });
  }
});

app.post('/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(200).json({ item }); // BUG: should be 201
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
}

module.exports = app;