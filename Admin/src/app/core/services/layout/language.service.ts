import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor(
    public translate: TranslateService,
    private cookieService: CookieService
  ) {
    let browserLang = 'en';
    this.translate.addLangs(this.languages);
    if (this.cookieService.check('lang')) {
      browserLang = this.cookieService.get('lang');
    } else {
      this.setLanguage('en');
      browserLang = translate.getBrowserLang() ?? '';
    }
    translate.use(browserLang.match(/en|es|de|it|ru/) ? browserLang : 'en');
  }

  public setLanguage(lang: string) {
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
  }
}
