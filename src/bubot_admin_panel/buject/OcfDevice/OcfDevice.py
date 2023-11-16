from bubot.core.Obj import Obj
from bubot_helpers.ActionDecorator import async_action


class OcfDevice(Obj):
    file = __file__
    name = 'device'
    keys_meta = [
        dict(
            key='di',
            fields=[dict(
                label='di',
                path='di'
            )]
        )]

    @property
    def db(self):
        return 'Bubot'

    @async_action
    async def before_update(self, data=None, **kwargs):
        await super().before_update(data, **kwargs)

    async def list_set_default_params(self, **kwargs):
        if 'order' not in kwargs:
            kwargs['order'] = [['n', 1]]
        return kwargs

    #
    # @classmethod
    # def link_to_data(cls, device_link, data):
    #     data = {
    #         'href': device_link['href'],
    #         'di': device_link['di'],
    #         'family': device_link['family'],
    #         'net_interface': device_link['net_interface'],
    #         'title': device_link['n'],
    #
    #     }

# todo полнотекстовый поиск
