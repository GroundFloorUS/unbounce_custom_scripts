import { establishReferralSession } from './establish-referral-session.js';

// These variables should be updated to point at whatever lower environment you are testing.
const graphQLEndpoint = "https://api.staging.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sk_mnvJHs83KKlkjasdiFxxilak";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
