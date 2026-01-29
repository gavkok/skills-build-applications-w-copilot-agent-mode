from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class BaseObjectIdSerializer(serializers.ModelSerializer):
    """
    Base serializer that ensures the primary key (ObjectId in Djongo)
    is serialized as a string, in line with project guidelines.
    """
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        # Use pk to support any custom primary key field name.
        return str(obj.pk) if obj.pk is not None else None


class UserSerializer(BaseObjectIdSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TeamSerializer(BaseObjectIdSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class ActivitySerializer(BaseObjectIdSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class LeaderboardSerializer(BaseObjectIdSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'


class WorkoutSerializer(BaseObjectIdSerializer):
    class Meta:
        model = Workout
        fields = '__all__'
