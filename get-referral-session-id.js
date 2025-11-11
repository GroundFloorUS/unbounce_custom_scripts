import { establishReferralSession } from './establish-referral-session.js';

// These variables point at the live/production environment and should not have to be changed.
const graphQLEndpoint = "https://api.groundfloor.us/graphql_api/v1";
const apiConsumerToken = "Token token=sk_vzQeHm4OVrvYqkRjzDPBoCDv";

establishReferralSession(graphQLEndpoint, apiConsumerToken);
