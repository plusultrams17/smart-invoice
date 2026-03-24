export interface Project {
  id: string;
  user_id: string;
  name: string;
  data: Record<string, unknown>;
  created_at: string;
}
