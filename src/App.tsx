import React, { FC, ReactNode, useCallback, useState } from 'react';

import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/AutoComplete';
import Button from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Transition from './components/Transition/Transition';

const lakers = [
  'bradley',
  'pope',
  'caruso',
  'cook',
  'cousins',
  'james',
  'AD',
  'green',
  'howard',
  'kuzma',
  'McGee',
  'Rando',
];
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
export interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  // const fetchSuggestions = useCallback((query: string) => {
  //   return lakers
  //     .filter((name) => name.includes(query))
  //     .map((name) => {
  //       return { value: name };
  //     });
  // }, []);
  const fetchSuggestions = useCallback(async (query: string) => {
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const { items } = await res.json();
      console.log('items: ', items);
      return items
        .slice(0, 10)
        .map((item: { login: any }) => ({ value: item.login, ...item }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderOption = useCallback((item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <div>
        <img width={32} height={32} src={itemWithGithub.avatar_url} />
        <br />
        <span>{itemWithGithub.login}</span>
        <br />
        <span>{itemWithGithub.url}</span>
        <hr />
      </div>
    );
  }, []);
  return (
    <div className="App">
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={(item): void => {
          console.log('item: ', item.value);
        }}
        renderOption={renderOption}
      />
    </div>
  );
};

export default App;
