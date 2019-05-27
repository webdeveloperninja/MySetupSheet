import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailFacade } from './email.facade';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-email-report',
  templateUrl: './email-report.component.html',
  styleUrls: ['./email-report.component.scss'],
  providers: [EmailFacade]
})
export class EmailReportComponent {
  isLoading$ = new BehaviorSubject(false);

  readonly emailForm = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly facade: EmailFacade,
    private readonly snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EmailReportComponent>
  ) {}

  get emailAddress() {
    return this.emailForm.controls.emailAddress.value;
  }

  onSubmit() {
    this.isLoading$.next(true);

    this.facade
      .sendEmail(this.emailAddress, window.location.href)
      .pipe(
        finalize(() => {
          this.snackBar.open(`Sent setup sheet to ${this.emailAddress}`, null, { duration: 5000 });
          this.dialogRef.close();
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }
}
