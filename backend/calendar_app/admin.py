from django.contrib import admin
from .models import (
    User,
    CalendarUser,
    Event,
    Reminder,
    Calendar,
    UserSettings,
    Label,
    Notification,
)


class CalendarAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "img", "date_start", "date_stop")

    def display_events(self, obj):
        return ", ".join([event.title for event in obj.events.all()])

    display_events.short_description = "Events"


class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "start_time",
        "end_time",
        "creator",
        "created_at",
        "updated_at",
        "calendar",
    )


class ReminderAdmin(admin.ModelAdmin):
    list_display = (
        "event",
        "time",
        "user",
        "created_at",
        "updated_at",
    )


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "firstname",
        "lastname",
        "email",
        "password",
        "birthday",
        "avatar",
    )


class CalendarUserAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "agenda",
        "created_at",
    )


class LabelAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "color_code",
    )


class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date_start",
        "date_stop",
    )


class UserSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "language",
        "time_zone",
        "time_format",
        "theme",
        "event_reminder",
        "activity_notifications",
        "week_start_day",
        "weekend_visibility",
    )


admin.site.register(User, UserAdmin)
admin.site.register(Calendar, CalendarAdmin)
admin.site.register(CalendarUser, CalendarUserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Reminder, ReminderAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(UserSettings, UserSettingsAdmin)
admin.site.register(Notification, NotificationAdmin)
