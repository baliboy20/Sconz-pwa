import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {InformationPages} from '../../../assets/constants/constants';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {RepoService} from '../../services/repo.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  filenamepath: SafeResourceUrl = '';
  @ViewChild('iframe', {read: ElementRef}) ele: ElementRef | undefined;
  html: SafeHtml = '';
  constructor(
    private repo: RepoService,
    private ds: DomSanitizer,
    private http: HttpClient,
    private acr: ActivatedRoute) {



  }

  ngOnInit(): void {

    const page = this.acr.snapshot.data.htmlpage;
    const filepath = environment.informationPagesPath + '/' + page;
    const hdr = new HttpHeaders({})
      .set('Content-Type', 'text/html; charset=UTF-8');
    this.http.get(filepath, { headers: hdr, responseType: 'text'})
      .subscribe(rs => {
        const begin  = rs.indexOf('<body>');
        const end  = rs.indexOf('</body>');
        const html = rs.substring(begin, end);
        this.html = this.ds.bypassSecurityTrustHtml(html);
      }, console.log);
  }


}
