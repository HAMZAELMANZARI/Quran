# Security Documentation

## Overview

This document outlines the security measures implemented in the Quran Sound application and provides guidelines for maintaining security.

## Security Features

### 1. Cross-Site Scripting (XSS) Prevention
- React's built-in JSX escaping is used for all user-facing content
- No `dangerouslySetInnerHTML`, `innerHTML`, or dynamic script injection
- All data from external APIs is properly escaped by React

### 2. Network Security
- All API calls use HTTPS
- Request timeouts (30 seconds) prevent hanging requests
- Response validation ensures data integrity
- Audio URLs are validated to use HTTPS protocol only
- Proper HTTP headers (`Accept: application/json`)

### 3. Data Storage
- Safe localStorage wrapper with error handling
- Handles private browsing, quota exceeded, and SSR scenarios
- Only non-sensitive data (theme preferences) is stored
- JSON parsing with try-catch blocks
- No sensitive information in localStorage

### 4. Error Handling
- React ErrorBoundary catches and handles component errors gracefully
- Detailed error information only shown in development mode
- User-friendly error messages in production
- Errors logged to console only in development

### 5. Security Headers
- **X-Content-Type-Options:** `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options:** `SAMEORIGIN` - Prevents clickjacking
- **Referrer-Policy:** `strict-origin-when-cross-origin` - Controls referrer information
- **Content-Security-Policy:** Restricts resource loading to trusted sources
- **Permissions-Policy:** Disables unnecessary browser features

### 6. Input Validation
- API responses are strictly validated
- Surah numbers validated (1-114)
- Data types checked
- Duplicate detection
- Required fields enforced

## Security Utilities

The application includes security utilities in `src/shared/utils/security.js`:

- `sanitizeErrorMessage()` - Sanitizes error messages for production
- `isSafeUrl()` - Validates URLs use HTTPS
- `fetchWithTimeout()` - Fetch with timeout protection
- `isSecureContext()` - Checks for secure context

## Best Practices

### For Development
1. Never commit secrets or API keys
2. Use environment variables for configuration
3. Keep dependencies updated
4. Run security audits regularly with `pnpm audit`
5. Test in both development and production modes

### For Deployment
1. Use HTTPS in production
2. Configure security headers at the server level
3. Keep the server and dependencies updated
4. Monitor for security vulnerabilities
5. Implement proper logging and monitoring

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by opening an issue on the project repository.

## Security Checklist

- [x] No XSS vulnerabilities
- [x] No hardcoded secrets
- [x] HTTPS enforced for external resources
- [x] Input validation implemented
- [x] Error handling secured
- [x] Security headers configured
- [x] Safe data storage
- [x] Request timeouts implemented
- [x] Type safety enabled
