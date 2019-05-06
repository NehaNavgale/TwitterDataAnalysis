import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  private response: Object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byCharacter').
    subscribe(respDataCondition => {
      this.response = respDataCondition;
      console.log(this.response);
    }, error => {});
  }
}
