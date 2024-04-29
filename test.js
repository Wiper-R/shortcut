const axios = require("axios")

axios.get("http://localhost:3000/api").then(d => console.log(d)).catch(r => console.log(r.response.statusText))