import { establishReferralSession } from './establish-referral-session.js';

// These variables point at the staging environment and should not have to be changed.
const graphQLEndpoint = "https://api.staging.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sk_mnvJHs83KKlkjasdiFxxilak";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
