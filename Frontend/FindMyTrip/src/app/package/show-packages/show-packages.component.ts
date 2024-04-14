import { Component, OnInit } from '@angular/core';
import {PackageService} from "../package.service";
import {Router} from "@angular/router";

// This component is responsible for showing all the packages available in the system.

interface Package {
  id: number;
  name: string;
  description: string;
  duration_in_days: number;
  hotels: any;
  flights: any;
  activities: any;
  image: string;
  created_by: number;
}

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
  GeneralPackageList: Package[] = [];
  package: any;
  ModelTitle: string | undefined;
  customPackages: Package[] = [];
  userID = 0;


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
      image: "",
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

  filterPackges(): void {
    const userId  = parseInt(localStorage.getItem('userId') || '0', 10);
    console.log(userId);
    if (userId !== 0) {
      for (let i = 0; i < this.PackageList.length; i++) {
        console.log(this.PackageList[i].created_by);
        if (this.PackageList[i].created_by === userId) {
          this.customPackages.push(this.PackageList[i]);
        }
      }
    }
    this.GeneralPackageList = this.PackageList.filter((p: { created_by: number | 0; }) => p.created_by === 0);
    console.log(this.customPackages);
  }

 viewPackageDetails(packageId: number,packageObj:any): void {
  this.router.navigate(['/package-details', packageId], {state: {data: packageObj}});
}

  refreshPackageList() {
    this.service.getPackageList().subscribe(data => {
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      this.PackageList = packageList.results;
      this.filterPackges();
    });
  }
}

