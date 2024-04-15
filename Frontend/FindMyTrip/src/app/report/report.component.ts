import { Component, AfterViewInit } from '@angular/core';
import { ReportService } from './report.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements AfterViewInit {
  constructor(private reportService: ReportService) { }

  ngAfterViewInit(): void {    
    this.reportService.getData().subscribe(data => {
      
      var booking_chart_label = data.bookings_per_month.map((d:any) => d['month']);
      var booking_chart_values = data.bookings_per_month.map((d:any) => d['num_bookings']);

      var user_chart_label = Object.keys(data.user_data);
      var user_chart_values = Object.values(data.user_data);

      var package_chart_label = Object.keys(data.package_data);
      var package_chart_values = Object.values(data.package_data);

      

      new Chart(document.getElementById('bookingChart') as HTMLCanvasElement, {
        type: 'bar',
        data: {
          labels: booking_chart_label,
          datasets: [{
            label: '# of Bookings',
            data: booking_chart_values,
            borderWidth: 1}]},
          options: {
            plugins: {
              title: {
                  display: true,
                  text: 'Bookings Information'
              }
          }
        }
      });

    new Chart(document.getElementById('userChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: user_chart_label,
        datasets: [{
          label: '# of Users',
          data: user_chart_values,
          }]
        },
        options: {
          aspectRatio:2.5,
          plugins: {
            title: {
                display: true,
                text: 'Users Information'
            }
        }
        }
  });

  new Chart(document.getElementById('packageChart') as HTMLCanvasElement, {
    type: 'pie',
    data: {
      labels: package_chart_label,
      datasets: [{
        label: '# of Packages',
        data: package_chart_values,
        borderWidth: 1}]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
              display: true,
              text: 'Packages Information'
          }
      }
      }
});
  });
}
}


