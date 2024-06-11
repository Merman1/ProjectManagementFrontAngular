import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { Comment, Issue } from './reports.model';
import { UserInfoResponse, Role } from '../Users/user-info.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
    showSide = true;
  tasks: Issue[] = [];
  selectedTask: Issue | null = null;
  comments: Comment[] = [];
  newComment = '';
  selectedProject: string | null = null;
  searchQuery = '';
  showDropDown2: boolean = false;
  showDropDown: boolean = false; // Dodaj właściwość showDropDown

  selectedUser: UserInfoResponse = {
    id: '',
    name:'',
    username: '',
    email: '',
    roles: [],
    role: '',  // Dodaj tę linię
    adress: '',
    lastName: '',
    firstName: '',
    positionName: '',
    location: '',
    number: '',
    organization: '',
    publicName: ''
  };
  
  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.getAllIssues();
  }
  toggleSideBar(): void {
    this.showSide = !this.showSide;
  }
  search(): void {

  }
  toggleDrop(): void {
    console.log('Toggled user profile dropdown');
  }
  toggleDrop2(): void {
    console.log('Toggled notifications dropdown');
  }
  getAllIssues(): void {
    this.reportsService.getAllIssues().subscribe((issues: Issue[]) => {
      this.tasks = issues;
    });
  }

  selectTask(task: Issue): void {
    this.selectedTask = task;
    this.getCommentsForIssue(task.id);
  }

  getCommentsForIssue(issueId: number): void {
    this.reportsService.getCommentsForIssue(issueId).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  addComment(): void {
    if (this.newComment.trim() && this.selectedTask) {
      const newCommentObj: Comment = {
        id: 0,
        opis: this.newComment,
        user: { id: 0, username: 'Current User' },  // Zmień na właściwego użytkownika
        dataDodania: new Date().toISOString().split('T')[0],
        issues: [this.selectedTask]
      };

      this.reportsService.createComment(newCommentObj).subscribe((comment: Comment) => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }
}
