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

function handleReferralSessionError(errorCode = null) {
  let errorMessage = "Something went wrong, please refresh the page and try again.";

  // Most of these are unlikely in the context of Unbounce, if not impossible, just being
  // safe and accommodating any possible error code that is not a generic server error.
  switch (errorCode) {
    case "RESOURCE_NOT_FOUND":
      errorMessage = "The referral code you entered is invalid. Please check and try again.";
      break;
    case "UNAUTHORIZED_CLIENT":
      errorMessage = "Your session has expired. Please refresh the page and try again.";
      break;
    case "USER_ALREADY_REFERRED":
      errorMessage = "You have already used a referral code. Please use a different code.";
      break;
    case "USED_OWN_REFERRAL_CODE":
      errorMessage = "You cannot use your own referral code. Please use a different code.";
      break;
    case "USER_REGISTRATION_DATE_PAST_REFERRAL_WINDOW":
      errorMessage = "The referral code you entered has expired. Please contact support for assistance.";
      break;
    case "REFERRING_USER_NOT_FOUND":
      errorMessage = "The user associated with this referral code could not be found. Please check the code and try again.";
      break;
    case "REQUIRED_CONDITIONS_MISSING":
      errorMessage = "You do not meet the requirements to use this referral code. Please check the terms and conditions.";
      break;
    case "VALIDATIONS_FAILED":
      errorMessage = "There was an error with your referral code. Please check and try again.";
      break;
    default:
      break;
  };

  alert(errorMessage);
};

export function establishReferralSession(graphQLEndpoint, apiConsumerToken) {
  // Example URL:
  // "https://join.groundfloor.com/referral-test-pr/?code=m7ff29&af_xp=referral&pid=User_invite&use_deep_link=m7ff29"
  let queryString = window.location.search;
  let parsedString = queryString.split('code=')[1].split('&')[0];

  const variables = {
    input: {
      code: parsedString,
    },
  };

  fetch(graphQLEndpoint, {
        method: 'POST',
        body: JSON.stringify({ query: apiConsumerQuery }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: apiConsumerToken,
        },
  })
  .then((res) => res.json())
  .catch(() => handleReferralSessionError())
  .then((result) => {
    const error = result.data.issueApiConsumerJwt.errors[0];

    if (error) {
      handleReferralSessionError(error.code);
      return;
    };

    const token = result.data.issueApiConsumerJwt.jwt.jwt;

    fetch(graphQLEndpoint, {
      method: 'POST',
      body: JSON.stringify({ query: referralSessionQuery, variables }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
    .catch(() => handleReferralSessionError())
    .then((result) => { 
      const error = result.data.establishReferralSession.errors[0];

      if (error) {
        handleReferralSessionError(error.code);
        return;
      };

      const sessionId = result.data.establishReferralSession.referralSessionId

      document.getElementById('referral_session_id').value = sessionId;
    });
  });
};
