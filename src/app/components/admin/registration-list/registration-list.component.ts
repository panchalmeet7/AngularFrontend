import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Members } from 'src/app/models/members.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<Members>;
  // public members!: Members[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'emailId',
    'phoneNo',
    'gender',
    'bmiResult',
    'packageType',
    'enquiryDate',
    'action',
  ];
  public message: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllMembersData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllMembersData() {
    this.apiService.getAllRegisteredMembers().subscribe({
      next: (data) => {
        // this.members = data;
        this.dataSource = new MatTableDataSource(data); //filling the table
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.toastr.error('ERROR', 'Oops!! Error while retriving the data');
        console.log(err);
      },
    });
  }

  // on click of edit(pencil) icon
  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  confirmDialog(id: number) {
    const title = 'Confirm Delete';
    const message: string = 'Are you sure you want to do delete this?';
    //const msg = this.message;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: { message, title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteData(id); //deleteData function call
      } else {
        console.log(result);
      }
    });
  }

  // delete member api call
  deleteData(id: number) {
    if (id != 0) {
      this.apiService.deleteMember(id).subscribe({
        next: (res) => {
          this.toastr.success('SUCCESS');
          this.getAllMembersData();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
