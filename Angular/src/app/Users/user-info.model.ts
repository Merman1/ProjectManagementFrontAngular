export interface UserInfoResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    roles: string[];
    role: string; 
    adress: string;
    lastName: string;
    firstName: string;
    positionName: string;
    location: string;
    number: string;
    organization: string;
    publicName: string;
  }
  
  export interface Role {
    id: number;
    name: string;
  }
  