import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

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
  @Output() imagesChange = new EventEmitter<string[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  save() {
    const Base64Data = this.croppedImage.split(',')[1];
    this._httpClient
      .post('https://ninjawebstorage.azurewebsites.net/api/Storage?code=U0ijSLnySRppyW4j62PaaNRSTEaFMyoRbP7aH9YN0LaldI4QRDXzig==', {
        ContentType: 'image/jpeg',
        ContainerName: 'mysetupsheet',
        Base64Data: Base64Data
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return empty();
        })
      )
      .subscribe(response => {
        const images = this._activatedRoute.snapshot.queryParamMap.get('images') || [];

        this._router.navigate(['.'], {
          queryParams: {
            images: [response['resourceUri']]
          },
          queryParamsHandling: 'merge'
        });

        this.imagesChange.emit([response['resourceUri']]);
      });
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
