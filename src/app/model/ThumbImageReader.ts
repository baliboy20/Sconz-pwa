import {environment} from "../../environments/environment.prod";


export interface ThumbImage {
  url: string;
}

export type ImageFileType = { url: string, name: string, __File: string };

export class ThumbImageReader implements ThumbImage {
  get url(): string {
    return this._url;
  }

  constructor(public _url: string) {
  }

  static createEmpty(): ThumbImageReader {
    return new ThumbImageReader(environment.noImageUrl);
  }

  static createFromInst(a: ImageFileType | ThumbImageReader): ThumbImageReader {
    return new ThumbImageReader(a.url);
  }

  static createFromUrl(a: string) {
    return new ThumbImageReader(a);
  }

}
