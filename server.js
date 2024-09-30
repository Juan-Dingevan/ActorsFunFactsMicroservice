const API_KEY = "966413a8f4e6b95fbd1d9d8a7317a284";

// https://api.themoviedb.org/3/person/popular?api_key=966413a8f4e6b95fbd1d9d8a7317a284
// Endpoint que selecciona un actor random y dice "es conocido por..."
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/fun-fact', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`);
    const persons = response.data.results;

    //console.log(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
    //console.log(persons)

    if (persons && persons.length > 0) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      
      const knownFor = randomPerson.known_for[0].title;
      const name = randomPerson.name;
      const genderLetter = randomPerson.gender == 1 ? 'a' : 'o';

      let texto = name + " es conocid" + genderLetter + " por " + knownFor + "."

      if(!knownFor) {
        texto = name + " no es muy es conocid" + genderLetter + "."
      }

      res.json(texto);
    } else {
      res.status(404).json({ error: res.statusMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
