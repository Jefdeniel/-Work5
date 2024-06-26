import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';

import Select from '../../ui/Select/Select';

interface ThemeSelectorProps {
  initialValue?: string;
  value?: string;
  onChange: (Theme: string) => void;
  meta?: FieldMetaState<any>;
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
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: ThemeSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Row className="full-select d-flex flex-row align-items-center gap-2">
        <Col>
          <span className="title">{t('settings:general.theme')}</span>

          <small className="description p-0">
            {t('settings:general.themeDescription')}
          </small>
        </Col>

        <Col className="d-flex flex-col justify-content-end p-0">
          <Select
            defaultValue={initialValue}
            value={value}
            onChange={handleThemeChange}
            options={translatedOptions}
            meta={meta}
            {...rest}
          />
        </Col>
      </Row>
    </>
  );
};

export default ThemeSelector;
