import pymysql

try:
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="db",
        database="kira_db"
    )
    print("Successfully connected to MySQL!")
    connection.close()
except Exception as e:
    print(f"Error: {e}")