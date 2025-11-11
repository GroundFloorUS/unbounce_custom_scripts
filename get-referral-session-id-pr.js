const { establishReferralSession } = require('./establish-referral-session');
const graphQLEndpoint = "https://api.sc-1038.gandalf-struts.com/graphql_api/v1";
const apiConsumerToken = "Token token=sc-1038-secret";

establishReferralSession(graphQLEndpoint, apiConsumerToken);