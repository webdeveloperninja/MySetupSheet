import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  fileToUpload;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {}

  fileUploadEvent(image) {
    this.fileToUpload = image;
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
