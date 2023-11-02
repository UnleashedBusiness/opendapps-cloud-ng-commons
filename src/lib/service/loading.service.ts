import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  public loadingFlag = false;
  public redirectingFlag = false;
}
