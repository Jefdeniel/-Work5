import { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import ActivityNotificationSelector from '../../components/settings/notifications/ActivityNotificationsSelector';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';

import useSetTitle from '../../hooks/setTitle';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { SettingsContext } from '../../store/SettingsContext';
import Validators from '../../utils/Validators';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:generalTitle'));
  const {
    language,
    setLanguage,
    time_zone,
    setTimezone,
    time_format,
    setTimeFormat,
    theme,
    setTheme,
    week_start_day,
    setWeekStartsOn,
    weekend_visibility,
    setWeekendVisibility,
    event_reminder,
    setEventReminderEnabled,
    activity_notifications,
    setActivityNotificationEnabled,
  } = useContext(SettingsContext);

  const { user_id } = useAuth();
  const { fetchData: updateDeviceSettings, loading: isLoading } = useFetch(
    'PUT',
    ['user_settings', user_id ? user_id.toString() : '']
  );

  const handleSaveSettings = async (values) => {
    try {
      const response = await updateDeviceSettings(
        {},
        {
          user: user_id,
          language: values.language,
          time_zone: values.time_zone,
          time_format: values.time_format,
          theme: values.theme,
          event_reminder: values.event_reminder,
          activity_notifications: values.activity_notifications,
          week_start_day: values.week_start_day,
          weekend_visibility: values.weekend_visibility,
        }
      );

      if (response.ok) {
        setLanguage(values.language);
        setTimezone(values.time_zone);
        setTimeFormat(values.time_format);
        setTheme(values.theme);
        setWeekStartsOn(values.week_start_day);
        setWeekendVisibility(values.weekend_visibility);
        setEventReminderEnabled(values.event_reminder);
        setActivityNotificationEnabled(values.activity_notifications);

        toast.success(t('settings:saved'));
      } else {
        toast.error(t('settings:failed'));
        throw new Error('Failed to save settings' + response.statusText);
      }
    } catch (error) {
      toast.error(t('settings:failed'));
      console.error(error);
    }
  };

  return (
    <div className={`settings-page-content`}>
      <Heading level={1} className="heading--lg clr-primary mb-base" />

      <Form
        onSubmit={handleSaveSettings}
        initialValues={{
          language,
          time_zone,
          time_format,
          theme,
          week_start_day,
          weekend_visibility,
          event_reminder,
          activity_notifications,
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="settings-form p-0">
            <div className="settings-block">
              <Heading className={`heading--md`} level={2} isUnderlined>
                {t('settings:general.title')}
              </Heading>

              <Field name="language" validate={Validators.compose()}>
                {({ input, meta }) => (
                  <LanguageSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>

              <Field name="time_zone" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeZoneSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>

              <Field name="time_format" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeFormatSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>

              <Field name="theme" validate={Validators.required()}>
                {({ input, meta }) => (
                  <ThemeSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </div>

            <div className="settings-block">
              <Heading className={`heading--md`} level={2} isUnderlined>
                {t('settings:notifications.title')}
              </Heading>

              <Field name="event_reminder" type="checkbox">
                {({ input }) => (
                  <EventReminderSelector>
                    <div className="form-check switch d-flex align-items-center">
                      <label className="switch-label">
                        <input
                          id="switch"
                          type="checkbox"
                          className="form-check-input"
                          {...input}
                        />
                        <div className="switch-slider"></div>
                      </label>
                    </div>
                  </EventReminderSelector>
                )}
              </Field>

              <Field name="activity_notifications" type="checkbox">
                {({ input }) => (
                  <ActivityNotificationSelector>
                    <div className="form-check switch d-flex align-items-center">
                      <label className="switch-label">
                        <input
                          id="switch"
                          type="checkbox"
                          className="form-check-input"
                          {...input}
                        />
                        <div className="switch-slider"></div>
                      </label>
                    </div>
                  </ActivityNotificationSelector>
                )}
              </Field>
            </div>

            <div className="settings-block p-0">
              <Heading className={`heading--md`} level={2} isUnderlined>
                {t('settings:calendarView.title')}
              </Heading>

              <Field name="week_start_day" validate={Validators.required()}>
                {({ input, meta }) => (
                  <WeekStartsOnSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>

              <Field name="weekend_visibility">
                {({ input, meta }) => (
                  <WeekendVisbilityOnSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </div>

            <div className="pad-right-neg mt-4 mb-5 d-flex justify-content-end">
              <Button
                className="btn--success"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              >
                {t('settings:save')}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default SettingsPage;
