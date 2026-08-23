# Passport — Design direction

## Product surface

Passport is a personal credential ledger. It records title, issuer, year, state, and a local record code; it does not independently verify credentials.

## Visual world

A worn credential passport and archive desk: cream paper, burgundy ink, stamped gold, and a large editorial title. The ledger should feel kept and checkable, not like a generic profile dashboard.

## Direction seed

Impeccable operate direction seed was resolved for the credential product. The grounded interpretation is a passport archive with stamped status, searchable records, and a compact issue desk.

## System

- Palette: passport cream `#efe6d4`, burgundy `#813b3a`, gold `#b18845`, ink `#2b1d25`.
- Typography: Cormorant Garamond for credential names and IBM Plex Mono for record labels and controls.
- Composition: a seal-led hero, ruled ledger on the left, issue panel on the right; status is a stamped label, not a decorative badge cloud.
- Interaction: add, search, filter, mark verified/in progress, copy record, remove, and local persistence.
- Responsive: the issue panel follows the ledger and record controls wrap without horizontal scrolling.

## Honesty constraints

“Verified” means the owner's local record state only. No issuer API or external validation is represented.
