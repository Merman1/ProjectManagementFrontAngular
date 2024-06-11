// reports.model.ts

export interface User {
    id: number;
    username: string;
    // Dodaj inne właściwości użytkownika według potrzeby
  }
  
  export interface Issue {
    id: number;
    nazwa: string;
    etap: string;
    users: User[];
    sprint: Sprint;
    scrum: string;
    // Dodaj inne właściwości zadania według potrzeby
  }
  
  export interface Comment {
    id: number;
    opis: string;
    user: User;
    dataDodania: string;
    issues: Issue[];
    // Dodaj inne właściwości komentarza według potrzeby
  }
  
  export interface Sprint {
    id: number;
    // Dodaj inne właściwości sprintu według potrzeby
  }
  