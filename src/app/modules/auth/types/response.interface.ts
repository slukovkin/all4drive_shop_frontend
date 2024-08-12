import {HttpStatusCode} from "@angular/common/http";

export interface ResponseInterface {
  status: HttpStatusCode,
  message: string,
}
