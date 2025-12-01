# Supabase Database Migration Guide

## ⚠️ IMPORTANT - Read First

**DO NOT run this migration yet if:**
- You have not tested the updated RequestForm locally
- You want to keep existing data (this migration is irreversible)

**Backup First:**
```sql
-- Create a backup of your cards table
CREATE TABLE cards_backup AS SELECT * FROM cards;
```

---

## Migration Steps

### Step 1: Add New Array Columns

```sql
ALTER TABLE cards
ADD COLUMN emails text[] DEFAULT '{}',
ADD COLUMN phones text[] DEFAULT '{}';
```

### Step 2: Migrate Existing Data

```sql
-- Convert single email/phone to arrays
UPDATE cards
SET 
  emails = CASE 
    WHEN email IS NOT NULL AND email != '' THEN ARRAY[email]
    ELSE '{}'
  END,
  phones = CASE 
    WHEN phone IS NOT NULL AND phone != '' THEN ARRAY[phone]
    ELSE '{}'
  END
WHERE emails = '{}' OR phones = '{}';
```

### Step 3: Verify Data Migration

```sql
-- Check that data was migrated correctly
SELECT 
  id,
  full_name,
  email as old_email,
  emails as new_emails,
  phone as old_phone,
  phones as new_phones
FROM cards
LIMIT 10;
```

**✅ Verify:** Each row should have the old email in new_emails array and old phone in new_phones array.

### Step 4: Remove Old Columns

```sql
-- Only run this after verifying Step 3!
ALTER TABLE cards
DROP COLUMN email,
DROP COLUMN phone;
```

### Step 5: Add Constraint

```sql
-- Ensure at least one email is always present
ALTER TABLE cards
ADD CONSTRAINT emails_not_empty CHECK (array_length(emails, 1) >= 1);
```

### Step 6: Update RLS Policies (if needed)

Check if any of your RLS policies reference the old `email` or `phone` columns:

```sql
-- View all policies for cards table
SELECT * FROM pg_policies WHERE tablename = 'cards';
```

If any policies reference `email` or `phone`, update them to use `emails` and `phones`.

---

## Rollback (Only Possible Before Step 4)

If you need to rollback BEFORE removing the old columns:

```sql
-- Clear the new columns
UPDATE cards SET emails = '{}', phones = '{}';

-- Drop the new columns
ALTER TABLE cards
DROP COLUMN emails,
DROP COLUMN phones;
```

**After Step 4, rollback requires restoring from your backup.**

---

## Verification Checklist

After migration, verify:

- [ ] All existing cards have their email in the `emails` array
- [ ] All existing cards with phone numbers have them in the `phones` array
- [ ] New cards created via RequestForm save correctly
- [ ] Card display shows all emails and phones with clickable links
- [ ] vCard download includes all contact information
- [ ] No TypeScript errors in the codebase

---

## What to Run in Supabase SQL Editor

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste **each step one at a time**
3. Review the output after each step
4. **DO NOT** proceed to the next step if you see errors

**Order:**
1. Step 1 (Add columns)
2. Step 2 (Migrate data)
3. Step 3 (Verify - just a SELECT query)
4. **WAIT** - Check Step 3 results manually
5. Step 4 (Drop old columns - irreversible!)
6. Step 5 (Add constraint)
7. Step 6 (Check/update policies if needed)
