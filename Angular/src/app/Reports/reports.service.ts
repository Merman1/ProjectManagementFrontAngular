import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, Issue } from './reports.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments`);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/comments/${id}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/comments`, comment);
  }

  getCommentsForIssue(issueId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/issue/${issueId}`);
  }

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.baseUrl}/issues`);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/issues/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/issues`, issue);
  }

  createIssueBacklog(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/issues/CreateBacklog`, issue);
  }

  updateIssue(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.baseUrl}/issues/${id}`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/issues/${id}`);
  }
}
