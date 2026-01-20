import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('civicsense.log')
    ]
)

def get_logger(name: str):
    """Get logger instance for a module"""
    return logging.getLogger(name)
