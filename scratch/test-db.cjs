const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

let envContent = "";
if (fs.existsSync(".env.local")) envContent += fs.readFileSync(".env.local", "utf8") + "\n";
if (fs.existsSync(".env")) envContent += fs.readFileSync(".env", "utf8") + "\n";

const env = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts
      .slice(1)
      .join("=")
      .trim()
      .replace(/^["']|["']$/g, "");
    env[k] = v;
  }
});

const url = env["VITE_SUPABASE_URL"] || env["SUPABASE_URL"];
const key = env["VITE_SUPABASE_PUBLISHABLE_KEY"] || env["SUPABASE_PUBLISHABLE_KEY"];
console.log("Connecting to Supabase at:", url);

if (url && key) {
  const sb = createClient(url, key);
  sb.from("products")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.log("Supabase error:", error.message);
      } else {
        console.log("Products from Supabase count:", data ? data.length : 0);
        if (data && data.length > 0) {
          console.log(
            "Products from Supabase:",
            JSON.stringify(
              data.map((p) => ({
                id: p.id,
                name: p.name,
                category_slug: p.category_slug,
                category: p.category,
              })),
              null,
              2,
            ),
          );
        }
      }
    });
}
