
-- roles
create type public.app_role as enum ('admin','customer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "profiles self read" on public.profiles for select to authenticated using (auth.uid() = id or public.has_role(auth.uid(),'admin'));
create policy "profiles self insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles self update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "roles self read" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(new.email,''), coalesce(new.raw_user_meta_data->>'phone',''))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'customer') on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- catalog
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  icon text not null default 'box',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;
grant insert, update, delete on public.categories to authenticated;
alter table public.categories enable row level security;
create policy "categories public read" on public.categories for select to anon, authenticated using (true);
create policy "categories admin write" on public.categories for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  category_slug text not null references public.categories(slug) on update cascade,
  subcategory text not null default '',
  short_description text not null default '',
  description text not null default '',
  price numeric(10,2) not null,
  discount_price numeric(10,2),
  stock int not null default 0,
  image_key text not null default 'default',
  rating numeric(2,1) not null default 4.5,
  review_count int not null default 0,
  specifications jsonb not null default '{}'::jsonb,
  dimensions text not null default '',
  material text not null default '',
  manufacturing_method text not null default '',
  featured boolean not null default false,
  bestseller boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
grant insert, update, delete on public.products to authenticated;
alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (true);
create policy "products admin write" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null default 'Customer',
  rating int not null check (rating between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now()
);
grant select on public.reviews to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "reviews public read" on public.reviews for select to anon, authenticated using (true);
create policy "reviews own insert" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "reviews own delete" on public.reviews for delete to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

create table public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
grant select, insert, delete on public.wishlist_items to authenticated;
grant all on public.wishlist_items to service_role;
alter table public.wishlist_items enable row level security;
create policy "wishlist own" on public.wishlist_items for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Home',
  full_name text not null,
  phone text not null,
  line1 text not null,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.addresses to authenticated;
grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "addresses own" on public.addresses for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text not null,
  line1 text not null,
  city text not null,
  state text not null,
  pincode text not null,
  payment_method text not null default 'cod',
  payment_status text not null default 'pending',
  status text not null default 'pending',
  subtotal numeric(10,2) not null default 0,
  discount numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "orders own read" on public.orders for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "orders own insert" on public.orders for insert to authenticated with check (auth.uid() = user_id);
create policy "orders admin update" on public.orders for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  name text not null,
  image_key text not null default 'default',
  price numeric(10,2) not null,
  quantity int not null default 1
);
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "order items own read" on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.has_role(auth.uid(),'admin'))));
create policy "order items own insert" on public.order_items for insert to authenticated with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  percent_off int not null default 10,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.coupons to anon, authenticated;
grant insert, update, delete on public.coupons to authenticated;
grant all on public.coupons to service_role;
alter table public.coupons enable row level security;
create policy "coupons public read" on public.coupons for select to anon, authenticated using (active);
create policy "coupons admin write" on public.coupons for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'contact',
  name text not null,
  email text not null,
  phone text not null default '',
  organization text not null default '',
  subject text not null default '',
  product_type text not null default '',
  quantity text not null default '',
  message text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon, authenticated;
grant select, update on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "enquiries anyone insert" on public.enquiries for insert to anon, authenticated with check (true);
create policy "enquiries admin read" on public.enquiries for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "enquiries admin update" on public.enquiries for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.site_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int not null default 0
);
grant select on public.site_stats to anon, authenticated;
grant insert, update, delete on public.site_stats to authenticated;
grant all on public.site_stats to service_role;
alter table public.site_stats enable row level security;
create policy "stats public read" on public.site_stats for select to anon, authenticated using (true);
create policy "stats admin write" on public.site_stats for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

insert into public.categories (slug,name,description,icon,sort_order) values
('3d-printing','3D Printing','FDM and resin printed parts, prototypes and functional products made in the IDEA Lab.','box',1),
('laser-cutting','Laser Cutting','Precision laser cut wood, MDF and acrylic products, lamps, signage and art.','scissors',2),
('cnc-machining','CNC Machining','Aluminium and composite components machined to tight tolerances.','cpu',3),
('electronics','Electronics','Development boards, sensors, modules and electronics for student projects.','circuit-board',4),
('drones-parts','Drones & Parts','Frames, mounts, propellers and FPV components for UAV prototyping.','plane',5),
('acrylic-products','Acrylic Products','Laser polished acrylic nameplates, stands, keychains and display boards.','layers',6),
('diy-kits','DIY Kits','Curated hands-on kits for robotics, IoT and electronics learning.','bot',7);

insert into public.site_stats (label,value,sort_order) values
('Projects Developed','450+',1),('Students Supported','3,200+',2),('Products Created','1,100+',3),('Innovation Workshops','85+',4);

insert into public.coupons (code, percent_off) values ('IDEA10',10),('STUDENT15',15);

insert into public.products (sku,slug,name,category_slug,subcategory,short_description,description,price,discount_price,stock,image_key,rating,review_count,specifications,dimensions,material,manufacturing_method,featured,bestseller) values
('IL-3DP-001','3d-printed-geometric-vase','3D Printed Geometric Vase','3d-printing','Home Decor','Spiral-vase mode decor piece with faceted geometry.','Printed in the IDEA Lab on an FDM printer using vase mode for a seamless single-wall finish. Ideal for dry flowers, pens or as a desk accent.',699,499,42,'vase',4.7,38,'{"Layer Height":"0.2 mm","Infill":"Vase mode","Print Time":"6 hrs"}','120 x 120 x 210 mm','PLA+','FDM 3D Printing',true,true),
('IL-3DP-002','custom-name-keychain','Custom Name Keychain','3d-printing','Personalised','Personalised keychain printed with your name.','A durable two-colour keychain printed to order with any name or roll number. A popular pick for college fests and farewell gifts.',199,149,180,'keychain',4.6,120,'{"Colours":"12 options","Lead Time":"2 days"}','60 x 22 x 4 mm','PLA','FDM 3D Printing',true,true),
('IL-3DP-003','mini-desk-organizer','Mini Desk Organizer','3d-printing','Stationery','Compact modular organiser for pens and cards.','Three-compartment organiser designed in Fusion 360 and printed with 30% infill for rigidity.',549,null,60,'organizer',4.5,26,'{"Compartments":"3","Infill":"30%"}','150 x 90 x 80 mm','PLA+','FDM 3D Printing',false,false),
('IL-3DP-004','adjustable-phone-stand','Adjustable Phone Stand','3d-printing','Accessories','Foldable stand with three viewing angles.','Print-in-place hinge design that folds flat. Fits phones and tablets up to 11 inches.',349,299,95,'stand',4.4,44,'{"Angles":"3","Max Device":"11 inch"}','95 x 80 x 110 mm','PETG','FDM 3D Printing',false,true),
('IL-3DP-005','cable-management-clip-set','Cable Management Clip Set','3d-printing','Accessories','Set of six adhesive-backed desk cable clips.','Keeps charging and lab bench cables tidy. Supplied with 3M adhesive pads.',249,199,140,'organizer',4.3,31,'{"Pack Size":"6 clips"}','30 x 20 x 12 mm','PLA','FDM 3D Printing',false,false),
('IL-3DP-006','mechanical-prototype-model','Mechanical Gearbox Prototype Model','3d-printing','Prototyping','Working planetary gearbox teaching model.','A fully assembled planetary gear model used for mechanism demonstrations in labs and classrooms.',1499,1299,18,'cnc',4.8,15,'{"Gears":"Planetary set","Ratio":"5:1"}','140 x 140 x 60 mm','PLA+ / PETG','FDM 3D Printing',true,false),
('IL-LC-001','tree-of-life-lamp','Tree of Life LED Lamp','laser-cutting','Lighting','Layered MDF lamp with warm LED backlight.','Multi-layer laser cut MDF panels create depth-lit artwork. Includes USB powered warm white LED strip.',999,699,34,'lamp',4.8,74,'{"Power":"USB 5V","LED":"Warm white"}','200 x 150 x 60 mm','MDF 3 mm','Laser Cutting',true,true),
('IL-LC-002','laser-cut-desk-organizer','Laser Cut Desk Organizer','laser-cutting','Stationery','Slot-together plywood organiser kit.','Flat-pack birch plywood organiser that assembles without glue. Engraved IDEA Lab mark.',749,649,40,'organizer',4.5,22,'{"Assembly":"Slot-together"}','220 x 120 x 100 mm','Birch Plywood 4 mm','Laser Cutting',false,false),
('IL-LC-003','college-logo-board','Custom College Logo Board','laser-cutting','Signage','Engraved wooden board with your college logo.','Precision engraved and cut wooden display board, finished with matte lacquer. Great for departments and labs.',1899,1599,22,'board',4.7,19,'{"Finish":"Matte lacquer"}','400 x 300 x 12 mm','Sheesham Wood','Laser Cutting',true,false),
('IL-LC-004','wooden-wall-art-mandala','Wooden Mandala Wall Art','laser-cutting','Decor','Intricate laser cut mandala wall panel.','A 3-layer mandala panel with hidden keyhole mounting. Adds warmth to hostel rooms and offices.',1299,1099,28,'board',4.6,33,'{"Layers":"3"}','450 mm diameter','MDF 3 mm','Laser Cutting',false,true),
('IL-LC-005','laser-engraved-photo-frame','Laser Engraved Photo Frame','laser-cutting','Gifting','Personalised engraved wooden photo frame.','Engraved with a name and date of your choice. Fits standard 4x6 photographs.',649,549,55,'board',4.4,27,'{"Photo Size":"4 x 6 in"}','180 x 230 x 15 mm','MDF','Laser Cutting',false,false),
('IL-CNC-001','cnc-aluminium-bracket','CNC Machined Aluminium Bracket','cnc-machining','Structural','90-degree machined mounting bracket.','Machined from 6061 aluminium on a 3-axis CNC, deburred and anodised. Suits robotics chassis and test rigs.',1199,899,26,'cnc',4.7,21,'{"Tolerance":"±0.05 mm","Finish":"Anodised"}','80 x 80 x 40 mm','Aluminium 6061','CNC Machining',true,true),
('IL-CNC-002','precision-mounting-plate','Precision Mounting Plate','cnc-machining','Structural','Drilled and tapped plate for motor mounting.','Flat-ground plate with M3/M4 tapped hole pattern for NEMA motors and sensor stacks.',1499,null,20,'cnc',4.6,14,'{"Holes":"M3 & M4 tapped"}','150 x 150 x 8 mm','Aluminium 6061','CNC Machining',false,false),
('IL-CNC-003','custom-cnc-component','Custom CNC Component (Made to Order)','cnc-machining','Custom','Machined to your CAD drawing.','Upload a STEP or DXF file and our lab machines your component. Price shown is the base setup rate.',2499,null,10,'cnc',4.8,9,'{"Files":"STEP / DXF","Lead Time":"5-7 days"}','As per drawing','Aluminium / Brass / Delrin','CNC Machining',true,false),
('IL-CNC-004','aluminium-prototype-block','Aluminium Prototype Block','cnc-machining','Prototyping','Pre-machined block for student prototyping.','Squared and faced aluminium stock ready for further machining in project work.',799,699,45,'cnc',4.3,11,'{"Squareness":"±0.02 mm"}','100 x 60 x 25 mm','Aluminium 6061','CNC Machining',false,false),
('IL-ELEC-001','esp32-development-board','ESP32 Development Board','electronics','Boards','Dual-core WiFi + Bluetooth dev board.','ESP32-WROOM-32 board with USB-C, 38 pins and onboard antenna. The workhorse for IoT projects in the lab.',749,599,120,'esp32',4.8,156,'{"MCU":"ESP32-WROOM-32","Connectivity":"WiFi + BLE","USB":"Type-C"}','55 x 28 mm','FR4 PCB','Electronics Assembly',true,true),
('IL-ELEC-002','arduino-sensor-kit','Arduino 16-in-1 Sensor Kit','electronics','Kits','Sixteen common sensors with jumper leads.','Includes DHT11, ultrasonic, IR, LDR, soil moisture, tilt and more, packed in a labelled case.',1299,999,80,'kit',4.6,98,'{"Sensors":"16","Includes":"Jumper wires"}','200 x 150 x 50 mm','Mixed','Kitting',true,true),
('IL-ELEC-003','iot-starter-kit','IoT Starter Kit','electronics','Kits','ESP32 based kit for connected projects.','Everything needed to build a cloud-connected sensor node, with a printed project guide.',2299,1899,50,'kit',4.7,64,'{"Board":"ESP32","Projects":"8 guided"}','250 x 180 x 60 mm','Mixed','Kitting',true,false),
('IL-ELEC-004','led-electronics-kit','LED & Display Electronics Kit','electronics','Kits','Assorted LEDs, drivers and displays.','WS2812B strip, 7-segment, OLED display and driver ICs for display-focused projects.',899,749,70,'kit',4.4,37,'{"Display":"0.96 inch OLED","Strip":"1 m WS2812B"}','180 x 140 x 40 mm','Mixed','Kitting',false,false),
('IL-ELEC-005','soldering-practice-board','Soldering Practice Board','electronics','Tools','Through-hole soldering skill board.','Guided practice board with progressively harder joints. Used in IDEA Lab soldering workshops.',449,349,90,'esp32',4.3,24,'{"Joints":"120"}','100 x 80 mm','FR4 PCB','Electronics Assembly',false,false),
('IL-DRN-001','drone-frame-kit','450mm Drone Frame Kit','drones-parts','Frames','Glass fibre quadcopter frame with hardware.','Rigid 450 mm class frame with integrated PDB arms and all mounting hardware.',1799,1299,32,'drone',4.6,41,'{"Wheelbase":"450 mm","Weight":"280 g"}','450 mm wheelbase','Glass Fibre / Nylon','CNC + 3D Printing',true,true),
('IL-DRN-002','brushless-motor-mount','Brushless Motor Mount (Set of 4)','drones-parts','Mounts','Printed mounts for 2212 class motors.','Vibration damped mounts printed in PETG, tested on lab test benches.',599,499,64,'drone',4.4,18,'{"Motor":"2212 class","Pack":"4"}','40 x 40 x 12 mm','PETG','FDM 3D Printing',false,false),
('IL-DRN-003','propeller-set-1045','1045 Propeller Set','drones-parts','Propellers','Two CW and two CCW balanced props.','Balanced nylon propellers suited to 450 mm quad builds.',449,349,110,'drone',4.3,29,'{"Size":"10 x 4.5 in","Pack":"4"}','254 mm','Nylon','Injection Moulded',false,false),
('IL-DRN-004','drone-landing-gear','Drone Landing Gear Set','drones-parts','Accessories','Flexible printed landing legs.','Absorbs landing shock and raises the payload bay for camera gimbals.',549,449,48,'drone',4.5,16,'{"Pack":"2 legs"}','180 x 60 x 90 mm','TPU','FDM 3D Printing',false,false),
('IL-DRN-005','fpv-prototype-frame','FPV Prototype Frame 5 inch','drones-parts','Frames','Carbon look 5 inch freestyle frame.','A lightweight 5 inch class frame for FPV prototyping and student racing teams.',2499,2099,15,'drone',4.7,12,'{"Class":"5 inch","Arm Thickness":"4 mm"}','220 mm wheelbase','Carbon Composite','CNC Machining',true,false),
('IL-ACR-001','acrylic-name-plate','Acrylic Name Plate','acrylic-products','Signage','Flame-polished engraved acrylic plate.','Personalised desk or door nameplate with flame-polished edges and optional stand.',899,699,58,'acrylic',4.6,45,'{"Thickness":"5 mm","Finish":"Flame polished"}','250 x 80 x 5 mm','Cast Acrylic','Laser Cutting',true,true),
('IL-ACR-002','acrylic-keychain','Acrylic Keychain','acrylic-products','Personalised','Colour printed acrylic keychain.','Transparent acrylic keychain with UV printed college or club artwork.',149,119,220,'keychain',4.4,88,'{"Thickness":"3 mm"}','55 x 30 x 3 mm','Cast Acrylic','Laser Cutting',false,true),
('IL-ACR-003','acrylic-desk-sign','Acrylic Desk Sign','acrylic-products','Signage','Two-tone desk sign with wooden base.','Engraved acrylic panel seated in a laser cut wooden base. Ideal for faculty and reception desks.',1199,999,30,'acrylic',4.5,20,'{"Base":"Wooden"}','220 x 60 x 90 mm','Acrylic + Wood','Laser Cutting',false,false),
('IL-ACR-004','transparent-display-stand','Transparent Display Stand','acrylic-products','Display','Three-step acrylic display riser.','Perfect for exhibiting student prototypes and models at expos.',1099,899,26,'acrylic',4.4,13,'{"Steps":"3"}','300 x 200 x 150 mm','Cast Acrylic','Laser Cutting',false,false),
('IL-ACR-005','college-logo-acrylic-board','College Logo Acrylic Board','acrylic-products','Signage','Backlit-ready layered acrylic logo board.','Layered acrylic logo board with optional LED backlight channel.',2599,2199,14,'board',4.7,10,'{"Backlight":"Optional LED"}','600 x 400 x 8 mm','Cast Acrylic','Laser Cutting',true,false),
('IL-DIY-001','smart-home-diy-kit','Smart Home DIY Kit','diy-kits','Home Automation','Build four smart home devices.','Relay module, ESP8266, sensors and a step-by-step manual to automate lights and fans safely.',2499,1999,38,'kit',4.7,52,'{"Projects":"4","Board":"ESP8266"}','260 x 200 x 70 mm','Mixed','Kitting',true,true),
('IL-DIY-002','mini-robot-kit','Mini Line Follower Robot Kit','diy-kits','Robotics','Assemble and program a line follower.','Chassis, gear motors, IR array and controller with lab-tested code samples.',1899,1499,44,'kit',4.6,61,'{"Sensors":"5-channel IR"}','200 x 150 x 80 mm','Acrylic + Electronics','Kitting',true,true),
('IL-DIY-003','electronics-learning-kit','Electronics Learning Kit','diy-kits','Learning','Breadboard fundamentals kit for beginners.','Covers resistors, capacitors, transistors and op-amps with 20 guided experiments.',1099,899,66,'kit',4.5,40,'{"Experiments":"20"}','230 x 160 x 55 mm','Mixed','Kitting',false,false),
('IL-DIY-004','arduino-project-kit','Arduino Project Kit','diy-kits','Learning','Arduino UNO based 15 project kit.','Includes an UNO compatible board, breadboard, components and a printed project book.',2199,1799,52,'kit',4.6,73,'{"Projects":"15","Board":"UNO R3 compatible"}','250 x 180 x 60 mm','Mixed','Kitting',true,false),
('IL-DIY-005','drone-building-diy-kit','Drone Building DIY Kit','diy-kits','Robotics','Complete beginner quadcopter build kit.','Frame, motors, ESCs, flight controller and props with an assembly workshop guide.',6499,5499,12,'drone',4.8,17,'{"Class":"450 mm","Includes":"FC + ESCs"}','450 mm wheelbase','Mixed','Kitting',true,false),
('IL-3DP-007','resin-architectural-model','Resin Architectural Model','3d-printing','Prototyping','High detail resin scale model.','Resin printed scale model with fine surface detail, cleaned and UV cured in the lab.',2999,2499,9,'vase',4.7,8,'{"Layer Height":"0.05 mm"}','200 x 200 x 120 mm','Standard Resin','SLA 3D Printing',false,false),
('IL-ELEC-006','mini-robotics-kit','Mini Robotics Controller Kit','electronics','Kits','Motor driver and controller bundle.','L298N driver, servo pack and controller board for quick robotics builds.',1399,1149,58,'kit',4.5,35,'{"Driver":"L298N"}','200 x 150 x 50 mm','Mixed','Kitting',false,false);
