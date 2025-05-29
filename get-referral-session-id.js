const graphQLEndpoint = "https://api.groundfloor.us/graphql_api/v1";
const apiConsumerToken = "Token token=sk_vzQeHm4OVrvYqkRjzDPBoCDv";

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

const queryString = window.location.search;
const parsedString = queryString.split("=")[1];
const variables = {
  input: {
    code: parsedString,
  },
};

fetch(graphQLEndpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: apiConsumerToken,
  },
  body: JSON.stringify({ query: apiConsumerQuery }),
})
  .then((res) => res.json())
  .then((result) => {
    const token = result.data.issueApiConsumerJwt.jwt.jwt;
    fetch(graphQLEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: referralSessionQuery, variables }),
    })
      .then((res) => res.json())
      .then((result) => {
        const sessionId = result.data.establishReferralSession.referralSessionId;
        console.log("sessionId", sessionId);
        document.getElementById("referral_session_id").value = sessionId;
      });
  });
