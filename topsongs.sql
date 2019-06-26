CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE Top5000(
  song_rank INT(10) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  song_name VARCHAR(255) NOT NULL, 
  year_made INT(4) NOT NULL,
  raw_popularity DECIMAL(6,3),
  us_popularity DECIMAL(6,3),
  uk_popularity DECIMAL(6,3),
  eu_popularity DECIMAL(6,3),
  other_popularity DECIMAL(6,3),
  PRIMARY KEY (song_rank)
);

SELECT * FROM Top5000;

-- query which returns all data for songs sung by a specific artist
SELECT *
FROM Top5000 
WHERE artist_name = "Elton John";
-- query which returns all artist who appear within the top 5000 more than once
SELECT artist_name
FROM Top5000
GROUP BY(artist_name)
HAVING COUNT(artist_name) > 1;

-- query which returns all data contained within a specific range
SELECT *
FROM Top5000
WHERE year_made BETWEEN 1940 AND 1970;

-- query which searches for a specific song in the top 5000 and returns the data for it 
SELECT * 
FROM Top5000
WHERE song_name = "Let it Be";


CREATE TABLE top_albums (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM top_albums;

SELECT Top5000.artist_name, song_name, year_made
FROM Top5000
INNER JOIN top_albums ON (Top5000.artist_name = top_albums.artist AND Top5000.year_made = top_albums.year);


SELECT top_albums.year, top_albums.album, top_albums.position, Top5000.song_name, Top5000.artist_name
FROM top_albums
INNER JOIN Top5000 ON (top_albums.artist = Top5000.artist_name AND top_albums.year = Top5000.year_made)
WHERE top_albums.artist = "50 Cent" AND Top5000.artist_name = "50 Cent";