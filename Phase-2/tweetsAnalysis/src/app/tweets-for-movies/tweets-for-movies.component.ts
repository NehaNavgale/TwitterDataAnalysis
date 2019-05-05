import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-tweets-for-movies',
  templateUrl: './tweets-for-movies.component.html',
  styleUrls: ['./tweets-for-movies.component.css']
})
export class TweetsForMoviesComponent implements OnInit {
  private tweets: any;
  public filterData: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byMovie').
    subscribe((respDataCondition: []) => {
      this.tweets = respDataCondition;
     /* const result: string[] = [];
      Object.keys(this.tweets).forEach(key =>
      // this.tweets = respDataCondition[key].NumberOfTweets,
          result.push(this.tweets),
      );*/
});
}
}
