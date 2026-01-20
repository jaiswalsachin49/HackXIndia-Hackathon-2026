from motor.motor_asyncio import AsyncIOMotorClient
import os
from core.logger import get_logger

logger = get_logger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db_name = "civicsense_db"

    def connect(self):
        try:
            mongo_uri = os.getenv("MONGO_URI")
            if not mongo_uri:
                logger.warning("MONGO_URI not found in environment variables. Database features will be disabled.")
                return

            self.client = AsyncIOMotorClient(mongo_uri)
            # Verify connection
            # await self.client.admin.command('ping')
            logger.info("✅ Successfully connected to MongoDB")
        except Exception as e:
            logger.error(f"❌ Failed to connect to MongoDB: {e}")
            self.client = None

    def close(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed")

    def get_db(self):
        if self.client:
            return self.client[self.db_name]
        return None

db = Database()
