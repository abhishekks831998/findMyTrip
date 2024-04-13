import { Component, OnInit } from '@angular/core';
import { PackageService } from "../package/package.service";

interface Package {
  id: number;
  name: string;
  description: string;
  image: string;
  total_price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  travelPackages: Package[] = [];
  packageChunks: any[][] = [];
  images = [];

  constructor(private packageService: PackageService) { }

  fetchImages(): void {
    this.packageService.getPackageList().subscribe(data => {
      let packages = JSON.stringify(data);
      let packageList = JSON.parse(packages);
      this.travelPackages = packageList.results;
      this.packageChunks = this.chunkArray(this.travelPackages, 3);
    });
  }

  chunkArray(items: any[], size: number): any[][] {
    let result = [];
    for (let i = 0; i < items.length; i += size) {
      result.push(items.slice(i, i + size));
    }
    return result;
  }

  bookNow(TravelPack: Package): void {
    console.log("Booking package ", TravelPack);
  }

  ngOnInit(): void {
    this.fetchImages();
  }
}
