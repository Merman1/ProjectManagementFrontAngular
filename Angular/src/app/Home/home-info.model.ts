// HomePage-info.model.ts

export interface HomePageInfo {
    times: any[];
    showDropDown: boolean;
    sprintTimes: any;
    showDropDown2: boolean;
    showSide: boolean;
    sprints: any[];
    startTime: string;
    endTime: string;
    userId: string;
    sprintId: string;
    userData: UserData;
    sprinter: Sprinter;
    selectedSprintId: string | null;
    showTimeFormFlag: boolean;
    searchQuery: string;
    selectedProject: string;
  }
  
  
  export interface UserData {
    id: string;
    email: string;
    username: string;
    password: string;
    publicName: string;
    firstName: string;
    lastName: string;
    positionName: string;
    address: string;
    number: string;
    location: string;
    organization: string;
  }
  
  
  interface Sprinter {
    name: string;
  }
  