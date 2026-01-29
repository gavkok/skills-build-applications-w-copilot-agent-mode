from django.core.management.base import BaseCommand
from django.conf import settings

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client['octofit_db']

        # Drop collections if they exist
        db.octofit_tracker_user.drop()
        db.octofit_tracker_team.drop()
        db.octofit_tracker_activity.drop()
        db.octofit_tracker_leaderboard.drop()
        db.octofit_tracker_workout.drop()

        # Create unique index on email for users
        db.octofit_tracker_user.create_index([('email', 1)], unique=True)

        # Sample data
        users = [
            {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Black Widow", "email": "widow@marvel.com", "team": "Marvel"},
        ]
        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America", "Black Widow"]},
            {"name": "DC", "members": ["Superman", "Batman", "Wonder Woman"]},
        ]
        activities = [
            {"user": "Superman", "activity": "Flight", "duration": 60},
            {"user": "Iron Man", "activity": "Suit Training", "duration": 45},
            {"user": "Batman", "activity": "Martial Arts", "duration": 30},
        ]
        leaderboard = [
            {"user": "Superman", "points": 100},
            {"user": "Iron Man", "points": 90},
            {"user": "Batman", "points": 80},
        ]
        workouts = [
            {"name": "Strength Training", "suggested_for": ["Superman", "Iron Man"]},
            {"name": "Agility Drills", "suggested_for": ["Batman", "Black Widow"]},
        ]

        db.octofit_tracker_user.insert_many(users)
        db.octofit_tracker_team.insert_many(teams)
        db.octofit_tracker_activity.insert_many(activities)
        db.octofit_tracker_leaderboard.insert_many(leaderboard)
        db.octofit_tracker_workout.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
