
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    console.log('Checking if website_inquiries table exists...');
    const { data, error } = await supabase
        .from('website_inquiries')
        .select('count')
        .limit(1);

    if (error) {
        console.error('Error accessing table:', error.message);
        if (error.code === '42P01') { // undefined_table
            console.log('CONFIRMED: Table website_inquiries does not exist.');
        }
    } else {
        console.log('Success: Table exists and is accessible.');
    }
}

checkTable();
