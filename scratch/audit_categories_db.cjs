const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

let envContent = '';
if (fs.existsSync('.env.local')) envContent += fs.readFileSync('.env.local', 'utf8') + '\n';
if (fs.existsSync('.env')) envContent += fs.readFileSync('.env', 'utf8') + '\n';

const env = {};
envContent.split('\n').forEach((line) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[k] = v;
  }
});

const url = env['VITE_SUPABASE_URL'] || env['SUPABASE_URL'];
const key = env['VITE_SUPABASE_PUBLISHABLE_KEY'] || env['SUPABASE_PUBLISHABLE_KEY'];
const sb = createClient(url, key);

async function listAll() {
  const { data, error } = await sb.from('products').select('*').order('created_at');
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Total live products in Supabase: ${data.length}\n`);
  data.forEach((p, i) => {
    console.log(`${(i+1).toString().padStart(2)}. [${(p.category_slug || p.category || '').padEnd(16)}] | name: "${p.name.padEnd(45)}" | slug: "${p.slug}"`);
  });
}

listAll();
