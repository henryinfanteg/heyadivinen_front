import { HttpParams } from '@angular/common/http';

export class ParamsUtil {

    static mapToHttpParams(params: Map<string, any>) {
        let httpParams = new HttpParams();

        if (params) {
            params.forEach((value, key) => {
                // console.log(`key: ${key}, value: ${value}`);
                httpParams = httpParams.append(key, value);
            });
        }
        return httpParams;
    }

}


