// These need to be updated depending on Environment
// ideally these variants would consume the main script and only change the first two variables
const graphQLEndpoint = "https://api.sc-1033.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sc-1033-secret";

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
let parsedString = queryString.split('=')[1];
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
    const sessionId = result.data.establishReferralSession.referralSessionId
    console.log("sessionId", sessionId);
    document.getElementById('referral_session_id').value = sessionId;
  });
});