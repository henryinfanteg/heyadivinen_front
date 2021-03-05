import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { ServiceConstants } from '../_service-util/service-constants';
import { RequestUtil } from '../../../shared/util/request-util';

export class HeadersUtil {

    static location = null;

    static getHeadersBasic(apiName: string) {

        let headers = new HttpHeaders()
            .append(ServiceConstants.APP_ID, environment.APP_ID)
            .append(ServiceConstants.REQUEST_ID, RequestUtil.generateRequestId(apiName));
        return headers;
    }

    static getHeadersUnknownUser(apiName: string) {
        let headers = this.getHeadersBasic(apiName);
        headers = headers.append(ServiceConstants.AUTHORIZATION, environment.tokenApiUnknownUser);
        return headers;
    }
}


