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

  OriginalPackageList: Package[] = [];
  GeneralPackageList: Package[] = [];
  customPackages: Package[] = [];
  customPackageList: Package[] = [];
  package: Package = { id: 0, name: '', description: '', duration_in_days: 0, hotels: {}, flights: {}, activities: {}, image: '', created_by: 0 };
  ModelTitle?: string;
  searchQuery = '';
  userID = 0;
  PackageList: Package[] = [];
  showErrorModal = false;
  message = '';

  constructor(private service: PackageService, private router: Router) {}

  ActivateAddEditPackageComp: boolean = false;
  isUserStaff: boolean = false;

  ngOnInit(): void {
    this.refreshPackageList();
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserStaff = localStorage.getItem('isStaff') === 'true';
    }
  }

  addClick(): void {
    this.ModelTitle = "Add Package";
    this.ActivateAddEditPackageComp = true;
  }

  editPackage(data: Package): void {
    this.package = {...data};
    this.ModelTitle = "Edit Package";
    this.ActivateAddEditPackageComp = true;
  }

  bookPackage(packageId: number): void {
    this.service.getPackage(packageId).subscribe(data => {
      this.router.navigate(['/book-package'], { queryParams: { packageInfo: JSON.stringify(data) } })
    });
  }

  deletePackage(packageId: number): void {
    if (confirm('Are you sure?')) {
      this.service.deletePackage(packageId).subscribe({
        next: (response) => {
          this.message = 'Package deleted successfully';
          this.showErrorModal = true;
          this.refreshPackageList();
        },
        error: (err) => {
          this.message = 'Error deleting package';
          this.showErrorModal = true;
        }
      });
    }
  }
  closeModal(): void {
    this.showErrorModal = false;
    this.refreshPackageList();
  }

  viewPackageDetails(packageId: number, packageObj: Package): void {
    this.router.navigate(['/package-details', packageId], { state: { data: packageObj } });
  }
  

  onSearch(): void {
    if(this.searchQuery.trim()===""){
      this.GeneralPackageList = this.PackageList
      this.customPackages = this.customPackageList
    }
    else{
      this.GeneralPackageList = this.PackageList.filter((pkg: any) => pkg.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.customPackages= this.customPackageList.filter((pkg: any) => pkg.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }

  filterPackages(): void {
    this.PackageList = this.OriginalPackageList;
    this.customPackages = [];
    this.GeneralPackageList = [];
    this.userID = parseInt(localStorage.getItem('userId') || '0', 10);
    console.log(this.userID);
    if (!this.isUserStaff) {
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
  }
    else {
      for (let i = 0; i < this.PackageList.length; i++) {
        if (this.PackageList[i].created_by === 0) {
          if (!this.GeneralPackageList.includes(this.PackageList[i])) {
            this.GeneralPackageList.push(this.PackageList[i]);
          }
          
        }
        else{
          this.customPackages.push(this.PackageList[i]);
        }
      }
    }
    this.customPackageList = [...this.customPackages]
    this.PackageList = [...this.GeneralPackageList]
  }

  refreshPackageList(): void {
    this.service.getPackageList().subscribe({
      next: (data) => {
        let packages = JSON.stringify(data);
        let packageList = JSON.parse(packages);
        this.OriginalPackageList = packageList.results;
        this.filterPackages();
      },
      error: (err) => {
        this.message = 'Error retrieving package list';
        this.showErrorModal = true;
      }
    });
  }

  closeClick(): void {
    this.ActivateAddEditPackageComp = false;
    this.refreshPackageList();
  }
}
