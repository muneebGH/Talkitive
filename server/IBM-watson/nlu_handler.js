const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2019-07-12",
  authenticator: new IamAuthenticator({
    apikey: String.raw`sqBYFdAkOYsX352f-mt5qVe7MRznOXHxsD7VL85EUDxf`
  }),
  url: String.raw`api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/51a73222-602a-4bb3-be15-265020b5ac9f`
});

const analyzeParams = {
  url: "www.ibm.com",
  features: {
    categories: {
      limit: 3
    }
  }
};

function analyze() {
  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then(analysisResults => {
      return JSON.stringify(analysisResults, null, 2);
    })
    .catch(err => {
      console.log("error:", err);
    });
}

module.exports = {
  anaylze: analyze
};
