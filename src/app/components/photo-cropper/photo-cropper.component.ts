import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private readonly _httpClient: HttpClient) {}

  ngOnInit() {}

  save() {
    console.log('save', this.croppedImage);
    const Base64Data = this.croppedImage.split(',')[1];
    this._httpClient
      .post('https://ninjawebstorage.azurewebsites.net/api/Storage?code=U0ijSLnySRppyW4j62PaaNRSTEaFMyoRbP7aH9YN0LaldI4QRDXzig==', {
        ContentType: 'image/jpeg',
        ContainerName: 'mysetupsheet',
        Base64Data: Base64Data
      })
      .subscribe();
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
