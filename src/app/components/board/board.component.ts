import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { gql } from 'graphql-tag';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public items: any;
  private queryBlogPosts: Subscription;
  public content: Array<SafeHtml> = [];
  constructor(private apollo : Apollo, private sanitizer: DomSanitizer) { 
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
        this.content = this.items.blogPosts.data.map(v => {
          return this.sanitizer.bypassSecurityTrustHtml(v.attributes.Content);
        })
      })
  }
  ngOnInit() {
  }
}
