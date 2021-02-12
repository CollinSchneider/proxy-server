const app = require('express')(),
      fetch = require('node-fetch');

app.get('/proxy', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let url = req.query.url;
  console.log(`proxying for ${url}`);
  try {
    let response = await fetch(url, { method: req.query.method, body: req.query.data });
    res.end(await response.text());
  } catch(e) {
    res.end(e.message)
  }
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
})