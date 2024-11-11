CREATE TABLE IF NOT EXISTS Followers(
  follower_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  follower_user_id INT NOT NULL,
  followed_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (follower_user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_follow (user_id, follower_user_id)  
);
