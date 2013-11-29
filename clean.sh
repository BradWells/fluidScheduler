rm app.db
rm -r db_repository
python db_create.py
python db_migrate.py
