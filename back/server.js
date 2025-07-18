const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Permite solicitudes desde cualquier origen

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwQ9EPDTQ0JOpAzQmexP-bVI8e7PavRRNEXbEtmGJEI9hKBHHrPiPMmmEegnCc5Ct_mIA/exec');
    const data = await response.text(); // o .json() si el contenido es JSON
    res.send(data);
  } catch (error) {
    res.status(500).send('Error al obtener datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
