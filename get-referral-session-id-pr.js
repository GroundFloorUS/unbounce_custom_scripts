import { establishReferralSession } from './establish-referral-session.js';

// These variables should be updated to point at whatever lower environment you are testing.
const graphQLEndpoint = "https://api.sc-1100.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sc-sc-1100-secret";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
