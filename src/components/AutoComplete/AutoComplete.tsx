import React, {
  ChangeEvent,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useDebounce } from '../../hooks/useDebounce';
import Icon from '../Icon/Icon';
import Input, { InputProps } from '../Input/Input';

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [inputValue, setInputValue] = useState(value as string);
  const debouncedValue = useDebounce(inputValue, 500);
  useEffect(() => {
    if (debouncedValue) {
      const result = fetchSuggestions(debouncedValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue, fetchSuggestions]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  }, []);

  const handleSelect = useCallback(
    (item: DataSourceType) => {
      setInputValue(item.value);
      onSelect && onSelect(item);
    },
    [onSelect]
  );

  const renderTemplate = useCallback(
    (item: DataSourceType) => {
      return renderOption ? renderOption(item) : item.value;
    },
    [renderOption]
  );

  const generateDropdown = useCallback(() => {
    return (
      <ul className="viking-suggestion-list">
        {loading && <Icon icon="spinner" spin />}
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  }, [handleSelect, loading, renderTemplate, suggestions]);
  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {generateDropdown()}
    </div>
  );
};

export default memo(AutoComplete);
