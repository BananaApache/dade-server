


const axios = require("axios");
const request = require("request");
const cors = require('cors')
const express = require("express");
const app = express();



app.use(cors())
app.get("/", (req, res) => {
	try {
		axios.get(`https://mdcpsportalapps2.dadeschools.net/PIVredirect/?ID=${req.query.id}`)
		.then(async response => {
			const StudentID = response.data.split("value=")[2].split(">")[0].slice(1, -1)

			var options = {
				'method': 'POST',
				'url': 'https://gradebook.dadeschools.net/Pinnacle/Gradebook/Link.aspx',
				'headers': {
				},
				form: {
					'action': 'trans',
					'StudentID': StudentID
				}
			};

			request(options, function (error, response) {

				const cookies = response.headers['set-cookie']
				.reverse()
				.map(a => a.split(';')[0])
				.join('; ')


				const options = {
					method: 'GET',
					url: "https://gradebook.dadeschools.net/Pinnacle/Gradebook/InternetViewer/GradeReport.aspx",
					headers: {
					'Cookie': cookies,
					'Pragma': 'no-cache',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.0.0 Safari/537.36'
					}
				}
				
				request(options, async (_, r, html) => {
					res.writeHead(200, { "Content-Type": "text/plain" });
					res.write(html);
					res.end();
				})
			})
		})
	}
	catch (e) {
		res.writeHead(400, { "Content-Type": "text/plain" });
		console.log(e)
	}
})


app.get("/course", (req, res) => {
	try {
		axios.get(`https://mdcpsportalapps2.dadeschools.net/PIVredirect/?ID=${req.query.id}`)
		.then(async response => {
			const StudentID = response.data.split("value=")[2].split(">")[0].slice(1, -1)

			var options = {
				'method': 'POST',
				'url': 'https://gradebook.dadeschools.net/Pinnacle/Gradebook/Link.aspx',
				'headers': {
				},
				form: {
					'action': 'trans',
					'StudentID': StudentID
				}
			};

			request(options, function (error, response) {

				const cookies = response.headers['set-cookie']
				.reverse()
				.map(a => a.split(';')[0])
				.join('; ')


				const options = {
					method: 'GET',
					url: `https://gradebook.dadeschools.net/Pinnacle/Gradebook/InternetViewer/${req.query.href}`,
					headers: {
					'Cookie': cookies,
					'Pragma': 'no-cache',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.0.0 Safari/537.36'
					}
				}
				
				request(options, async (_, r, html) => {
					res.writeHead(200, { "Content-Type": "text/plain" });
					res.write(html);
					res.end();
				})
			})
		})
	}
	catch {
		res.writeHead(400, { "Content-Type": "text/plain" });
		res.write("ERROR");
		res.end();
	}
})


// app.listen(8000)
// app.listen(8000, "127.0.0.1", function() {
// 	console.log("\nListening on: http://127.0.0.1:8000/\n")
// })

module.exports = app;

// If you want to support local development, you can add a conditional check
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


