import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {RepoService} from '../../services/repo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  // @ViewChild('iframe', {}) ele: ElementRef;
  // @ViewChild('aboutContainer', {read: ElementRef}) contr: ElementRef;

  filenamepath: SafeResourceUrl = '';
  @ViewChild('content_container', {read: ElementRef}) ele: ElementRef | undefined;
  html: SafeHtml = '<span [class]="page-heading">argument</span>';

  constructor(
    private repo: RepoService,
    private ds: DomSanitizer,
    private http: HttpClient,
    private rnd: Renderer2,
    private acr: ActivatedRoute) {


  }

  ngOnInit(): void {

    this.repo.getHtmlContent('about')
      .subscribe(a => {
        const file = a[0].get('file').url();
        const hdr = new HttpHeaders({})
          .set('Content-Type', 'text/html; charset=UTF-8');
        this.http.get(file, {headers: hdr, responseType: 'text'})
          .subscribe(rs => {
            const begin = rs.indexOf('<body>') + 7;
            const end = rs.indexOf('</body>');
            const html = rs.substring(begin, end);
            // this.html = this.ds.bypassSecurityTrustHtml(html);
//            console.log('html', html);
            const tx: HTMLSpanElement = this.rnd.createElement('div');
            this.rnd.setProperty(tx, 'innerHTML', html);
            // @ts-ignore
            this.rnd.appendChild(this.ele.nativeElement, tx);
          });
      });
  }
}
