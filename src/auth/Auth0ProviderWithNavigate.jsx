// import { AppState, Auth0Provider } from "@auth0/auth0-react";
// // import { useNavigate } from "react-router-dom";

// type Props = {
//     children: React.ReactNode;
// }

// const Auth0ProviderWithNavigate = ({children}: props) => {
//     const domain = import.meta.env.VITE_AUTH0_DOMAIN;
//     const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
//     const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

//     if(!domain || !clientId || redirectUri){
//         throw new Error("unable to initialize auth");
//     }

//     const onRedirectCallback = (appState?: AppState) => {
//         //navigate(appState?.returnTo || "/auth-callback");
//         console.log("USER",user);
        
//     };

//     return (
//         <Auth0Provider
//           domain={domain}
//           clientId={clientId}
//           authorizationParams={{
//             redirect_uri: redirectUri,
//           }}
//           onRedirectCallback={onRedirectCallback}
//         >
//             {children}
//         </Auth0Provider>
//     )
// }



// import React from 'react';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { useCreateMyUser } from '../api/MyUserApi';

// const Auth0ProviderWithNavigate = ({ children }) => {
//     const { createUser } = useCreateMyUser();
//     const domain = import.meta.env.VITE_AUTH0_DOMAIN;
//     const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
//     const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

//     if (!domain || !clientId || !redirectUri) {
//         throw new Error("unable to initialize auth");
//     }

//     const onRedirectCallback = (appState?: AppState, user?: User) => {
//         // navigate(appState?.returnTo || "/auth-callback");
//         // console.log("USER", user);
//         if(user?.sub && user?.email){
//             createUser({ auth0Id: user.sub, email: user.email});
//         }
//     };

//     return (
//         <Auth0Provider
//             domain={domain}
//             clientId={clientId}
//             authorizationParams={{
//                 redirect_uri: redirectUri,
//             }}
//             onRedirectCallback={onRedirectCallback}
//         >
//             {children}
//         </Auth0Provider>
//     );
// };

// export default Auth0ProviderWithNavigate;

// import React from 'react';
// import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// import { useCreateMyUser } from '../api/MyUserApi';
// //import { useNavigate } from 'react-router-dom';

// const Auth0ProviderWithNavigate = ({ children }) => {
//     const { createUser } = useCreateMyUser();
//     //const navigate = useNavigate();
//     const domain = import.meta.env.VITE_AUTH0_DOMAIN;
//     const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
//     const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

//     if (!domain || !clientId || !redirectUri) {
//         throw new Error("Unable to initialize Auth0");
//     }

//     const onRedirectCallback = async (appState) => {
//         const { user } = useAuth0();

//         if (user?.sub && user?.email) {
//             await createUser({ auth0Id: user.sub, email: user.email });
//         }

//         //navigate(appState?.returnTo || "/auth-callback");
//     };

//     return (
//         <Auth0Provider
//             domain={domain}
//             clientId={clientId}
//             authorizationParams={{
//                 redirect_uri: redirectUri,
//             }}
//             onRedirectCallback={onRedirectCallback}
//         >
//             {children}
//         </Auth0Provider>
//     );
// };

// export default Auth0ProviderWithNavigate;

import React, { useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useCreateMyUser } from '../api/MyUserApi';
//import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithNavigate = ({ children }) => {
  const { createUser } = useCreateMyUser();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE 

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error('Unable to initialize Auth0');
  }

  console.log(redirectUri);

  const onRedirectCallback = (appState) => {
    // navigate(appState?.returnTo || "/auth-callback");
    // Handle navigation here if needed
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthWrapper createUser={createUser}>
        {children}
      </AuthWrapper>
    </Auth0Provider>
  );
};

const AuthWrapper = ({ createUser, children }) => {
  const { user, isAuthenticated } = useAuth0();
  //const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      createUser({ auth0Id: user.sub, email: user.email });
    //  navigate('/auth-callback');
    }
  }, [isAuthenticated, user, createUser]);

  return <>{children}</>;
};

export default Auth0ProviderWithNavigate;


// import React from 'react';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';

// const Auth0ProviderWithNavigate = ({ children }) => {
//   const navigate = useNavigate();

//   const domain = import.meta.env.VITE_AUTH0_DOMAIN;
//   const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
//   const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
//   const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

//   if (!domain || !clientId || !redirectUri || !audience) {
//     throw new Error('Unable to initialize auth');
//   }

//   const onRedirectCallback = (appState) => {
//     navigate(appState?.returnTo || '/auth-callback');
//   };

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: redirectUri,
//         audience,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithNavigate;





