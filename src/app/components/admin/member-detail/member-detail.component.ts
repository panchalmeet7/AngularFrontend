import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Members } from 'src/app/models/members.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  private memberId!: number;
  public member!: Members;
  public isMale!: boolean;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 0) {
        this.memberId = params['id'];
        this.apiService.getSingleMemberById(this.memberId).subscribe({
          next: (data) => {
            console.log(data);
            this.member = data;
            if (this.member.gender == 'Male') {
              this.isMale = true;
            } else {
              this.isMale = false;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.memberId = 0;
      }
    });
  }
}
