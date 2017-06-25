const expect = require("chai").expect;
const facebookParser = require("../facebookParser");

describe('FacebookParser', function() {
  describe('Should get flat messages', function() {
    const facebookMessage = {
                            	"object": "page",
                            	"entry": [
                            		{
                            			"id": "1891974824383755",
                            			"time": 1498438130230,
                            			"messaging": [
                            				{
                            					"sender": {
                            						"id": "1368690066590024"
                            					},
                            					"recipient": {
                            						"id": "1891974824383755"
                            					},
                            					"timestamp": 1498438129664,
                            					"message": {
                            						"mid": "mid.$cAAa4vf-Sc5xjEySgAFc4d9YT5u4t",
                            						"seq": 33642,
                            						"text": "þetta eru skilaboð"
                            					}
                            				}
                            			]
                            		}
                            	]
                            }

    const messages = facebookParser.getFlatMessages(facebookMessage)

    expect(messages).to.not.be.null;
    expect(messages.length).to.equal(1);
    expect(messages[0].senderId).to.equal("1368690066590024")
    expect(messages[0].recipientId).to.equal("1891974824383755")
    expect(messages[0].text).to.equal("þetta eru skilaboð")
  })
})
