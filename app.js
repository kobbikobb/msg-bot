const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const facebookParser = require('facebookParser')

app.use(bodyParser.json())

app.get('/', function (req, res) {
  const hubMode = req.query["hub.mode"]
  const hubChallenge = req.query["hub.challenge"]
  const hubVerifyToken = req.query["hub.verify_token"]
  const serverVerifyToken = process.env.VERIFY_TOKEN

  if(hubMode === "subscribe" && hubChallenge) {
    if(hubVerifyToken !== serverVerifyToken) {
      res.status(403)
      res.send("Verification token mismatch")
    } else {
      res.send(hubChallenge)
    }
  } else {
    res.status(200)
    res.send("Welcome to the bot, it can do anything!")
  }
})

app.post('/', function(req, res) {
  const flatMessages = facebookParser.getFlatMessages(req.body)
  for(var i = 0; i < flatMessages.length; i++) {
    processMessage(flatMessages[i])
  }
  res.send("Request processed!")
})


function processMessage(message) {

  console.log("SenderId: " + message.senderId)
  console.log("RecipientId: " + message.recipientId)
  console.log("Text: " + message.text)

  sendMessage(senderId, "ecco: " + message.text)
}

function sendMessage(recipientId, text) {

  const params = "access_token=" + process.env.PAGE_ACCESS_TOKEN

  request.post({
       url: "https://graph.facebook.com/v2.6/me/messages?" + params,
       headers: {
          "Content-Type": "application/json"
       },
       body: {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": text
        }
    },
       json:true
  }, function(error, response, body){
     console.log("send msg error")
     console.log(error)
  })
}

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port:' + port)
})
