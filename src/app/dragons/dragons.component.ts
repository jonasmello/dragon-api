import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrls: ['./dragons.component.scss']
})
export class DragonsComponent implements OnInit {

  private dragons = [];
  private requestUrl = 'https://dragons-api.herokuapp.com/api/dragons/';

  constructor(private user: UserService, private http: HttpClient) { }


  deleteDragon(slug) {
    this.http.delete(this.requestUrl + slug)
    .subscribe(
      (result) => {
        this.dragons = this.dragons.filter((item) => item.slug != slug);

      }
    );
  }


  fetchData = function (page = 0, items = []) {
    this.http.get(this.requestUrl + "?page=" + page)
    .subscribe(
      (result) => {
        items.push(...result.items.filter((item) => item.slug));

        if (page < Math.floor(result._metadata.total_count / result._metadata.per_page)) {
          this.fetchData(page + 1, items);
        } else {
          this.dragons = items
            .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
        }
      }
    );
  }


  ngOnInit() {
    this.fetchData();
  }

}
