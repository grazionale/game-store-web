import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

import AuthState from '../../dtos/AuthState';
import User from '../../dtos/User';
import ApiData from '../../dtos/ApiData';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser);

    const apiDataCookie = Cookie.get('@api-data');
    const apiData: ApiData = apiDataCookie ? JSON.parse(apiDataCookie) : null;

    if (!loggedUser ||
      !apiData ||
      !apiData['access-token'] ||
      apiData['access-token'] === ''
    ) {
      router.push({
        pathname: '/Auth/Login',
        query: {
          callback: router.pathname
        }
      });
    }

    return <Component {...props} />;
  }

  // se o component tiver o método getServerSideProps (responsável por 
  // fazer o fetch das props e realizar o pre-render da página no server side) 
  // ele irá repassar para o component auth, para que assim as props sejam 
  // acessiveis pelo Auth e caso o usuário tenha acesso a página, essas props 
  // serão repassadas ao component
  if (Component.getServerSideProps) {
    Auth.getServerSideProps = Component.getServerSideProps;
  }

  return Auth;
}

export default withAuth;