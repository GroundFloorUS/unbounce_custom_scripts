import { establishReferralSession } from './establish-referral-session.js';

// These variables should be updated to point at whatever lower environment you are testing.
// If you are using a PR environment, the token will look like this (given a Jira ID of GF-123):
// `const apiConsumerToken = "Token token=gf-123-secret";`
const graphQLEndpoint = "https://api.staging.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sk_mnvJHs83KKlkjasdiFxxilak";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
