import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nonAuthData: string = '';
  nonAuthData2: string = '';
  authedData: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    API.get('api', '/', '').then((data) => {
      this.nonAuthData = JSON.stringify(data);
    });
    API.get('api', '/nonauth', '').then((data) => {
      this.nonAuthData2 = JSON.stringify(data);
    });
    API.get('api', '/authed', '').then((data) => {
      this.authedData = JSON.stringify(data);
    });
  }

  async fetchAuthedData() {
    API.get('api', '/authed', '').then((data) => {
      this.authedData = JSON.stringify(data);
    });
  }
}
