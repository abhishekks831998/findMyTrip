import { Component, OnInit } from '@angular/core';
import {PackageService} from "../package.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-packages',
  templateUrl: './show-packages.component.html',
  styleUrl: './show-packages.component.css'
})
export class ShowPackagesComponent implements OnInit {

  constructor(private service: PackageService, private router: Router) {
  }

  ActivateAddEditPackageComp: boolean = false;
  PackageList: any = [];
  package: any;
  ModelTitle: string | undefined;

  ngOnInit(): void {
    this.refreshPackageList()
  }

  addClick(): void {
    this.package = {
      id: 0,
      name: "",
      description: "",
      duration_in_days: 0,
      hotels: {},
      flights: {},
      activities: {},
      image: ""
    }
    this.ModelTitle = "Add Package";
    this.ActivateAddEditPackageComp = true;

  }

  editPackage(data: any): void {
    console.log("edit clicked");
    this.package = data;
    this.ActivateAddEditPackageComp = true;
    this.ModelTitle = "Edit Package";
  }

  deletePackage(packageId: number): void {
    if (confirm('Are you sure??')) {
      this.service.deletePackage(packageId).subscribe(data => {
        alert(data.toString());
        this.refreshPackageList();
      });
    }
  }
  closeClick(): void {
    this.ActivateAddEditPackageComp = false;
    this.refreshPackageList();
  }

 viewPackageDetails(packageId: string,packageObj:any): void {
  this.router.navigate(['/package-details', packageId], {state: {data: packageObj}});
}

  refreshPackageList() {
    this.service.getPackageList().subscribe(data => {
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      this.PackageList = packageList.results;
    });
  }
}

