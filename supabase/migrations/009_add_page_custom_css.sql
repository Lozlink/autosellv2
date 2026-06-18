-- Optional per-page Custom CSS. Rendered as a <style> tag on the page so the
-- marketing team / agency can style the structured sections via the stable
-- hooks the renderer emits (.cms-section, .cms-section--<type>,
-- .cms-section--<type>-<n>) or a section's own custom class — without needing
-- JavaScript or raw-HTML pastes. CSS only; no script execution.
alter table pages add column if not exists custom_css text;
