import pymysql
from pymysql import Error
from dotenv import load_dotenv
import os
from passlib.context import CryptContext
import logging

load_dotenv()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        try:
            # Ensure environment variables are loaded
            load_dotenv()
            
            self.connection = pymysql.connect(
                host=os.getenv('MYSQL_HOST', 'localhost'),
                user=os.getenv('MYSQL_USER', 'root'),
                password=os.getenv('MYSQL_PASSWORD', 'db'),
                database=os.getenv('MYSQL_DATABASE', 'kira_db'),
                cursorclass=pymysql.cursors.DictCursor
            )
            self.cursor = self.connection.cursor()
            logger.info("Successfully connected to MySQL database")
            self.setup_database()
        except Error as e:
            logger.error(f"MySQL Connection Error: {str(e)}")
            raise e

    def setup_database(self):
        # Create users table if it doesn't exist
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                hashed_password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ''')
        self.connection.commit()

    def create_user(self, username: str, email: str, password: str, full_name: str = None):
        try:
            logger.info(f"Hashing password for user: {username}")
            hashed_password = pwd_context.hash(password)
            
            query = '''
                INSERT INTO users (username, email, hashed_password, full_name)
                VALUES (%s, %s, %s, %s)
            '''
            logger.info(f"Executing database query for user: {username}")
            self.cursor.execute(query, (username, email, hashed_password, full_name))
            self.connection.commit()
            logger.info(f"Successfully created user: {username}")
            return True
        except Error as e:
            logger.error(f"Database error creating user: {e}")
            if e.errno == 1062:  # Duplicate entry error
                if "username" in str(e):
                    raise ValueError(f"Username '{username}' already exists")
                elif "email" in str(e):
                    raise ValueError(f"Email '{email}' already exists")
            raise ValueError(f"Database error: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error creating user: {e}")
            raise ValueError(f"Unexpected error: {str(e)}")

    def get_user_by_username(self, username: str):
        query = "SELECT * FROM users WHERE username = %s"
        self.cursor.execute(query, (username,))
        return self.cursor.fetchone()

    def verify_password(self, plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    def __del__(self):
        if hasattr(self, 'connection') and self.connection.is_connected():
            self.cursor.close()
            self.connection.close()

# Create a singleton instance
db = Database()
