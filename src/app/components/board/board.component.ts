import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { gql } from 'graphql-tag';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public items: any;
  private queryBlogPosts: Subscription;
  constructor(private apollo : Apollo) { 
    this.queryBlogPosts = this.apollo.watchQuery({
      query: gql`
        query BlogPosts {
          blogPosts {
          data {
            id 
            attributes {
              Content
              Highlight {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
      `
    })
    .valueChanges.subscribe(result => {
        this.items = result.data;
        console.log(result);
      })
  }
  ngOnInit() {
  }
}
