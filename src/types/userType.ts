export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type ExistingUser = {
  document_number: string;
  password: string;
};

export type CurrentUser = {
  first_name: string;
  last_name: string;
  dob: string;
  document_type: string;
  document_number: string;
  email: string;
  role_id: number;
  role_name: string;
  campus_id: number;
  campus_name: string;
  created_by: number;
};
