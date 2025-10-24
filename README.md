# Unbounce Scripts

Unbounce requires snippets of plain javascript (wrapped in a `<script>`) to pass tracking parameters when linking to IWA.

These snippets are called from Unbounce via `src` property of script tag.

`join.groundfloor.com` needs to be added to `CORS_ALLOWLIST` for referral script to work on respective envs.

to test or modify in a PR env, input field in "Josh Referral Test PR" needs to be updated with env info via Unbounce.

"Josh Referral Test Staging" should automatically point to `staging` env.

## example

```javascript
<script src="https://groundfloorus.github.io/unbounce_custom_scripts/get-referral-session-id.js">
</script>
```
