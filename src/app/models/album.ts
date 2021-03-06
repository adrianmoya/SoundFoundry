import { Artist } from "app/models/artist";
import { Image } from "app/models/image";
import { Serializable } from "app/models/serializable";

export class Album implements Serializable<Album> {
  album_type: string;
  artist: Artist;
  available_markets: string[];
  external_urls: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;

  deserialize(input) {
    if (input) {
      this.album_type = input.album_type;
      this.artist = input.artist;
      this.available_markets = input.available_markets;
      this.external_urls = input.external_urls;
      this.href = input.href;
      this.id = input.id;
      this.images = input.images.map(value => new Image().deserialize(value)).sort((image1, image2) =>  image1.width - image2.width);
      this.name = input.name;
      this.type = input.type;
      this.uri = input.uri;
    }
    return this;
  }

  public getSmallestImage(): Image {
    return this.images.length > 0 ? this.images[0] : null;
  }

  public getMediumImage(): Image {
    return this.images.length > 0 ?this.images[Math.floor(this.images.length/2)] : null;
  }

  public getBiggerImage(): Image {
    return this.images.length > 0 ? this.images[this.images.length-1] : null;
  }
}
