import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoCropperComponent } from '../photo-cropper/photo-cropper.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  fileToUpload;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  dialogRef: MatDialogRef<PhotoCropperComponent>;
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {}

  fileUploadEvent(image) {
    this.fileToUpload = image;
    this.dialogRef = this.dialog.open(PhotoCropperComponent, { data: { image } });

    this.dialogRef.componentInstance.imagesChange.pipe(first()).subscribe(d => {
      this.dialogRef.close();
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
    this.croppedImage = event;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
