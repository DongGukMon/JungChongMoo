export interface GroupTypes {
  id: string;
  name: string;
  data: string;
  participants: string[];
}

export interface GroupPayloadTypes {
  [id: string]: GroupTypes;
}
