# Operational Alerts Are Queue Status Events

In the starting workflow, notifications are in-app operational alerts shown through queues, badges/counts, status chips, inline warnings, toasts, and critical previews on the working screens. The system does not start with a separate notification inbox, read/unread state, dismiss controls, or notification history screen; the underlying work queue/status is the source of truth.

This keeps the first workflow focused on operational clarity while preserving clear module/event boundaries for future API, webhook, or external hook integrations.

## Considered Options

- Build a separate notification inbox with read/unread and dismiss state.
- Use ad hoc toast messages only.
- Treat queue/status/event signals as the notification system and keep events structured for future integrations.

## Consequences

Alerts resolve only when the related work action or status changes. Activity Log and Management Log remain the history layer instead of a notification history screen. Future external notifications should subscribe to named module events rather than scraping UI messages.
