import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFetch from '../../../hooks/useFetch';
import { Row } from 'react-bootstrap';
import { Form } from 'react-final-form';

import { Calendar } from '../../../@types/Calendar';

import useAuth from '../../../hooks/useAuth';
import Button from '../../ui/Button/Button';

import './Input.scss';

interface Props {
  calendar: Calendar;
}

// TODO: Add translations
const LabelColorInput = ({ calendar }: Props) => {
  const { t } = useTranslation(['calendar']);
  const calendarId = calendar.id;
  const [categories, setCategories] = useState(calendar.categories);

  const { fetchData: updateCategoryColors } = useFetch('PATCH', [`categories`]);

  const handleEditLabels = async (values: any) => {
    const updatedCategories = categories?.map((category) => ({
      ...category,
      color_code: values.color_code,
    }));

    try {
      const response = await updateCategoryColors({
        categories: updatedCategories,
      });

      if (response.ok) {
        console.log('Update successful');
        setCategories(updatedCategories);
      } else {
        console.error('Update failed', response.statusText);
      }
    } catch (error) {
      console.error('Error updating categories', error);
    }
  };

  console.log('calendar', calendar);

  return (
    <Row className={`label-color-inputs`}>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.event-labels.title')}
        </span>

        <p className={`w-75`}>
          {t('calendar:calendar-customize.event-labels.description')}
        </p>
      </div>

      <Form
        onSubmit={handleEditLabels}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ul className={`input-list`}>
              {calendar?.categories?.map((category) => (
                <li key={category.id} className={`input-item`}>
                  <label>
                    <input
                      className={`input`}
                      type="color"
                      name="color-label"
                      defaultValue={category.color_code}
                    />

                    <span>{category.title}</span>
                  </label>
                </li>
              ))}
            </ul>

            <Button className="btn--success mt-2" type="submit">
              {t('calendar:calendar-customize.event-labels.save')}
            </Button>
          </form>
        )}
      />
    </Row>
  );
};

export default LabelColorInput;
