import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/', '/_error'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);
    updateAtoms();

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', handleRouteChange);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [authCheck, handleRouteChange, router.events, router.pathname, updateAtoms]);

  async function updateAtoms() {
    if (isAuthenticated()) {
      const fetchedFavourites = await getFavourites();
      const fetchedHistory = await getHistory();
      setFavourites(fetchedFavourites);
      setSearchHistory(fetchedHistory);
    }
  }

  function handleRouteChange(url) {
    authCheck(url);
  }

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>
}