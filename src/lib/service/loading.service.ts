import {Injectable} from "@angular/core";

@Injectable()
export class LoadingService {
  public loadingFlag = false;
  public redirectingFlag = false;
}
