CREATE TABLE IF NOT EXISTS Saves(
  save_id INT AUTO_INCREMENT PRIMARY KEY,
  video_id INT NOT NULL,
  user_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES Videos(video_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_save (video_id, user_id)  
);
