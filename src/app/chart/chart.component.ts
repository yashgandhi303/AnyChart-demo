import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoDataProviderService } from '../demo-data-provider.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  subscription: Subscription;

  constructor(private dataService_: DemoDataProviderService) {
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Gantt = null;

  ngOnInit() {
    this.subscription = this.dataService_.getUsers().subscribe((data: Object[]) => {
      var treeData = anychart.data.tree(data, 'as-table');
      this.chart = anychart.ganttResource();
      this.chart.data(treeData);
      this.chart.splitterPosition(320);
      var dataGrid = this.chart.dataGrid();
      dataGrid.column(0).enabled(false);
      var timeLine = this.chart.getTimeline();

      timeLine.elements().fill(() => {
        // get status from data item
        var status = this.radnomValue();

        // create fill object
        let fill = {
          // if this element has children, then add opacity to it
          opacity: treeData.numChildren() ? 1 : 0.6,
          color: '#fff'
        };

        // set fill color by status
        switch (status) {
          case 'online':
            fill.color = 'green';
            break;
          case 'maintenance':
            fill.color = 'orange';
            break;
          case 'offline':
            fill.color = 'blue';
            break;
        }

        return fill
      });
      // set base stroke
      timeLine.elements().stroke('none');
      // set select fill
      timeLine.elements().selected().fill('#ef6c00');

      // set first column settings
      var firstColumn = dataGrid.column(1);
      firstColumn.labels().hAlign('left');
      firstColumn.title('Server')
        .width(140)
        .labelsOverrider(this.labelTextSettingsOverrider)
        .labels()
        .format(function () {
          return this.name;
        });

      // set first column settings
      var secondColumn = dataGrid.column(2);
      secondColumn.labels().hAlign('right');
      secondColumn.title('Online')
        .width(60)
        .labelsOverrider(this.labelTextSettingsOverrider)
        .labels()
        .format(function () {
          return this.item.get('online') || '';
        });

      // set first column settings
      var thirdColumn = dataGrid.column(3);
      thirdColumn.labels().hAlign('right');
      thirdColumn.title('Maintenance')
        .width(60)
        .labelsOverrider(this.labelTextSettingsOverrider)
        .labels()
        .format(function () {
          return this.item.get('maintenance') || '';
        });

      // set first column settings
      var fourthColumn = dataGrid.column(4);
      fourthColumn.labels().hAlign('right');
      fourthColumn.title('Offline')
        .width(60)
        .labelsOverrider(this.labelTextSettingsOverrider)
        .labels()
        .format(function () {
          return this.item.get('offline') || '';
        });

      // set container id for the chart
      this.chart.container('container');

      // initiate chart drawing
      this.chart.draw();
      this.chart.defaultRowHeight(80);

      // zoom chart to specified date
      this.chart.zoomTo(Date.UTC(2008, 0, 31, 1, 36), Date.UTC(2008, 1, 15, 10, 3));
    });

  }

  radnomValue() {
    var myArray = ['online', 'offline', 'maintenance'];
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  labelTextSettingsOverrider(label, item) {
    switch (item.get('status')) {
      case 'online':
        label.fontColor('green')
          .fontWeight('bold');
        break;
      case 'maintenance':
        label.fontColor('orange')
          .fontWeight('bold');
        break;
      case 'offline':
        label.fontColor('red')
          .fontWeight('bold');
        break;
    }
  }
}
