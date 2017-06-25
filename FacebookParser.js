module.exports = {
  getFlatMessages: function(facebookMessage) {
    if(facebookMessage.object !== "page") {
      return [];
    }
    const flatMessages = []
    for(var i = 0; i < facebookMessage.entry.length; i++) {
      const entry = facebookMessage.entry[i]
      for(var j= 0; j < entry.messaging.length; j++) {
        const message = entry.messaging[i]
        flatMessages.push(this.toFlatMessage(message))
      }
    }
    return flatMessages
  },
  toFlatMessage: function(message) {
    return {
     senderId: message.sender.id,
     recipientId: message.recipient.id,
     text: message.message.text
   }
  }
}
