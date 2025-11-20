import { establishReferralSession } from './establish-referral-session.js';

// These variables should be updated to point at whatever lower environment you are testing.
const graphQLEndpoint = "https://api.sc-1101.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sc-1101-secret";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
