import { Inject, Injectable } from "@angular/core";
import {
  NotificationService,
  PushNotification,
} from "@unleashed-business/ts-web3-commons";
import { Observable, of, ReplaySubject } from "rxjs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IMAGE_UPLOAD_MAX_SIZE_DI_TOKEN } from "../ng-commons.const.js";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(
    public readonly notifications: NotificationService,
    @Inject(IMAGE_UPLOAD_MAX_SIZE_DI_TOKEN)
    public readonly maxImageSizeInMB: number,
  ) {}

  public convertFile(file: File): Observable<string> {
    if (typeof file === "undefined") return of("");

    if (file.size > this.maxImageSizeInMB * 1024 * 1024) {
      this.notifications.show(
        new PushNotification<IconProp>(
          "Image upload failed",
          `Image size is larger than max allowed: ${this.maxImageSizeInMB} MB!`,
          "warning",
        ),
      );
      return of("");
    }

    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // @ts-ignore
    reader.onload = (event) =>
      result.next(btoa(event.target?.result?.toString() ?? ""));
    return result;
  }
}
