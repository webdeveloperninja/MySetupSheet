import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface Data {
  image: string;
  name: string;
}

@Component({
  selector: 'app-photo-cropper',
  templateUrl: './photo-cropper.component.html',
  styleUrls: ['./photo-cropper.component.scss']
})
export class PhotoCropperComponent implements OnInit {
  croppedImage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}

  ngOnInit() {}

  save() {
    console.log('save');
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
