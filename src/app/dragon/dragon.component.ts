import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit {

  eForm: FormGroup;
  dragon = {
  };
  isForm: boolean;
  action: string;
  name: string = '';
  type: string = '';
  slug: string = '';
  titleAlert: string = 'This field is required';

  private requestUrl = "https://dragons-api.herokuapp.com/api/dragons/";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder) {

    this.eForm = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      slug: [null, Validators.nullValidator]
    });

  }

  submitForm(post) {
    let method = post.slug ? 'put' : 'post';
    this.http[method](this.requestUrl + (post.slug ? post.slug : ''), {
      name: post.name,
      type: post.type
    })
    .subscribe(
      (result) => {
        return this.router.navigate(['/dragons']);
      }
    );

  }

  getDataDragon = function (slug) {
    if (!slug) {
      return this.router.navigate(['/dragons']);
    }
    this.http.get(this.requestUrl + slug)
    .subscribe(
      (result) => {
        this.dragon = result;

        this.eForm = this.fb.group({
          name: [this.dragon.name, Validators.required],
          type: [this.dragon.type, Validators.required],
          slug: [this.dragon.slug, Validators.nullValidator]
        });

        this.isForm = (this.action == 'edit');

      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.action = params['action'];
      this.isForm = (this.slug == 'new') || this.getDataDragon(this.slug);
    });
  }

}
