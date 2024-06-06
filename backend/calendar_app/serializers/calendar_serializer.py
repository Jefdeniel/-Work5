from rest_framework import serializers
from ..models import Calendar, CalendarUser, TimeBlock
from .category_serializer import CategorySerializer
from .timeblock_serializer import TimeBlockSerializer


class CalendarSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=255, required=True, help_text="Title of the calendar"
    )
    description = serializers.CharField(
        max_length=255, required=False, help_text="Description of the calendar"
    )
    img = serializers.ImageField(
        required=False,
        help_text="Image associated with the calendar (binary)",
    )
    owner_id = serializers.IntegerField(
        required=True, help_text="ID of the user who owns the calendar"
    )
    date_start = serializers.DateTimeField(
        allow_null=True,
        help_text="Start date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    date_stop = serializers.DateTimeField(
        allow_null=True,
        help_text="End date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )

    categories = CategorySerializer(many=True, read_only=True)
    timeblocks = TimeBlockSerializer(many=True, read_only=True)

    created_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was created"
    )
    updated_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was last updated"
    )

    class Meta:
        model = Calendar
        fields = (
            "id",
            "title",
            "description",
            "img",
            "owner_id",
            "date_start",
            "date_stop",
            "categories",
            "timeblocks",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )


class CalendarUserSerializer(serializers.ModelSerializer):
    calendar = CalendarSerializer(read_only=True)

    class Meta:
        model = CalendarUser
        fields = ["id", "user", "calendar", "role", "created_at"]
        read_only_fields = ["id", "created_at"]


class TimeBlockSerializer(serializers.ModelSerializer):
    calendar = CalendarSerializer(read_only=True)

    class Meta:
        model = TimeBlock
        fields = ["id", "calendar", "start_time", "end_time", "created_at"]
        read_only_fields = ["id", "created_at"]
