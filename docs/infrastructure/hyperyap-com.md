# HyperYap.com Infrastructure

Last verified: 2026-06-19

## Purpose

`hyperyap.com` is the public website for HyperYap. The website should stay
separate from the Tauri desktop app surface and must preserve the project
privacy boundary:

- no analytics or telemetry by default
- no hosted transcription endpoint
- no open CORS examples
- no copy that implies uploaded audio processing

## Current Setup

- Registrar: Namecheap
- DNS authority target: Cloudflare
- Hosting target: Railway
- Website source path: `website/`
- Website branch: `codex/hyperyap-com`
- Cloudflare zone: `hyperyap.com`
- Cloudflare nameservers assigned: `hazel.ns.cloudflare.com`, `kaiser.ns.cloudflare.com`

## Provider API Notes

### Cloudflare

Use the Cloudflare v4 API with the bearer token already stored in the local
credential inventory. Do not print token values.

Common calls:

```text
GET /client/v4/user/tokens/verify
GET /client/v4/zones?name=hyperyap.com
POST /client/v4/zones
POST /client/v4/zones/{zone_id}/dns_records
```

For Railway domains, add the DNS records returned by Railway:

- apex domain usually needs Railway's CNAME flattening target
- `www` can point to the Railway target or redirect at Cloudflare
- Railway also returns a TXT verification record that must be present

### Namecheap

Use Namecheap's XML API from a whitelisted client IP. Required fields are:

- `ApiUser`
- `ApiKey`
- `UserName`
- `ClientIp`
- `Command`
- `SLD`
- `TLD`

To delegate the domain to Cloudflare:

```text
namecheap.domains.dns.setCustom
SLD=hyperyap
TLD=com
NameServers=hazel.ns.cloudflare.com,kaiser.ns.cloudflare.com
```

Do not switch Namecheap nameservers until Cloudflare has enough DNS records to
serve either the Railway site or an intentional temporary placeholder.

### Railway

The local Railway CLI session can expire. The Railway GraphQL API token in the
local credential inventory is the reliable path for API reads and mutations.

Useful GraphQL mutations:

- `projectCreate`
- `serviceCreate`
- `deploymentTriggerCreate`
- `serviceInstanceDeploy`
- `serviceDomainCreate`
- `customDomainCreate`
- `environmentPatchCommit`

The site is a static service with a deployment trigger root directory of
`website/`.

## Verification Checklist

Before declaring the domain live:

1. Railway deployment status is `SUCCESS`.
2. Railway-provided service domain returns the HyperYap homepage.
3. `hyperyap.com` and `www.hyperyap.com` records exist in Cloudflare.
4. Railway TXT verification record exists in Cloudflare.
5. Namecheap nameservers are set to Cloudflare.
6. `https://hyperyap.com/` returns `200`.
7. `http://hyperyap.com/` redirects to HTTPS.
8. `https://www.hyperyap.com/` redirects or resolves intentionally.
9. The live page contains no analytics, trackers, remote transcription endpoint,
   or unexpected third-party scripts.
