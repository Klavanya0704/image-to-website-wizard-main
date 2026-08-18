const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: dbProducts, error } = await supabase.from('products').select('*').order('created_at');
  if (error) {
    console.error('Error fetching DB products:', error);
    return;
  }
  console.log(`Total live products in database: ${dbProducts.length}\n`);
  dbProducts.forEach((p, idx) => {
    console.log(`${(idx + 1).toString().padStart(2)}. [${p.category_slug || p.category}] slug: "${p.slug}" | title: "${p.name}" | image_key: "${p.image_key}"`);
  });
}

check();
