from djongo import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    team = models.CharField(max_length=50, blank=True)

    def __str__(self):
        # Prefer username for display; fall back to name if needed
        return self.username or self.name

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.JSONField()
    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    duration = models.IntegerField()
    # Additional fields to match frontend schema
    activity_type = models.CharField(max_length=100, blank=True)
    distance = models.FloatField(default=0.0)
    calories = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return f"{self.user} - {self.activity}"

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    points = models.IntegerField()
    def __str__(self):
        return f"{self.user}: {self.points}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    workout_type = models.CharField(max_length=50, blank=True)
    difficulty_level = models.CharField(max_length=20, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    estimated_calories = models.IntegerField(null=True, blank=True)
    suggested_for = models.JSONField()
    def __str__(self):
        return self.name
