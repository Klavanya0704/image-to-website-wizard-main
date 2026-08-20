const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_PUBLISHABLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log(`Total products in Supabase: ${data.length}`);
  const laserProds = data.filter(p => (p.category_slug || '').toLowerCase().includes('laser') || (p.category || '').toLowerCase().includes('laser'));
  console.log(`\nLaser Cutting products in Supabase (${laserProds.length}):`);
  laserProds.forEach(p => {
    console.log(`- [${p.id}] ${p.name} (slug: ${p.slug}, category_slug: ${p.category_slug}, image_key: ${p.image_key})`);
  });
}

main();
