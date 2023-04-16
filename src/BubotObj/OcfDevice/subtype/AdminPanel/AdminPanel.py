import os.path
from BubotObj.OcfDevice.subtype.Device.Device import Device


class AdminPanel(Device):
    file = __file__
    template = False

    def add_route(self, app):
        path_device = os.path.dirname(self.file)
        # def add_route(app, ui_name, ui_view):

        # static_path = '{}/static'.format(path_device)
        # app.router.add_route('*', '/scheduler/api/{handler}', API)
        # app.router.add_static('/scheduler', static_path)
        app.router.add_static(f'/{self.__class__.__name__}/ui/', f'{path_device}/static/ui')
        app.router.add_static(f'/{self.__class__.__name__}/i18n/', f'{self.path}/i18n')
