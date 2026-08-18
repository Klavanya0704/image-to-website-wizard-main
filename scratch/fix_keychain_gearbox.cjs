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

async function directFix() {
  // Fix Custom Name Keychain to laser-cutting
  const { data: d1, error: e1 } = await sb.from('products').update({
    category_slug: 'laser-cutting'
  }).eq('slug', 'custom-name-keychain').select();
  console.log('Updated custom-name-keychain:', d1, e1);

  // Fix Mechanical Gearbox Prototype Model to cnc-machining
  const { data: d2, error: e2 } = await sb.from('products').update({
    category_slug: 'cnc-machining'
  }).eq('slug', 'mechanical-prototype-model').select();
  console.log('Updated mechanical-prototype-model:', d2, e2);
}

directFix();
