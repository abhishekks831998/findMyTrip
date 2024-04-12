import { Component, OnInit } from '@angular/core';
import {PackageService} from "../package/package.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: string[] = [];

  constructor(private packageService: PackageService) { }

  fetchImages(): void {
     this.packageService.getPackageList().subscribe(data =>{
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      packageList = packageList.results;
      for (let i = 0; i < packageList.length; i++) {
        this.images.push(packageList[i].image);
      }
    });
  }

  ngOnInit(): void {
    this.fetchImages();
  }
}
