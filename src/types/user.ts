export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "team";
  avatar_url: string | null;
  created_at: string;
}
