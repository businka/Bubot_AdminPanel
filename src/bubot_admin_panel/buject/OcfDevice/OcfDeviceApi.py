from bubot.core.ObjApi import ObjApi
from bubot_admin_panel.buject.OcfDevice.OcfDevice import OcfDevice
from bubot_helpers.ActionDecorator import async_action
from bubot_helpers.Helper import Helper
from bubot.core.ResourceLink import ResourceLink


class OcfDeviceApi(ObjApi):
    handler = OcfDevice

    @async_action
    async def api_discover(self, view, **kwargs):
        handler, data = await self.prepare_json_request(view)
        # result = []
        devices = await view.device.transport_layer.discovery_resource()
        await view.notify({'message': f'found {len(devices)}'})
        # for device in devices:
        #     di = device['di']
        #     try:
        #         # _device = await view.device.transport_layer.find_device(di)
        #         # device['raw'] = _device
        #         _device = await handler.find_by_id(di)
        #     except KeyNotFound:
        #         # ...
        #         _device = devices[_id].to_object_data()
        #
        #     # result.append(_device)

        return self.response.json_response({'rows': devices})

    @async_action
    async def api_reload(self, view, **kwargs):
        action = kwargs['_action']
        handler, data = await self.prepare_json_request(view)

        for device_data in data['items']:
            try:
                result = []
                master_link, master_response = await view.device.check_link()
                to = ResourceLink.init(device_data)
                to.check_live()
                resources = await to.retrieve(view.device, href='/oic/res')
                for resource in resources:
                    resource_data = None
                    if resource['href'] == '/oic/res':
                        continue

                    resource_data = await to.retrieve(view.device, href=resource['href'])
                    if not resource_data:
                        resource_data = {
                            'n': resource['n'],
                            'rt': resource['rt'],
                            'if': resource['if'],
                        }
                    resource_data['href'] = resource['href']
                    result.append(resource_data)
                device_data['res'] = result
            except KeyError:
                ...
            action.add_stat(await handler.update(device_data))
        return self.response.json_response(data['items'])

    @async_action
    async def api_mass_add(self, view, *, _action=None, **kwargs):
        handler, data = await self.prepare_json_request(view)
        for device_data in data['items']:
            try:
                keys = handler.get_obj_keys(device_data)
                handler = await _action.add_stat(handler.find_by_keys(keys))
                device_data = Helper.update_dict(handler.data, device_data)
            except KeyError:
                ...
            _action.add_stat(await handler.update(device_data))
        return self.response.json_response({})

    @async_action
    async def api_mass_delete(self, view, *, _action=None, **kwargs):
        handler, data = await self.prepare_json_request(view)
        for device_data in data['items']:
            _action.add_stat(await handler.delete_one(device_data['_id']))
        return self.response.json_response({})
