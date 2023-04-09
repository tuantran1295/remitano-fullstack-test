CREATE DATABASE IF NOT EXISTS funny_movies_db;

USE funny_movies_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `isAdmin`) VALUES
(1, 'tuantran', '$2b$10$6dHK1R9c6Vke6x1YfQld4uLmRDWOVDauOs90b4zsmgVWVKUAEjDK.', 'tuantran@gmail.com', 0),
(2, 'Admin', '$2b$10$6dHK1R9c6Vke6x1YfQld4uLmRDWOVDauOs90b4zsmgVWVKUAEjDK.', 'admin@funnymovies.com', 1);

CREATE TABLE `video` (
  `id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `video_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `url`, `video_id`) VALUES
(22, 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', 'aqz-KE-bpKQ'),
(23, 'https://www.youtube.com/watch?v=szhyWmrsQNQ', 'szhyWmrsQNQ'),
(25, 'https://www.youtube.com/watch?v=7pxqOmxPgPM', '7pxqOmxPgPM'),
(27, 'https://www.youtube.com/watch?v=MmHqthzJER4', 'MmHqthzJER4'),
(28, 'https://www.youtube.com/watch?v=8pDqJVdNa44', '8pDqJVdNa44');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `video`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

