import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify, Signer, Auth } from 'aws-amplify';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import axios from 'axios';

if (environment.production) {
  enableProdMode();
}

Amplify.configure({
  Auth: {
    identityPoolId: '',
    region: 'ap-northeast-1',
    userPoolId: '',
    userPoolWebClientId: '',
    endpoint: 'https://xxxxxx/auth/',
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: 'https://xxxxxx/api',
        region: 'ap-northeast-1',
        // custom_header: async () => {
        //   const currentUser = await Auth.currentUserInfo();
        //   if (currentUser === null) {
        //     return {};
        //   }

        //   // リクエスト情報がここで取れないので、この方法は出来なそう。
        //   const request = {
        //     method: 'GET',
        //     url: '',
        //   };
        //   const credential = await Auth.currentCredentials();
        //   const accessInfo = {
        //     access_key: credential.accessKeyId,
        //     secret_key: credential.secretAccessKey,
        //     session_token: credential.sessionToken,
        //   };
        //   const serviceInfo = {
        //     region: 'ap-northeast-1',
        //     service: 'execute-api',
        //   };

        //   const authRequest = Signer.sign(request, accessInfo, serviceInfo);
        //   delete authRequest.headers['host'];

        //   return authRequest.headers;
        // },
      },
    ],
  },
});

const orgSignFunc = Signer.sign;
Signer.sign = (request: any, access_info: any, service_info?: any) => {
  const url = request.url;

  request.url = url.replace(
    'xxxxx',
    'xxxxx'
  );

  const signedRequest = orgSignFunc(request, access_info, service_info);
  signedRequest.url = url;

  return signedRequest;
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
