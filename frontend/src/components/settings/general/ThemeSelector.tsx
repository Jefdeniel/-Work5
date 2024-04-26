import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface ThemeSelectorProps {
  initialDisplay?: string;
  value?: string;
  onChange: (Theme: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:general.light',
    value: 'light',
  },
  {
    title: 'settings:general.dark',
    value: 'dark',
  },
];

const ThemeSelector = ({
  initialDisplay,
  value,
  onChange,
  meta,
  ...rest
}: ThemeSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  return (
    <Select
      title={t('settings:general.theme')}
      description={t('settings:general.themeDescription')}
      defaultValue={initialDisplay}
      onChange={handleThemeChange}
      options={translatedOptions.map((option) => ({
        ...option,
        value: option.value.toString(),
      }))}
      meta={meta}
      {...rest}
    />
  );
};

export default ThemeSelector;