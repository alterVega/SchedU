sqlite3 allEvents.db

CREATE TABLE IF NOT EXISTS Events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startTime INTEGER NOT NULL,
  endTime INTEGER NOT NULL,
  title TEXT,
  description TEXT,
 );

INSERT INTO Events (startTime, endTime, title, description) VALUES (Date.now(), Date.now(), "Breakfast", "Pancakes");

select * from Events;

.quit