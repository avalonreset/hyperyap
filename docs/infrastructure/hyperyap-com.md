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
- GitHub repository: `avalonreset/hyperyap`
- Railway project: `hyperyap-com`
- Railway project ID: `b377377b-002c-4537-af5f-f3f3024b4110`
- Railway environment: `production`
- Railway environment ID: `02bcbd37-47b5-4495-9e43-9fcd2bc26f05`
- Railway service: `hyperyap-site`
- Railway service ID: `585ad33d-03b6-49bc-993e-e51d89d3e31e`
- Railway service domain: `https://hyperyap-site-production.up.railway.app/`
- Railway deployment trigger: `avalonreset/hyperyap`, branch `codex/hyperyap-com`
- Cloudflare zone: `hyperyap.com`
- Cloudflare zone ID: `e6c37dee7e277e6be62833f3c5cd2480`
- Cloudflare nameservers assigned: `hazel.ns.cloudflare.com`, `kaiser.ns.cloudflare.com`
- Current Cloudflare zone status: `pending` until Namecheap delegates to Cloudflare

## Current Blocker

Namecheap API calls are blocked by the account's API client-IP whitelist. The
DNS records already exist in Cloudflare, but the registrar still uses Namecheap
default nameservers:

- `dns1.registrar-servers.com`
- `dns2.registrar-servers.com`

To finish delegation, update the Namecheap API whitelist for the current
outgoing IP and rerun `namecheap.domains.dns.setCustom`, or change the
nameservers manually in the Namecheap dashboard to:

- `hazel.ns.cloudflare.com`
- `kaiser.ns.cloudflare.com`

After that propagates, Cloudflare should activate the zone and Railway should
verify the custom-domain TXT records.

## Railway Domains

Railway custom domains are configured for:

| Domain | Traffic record | Verification host |
| --- | --- | --- |
| `hyperyap.com` | CNAME `hyperyap.com` -> `d9qs201m.up.railway.app` | TXT `_railway-verify.hyperyap.com` |
| `www.hyperyap.com` | CNAME `www.hyperyap.com` -> `qvv1bgf7.up.railway.app` | TXT `_railway-verify.www.hyperyap.com` |

Cloudflare records were created as DNS-only so Railway can validate ownership
and serve HTTPS directly.

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
