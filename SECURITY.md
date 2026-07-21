# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in OptiKit, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email: **mohitlakhara78500@gmail.com**

Include the following in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Fix & Release**: Depending on severity, typically within 7-14 days

### Scope

OptiKit is a utility library with **zero dependencies** and **no network calls**, which significantly limits its attack surface. However, we take all reports seriously.

## Security Practices

- ✅ **Zero external dependencies** — immune to supply-chain attacks
- ✅ **npm provenance** — every version is cryptographically linked to its CI build
- ✅ **Socket.dev verified** — continuously scanned for security issues
- ✅ **Automated CI/CD** — all releases go through GitHub Actions with tests
- ✅ **No eval/Function constructors** — no dynamic code execution
- ✅ **No network access** — no fetch, XMLHttpRequest, or WebSocket calls
