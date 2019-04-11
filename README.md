## Available Scripts

sudo lsof -i :5000
kill -9 81173

heroku logs -tail --app unogame
heroku features:enable http-session-affinity