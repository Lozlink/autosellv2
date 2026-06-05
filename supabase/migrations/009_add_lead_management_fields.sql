-- Add lead management fields to leads and inquiries.
-- contacted_at doubles as the "contacted" flag (NULL = not yet contacted)
-- and the timestamp of when contact was made.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS notes_updated_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS notes_updated_at TIMESTAMP WITH TIME ZONE;

-- Support filtering by contacted/new status in the admin dashboard.
CREATE INDEX IF NOT EXISTS idx_leads_contacted_at ON leads(contacted_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_contacted_at ON inquiries(contacted_at);
