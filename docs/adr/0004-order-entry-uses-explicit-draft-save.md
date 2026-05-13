# Order Entry Uses Explicit Draft Save

Order entry does not create a persistent Draft Order or Draft No. automatically while the admin is typing. The in-screen work can remain temporary until the user explicitly chooses `บันทึกร่าง` or `ออกและบันทึก`; this avoids empty or accidental drafts while still allowing real unfinished work to be saved and resumed from the `ร่างออเดอร์` tab.

## Considered Options

- Persist every autosave as the Draft Order.
- Keep a separate persistent autosave version beside the Draft Order.
- Keep in-screen edits temporary and persist a Draft Order only when the user explicitly saves.

## Consequences

Leaving an edited create/edit screen requires a warning only when there are unsaved changes. If the user exits without saving, the unsaved changes are discarded rather than leaving an autosave record behind.
