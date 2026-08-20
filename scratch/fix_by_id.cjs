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

async function fixById() {
  // Update Custom Name Keychain to laser-cutting
  const res1 = await supabase
    .from('products')
    .update({ category_slug: 'laser-cutting' })
    .eq('id', 'c537abdd-6a49-45ef-a8ef-a56f8272ab25');
  console.log('Update custom-name-keychain:', res1.error || 'SUCCESS');

  // Update Mechanical Gearbox Prototype Model to cnc-machining
  const res2 = await supabase
    .from('products')
    .update({ category_slug: 'cnc-machining' })
    .eq('id', '16e0faef-04db-45db-ae05-2c073a026741');
  console.log('Update mechanical-prototype-model:', res2.error || 'SUCCESS');
}

fixById();
