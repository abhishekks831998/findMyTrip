import { Component, OnInit } from '@angular/core';
import { PackageService } from "../package.service";
import { Router } from "@angular/router";

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
  package: any;
  ModelTitle: string | undefined;
  searchQuery: string = '';

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
      image: ""
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

  viewPackageDetails(packageId: string, packageObj: any): void {
    this.router.navigate(['/package-details', packageId], { state: { data: packageObj } });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.PackageList = [...this.OriginalPackageList]; // Reset PackageList to original list when search query is empty
    } else {
      this.PackageList = this.OriginalPackageList.filter((pkg: any) => pkg.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }

  refreshPackageList() {
    this.service.getPackageList().subscribe(data => {
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      this.OriginalPackageList = packageList.results; // Store original list of packages
      this.PackageList = [...this.OriginalPackageList]; // Copy original list to PackageList
    });
  }

  closeClick(): void {
    this.ActivateAddEditPackageComp = false;
  }
}



