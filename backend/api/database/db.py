import logging
import os

from motor.motor_asyncio import AsyncIOMotorClient


log = logging.getLogger(__file__)


class Database:
    def __init__(self, connection_url: str = None):
        connection_url = connection_url or os.getenv('DB_CONNECTION_URL')
        assert connection_url, 'Connection URL to DB not set'

        self.__client = AsyncIOMotorClient(connection_url)
        self.__database = None
        log.info(f'Connected to DB\n{self.__client.topology_description}')

    def get_instance_name(self):
        return "because-its-worth"

    @property
    async def database(self):
        if not self.__database:
            self.__database = self.__client.get_database(self.get_instance_name())
        return self.__database

    async def close(self):
        if self.__client:
            self.__client.close()
