export interface Project {
    id: number;
    name: string;
    keyProject: string;
    type: string;
    leader: {
      id: number;
      username: string;
    };
    // Dodaj inne pola projektu, jeśli są
  }
  