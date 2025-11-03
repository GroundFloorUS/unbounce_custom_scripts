// These need to be updated depending on Environment
// ideally these variants would consume the main script and only change the first two variables
const graphQLEndpoint = "https://api.staging.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sk_mnvJHs83KKlkjasdiFxxilak";

const apiConsumerQuery = `mutation IssueApiConsumerJwt {
  issueApiConsumerJwt(input: {}) {
      jwt {
          jwt
          tokenType
      }
      errors {
          status
          detail
          code
      }
  }
}`;

const referralSessionQuery = `mutation EstablishReferralSession($input: EstablishReferralSessionInput!){
  establishReferralSession(input: $input)  {
    referralSessionId
    referrerName
  }
}`;

let queryString = window.location.search;
// example url "https://join.groundfloor.com/referral-test-staging/?code=v30ceb&af_xp=referral&pid=User_invite&use_deep_link=v30ceb"
let parsedString = queryString.split('code=')[1].split('&')[0];
console.log("parsed code", parsedString);
const variables = {
  input: {
    code: parsedString,
  },
};

fetch(graphQLEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: apiConsumerToken,
      },
      body: JSON.stringify({ query: apiConsumerQuery }),
})
.then((res) => res.json())
.then((result) => {
  const token = result.data.issueApiConsumerJwt.jwt.jwt;
  fetch(graphQLEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: referralSessionQuery, variables }),
  })
  .then((res) => res.json())
  .then((result) => { 
    console.log("result", result);
    const sessionId = result.data.establishReferralSession.referralSessionId
    console.log("sessionId", sessionId);
    document.getElementById('referral_session_id').value = sessionId;
  });
});