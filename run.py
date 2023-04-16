import logging
import os.path

from BubotObj.OcfDevice.subtype.WebServer.WebServer import WebServer

logging.basicConfig()
logger = logging.getLogger('Bubot')
logger.setLevel(logging.INFO)

if __name__ == '__main__':
    # logging.basicConfig(
    #     level=logging.DEBUG,
    #     format='%(levelname)s %(name)s.%(funcName)s %(message)s'
    # )
    _path = os.path.join(os.path.dirname(__file__), 'conf')
    device = WebServer.init_from_file(path=_path)
    device.run()
    pass
