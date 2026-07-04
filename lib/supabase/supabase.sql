supabase.sql
Create Table user(
  id text primary key, -- Directly store your Firebase user.uid here
  email text unique not null,
  username text unique not null,
  name text,
  bio text,
  image text,
  location text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
)

Create table public.posts(
  id uuid primary key default gen_random_uuid(),--post id
  user_id text references public.user(id) on delete cascade not null,--user id that posted the content
  caption text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text,now()) not null,
)

Create table public.notifications(
  id uuid primary key default gen_random_uuid(),--notification id
  receiver_id text references public.users(id) on delete cascade not null,--receiver users id
  sender_id text references public.users(id) on delete cascade not null,--sender user id
  type text not null,--notification 
  is_read boolean default false not null,--read status
  created_at timestamp with time zone default timezone('utc'::text, now())
)

Create table public.likes(
  user_id references public.user(id) on delete cascade,
  post_id references public.user(id) on delete cascade,
  primary key(user_id, post_id) 
)

Create table public.follows(
  follower_id text references public.users(id) on delete cascade not null,
  following_id text references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
  constraint check_not_self check(follower_id <> following_id)
)