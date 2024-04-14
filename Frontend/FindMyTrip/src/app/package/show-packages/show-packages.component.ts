import { Component, OnInit } from '@angular/core';
import { PackageService } from "../package.service";
import { Router } from "@angular/router";

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
  styleUrls: ['./show-packages.component.css']
})
export class ShowPackagesComponent implements OnInit {

  constructor(private service: PackageService, private router: Router) { }

  ActivateAddEditPackageComp: boolean = false;
  OriginalPackageList: any = []; // Variable to store the original list of packages
  PackageList: any = [];
  GeneralPackageList: Package[] = [];
  customPackages: Package[] = [];
  package: any;
  ModelTitle: string | undefined;
  searchQuery: string = '';
  userID = 0;

  ngOnInit(): void {
    this.refreshPackageList();
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
      created_by: 0
    }
    this.ModelTitle = "Add Package";
    this.ActivateAddEditPackageComp = true;
  }

  editPackage(data: any): void {
    this.package = data;
    this.ActivateAddEditPackageComp = true;
    this.ModelTitle = "Edit Package";
  }

  deletePackage(packageId: number): void {
    if (confirm('Are you sure?')) {
      this.service.deletePackage(packageId).subscribe(data => {
        alert(data.toString());
        this.refreshPackageList();
      });
    }
  }

  viewPackageDetails(packageId: number, packageObj: any): void {
    this.router.navigate(['/package-details', packageId], { state: { data: packageObj } });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.PackageList = [...this.OriginalPackageList]; // Reset PackageList to original list when search query is empty
    } else {
      this.PackageList = this.OriginalPackageList.filter((pkg: any) => pkg.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }

  filterPackges(): void {
    this.customPackages = [];
    this.GeneralPackageList = [];
    this.userID = parseInt(localStorage.getItem('userId') || '0', 10);
    console.log(this.userID);
    if (this.userID !== 0) {
      for (let i = 0; i < this.PackageList.length; i++) {
        console.log(this.PackageList[i].created_by);
        if (this.PackageList[i].created_by === this.userID) {
          if (!this.customPackages.includes(this.PackageList[i])) {
            this.customPackages.push(this.PackageList[i]);
          }
        } else {
          if (this.PackageList[i].created_by === 0) {
            if (!this.GeneralPackageList.includes(this.PackageList[i])) {
              this.GeneralPackageList.push(this.PackageList[i]);
            }
          }
      }
    }
    console.log(this.customPackages);
  }
  }

  refreshPackageList() {
    this.service.getPackageList().subscribe(data => {
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      this.OriginalPackageList = packageList.results; // Store original list of packages
      this.PackageList = [...this.OriginalPackageList]; // Copy original list to PackageList
      this.filterPackges();
    });
  }

  closeClick(): void {
    this.ActivateAddEditPackageComp = false;
    this.refreshPackageList();
  }
}



