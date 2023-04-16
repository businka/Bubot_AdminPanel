from Bubot.Core.ObjApi import ObjApi
from Bubot.Helpers.ActionDecorator import async_action
from BubotObj.OcfDevice.OcfDevice import OcfDevice


class OcfDeviceApi(ObjApi):
    handler = OcfDevice

    @async_action
    async def api_discover(self, view, **kwargs):
        handler, data = await self.prepare_json_request(view)
        # result = []
        devices = await view.device.transport_layer.discovery_resource()
        # await view.notify({'message': f'found {len(devices)}'})
        # for device in devices:
        #     di = device['di']
        #     try:
        #         _device = await handler.find_by_id(di)
        #     except KeyNotFound:
        #         _device = devices[_id].to_object_data()
        #
        #     result.append(_device)

        return self.response.json_response({'rows': devices})

    @async_action
    async def api_mass_add(self, view, **kwargs):
        action = kwargs['_action']
        handler, data = await self.prepare_json_request(view)
        for device_data in data['items']:
            action.add_stat(await handler.update(device_data))
        return self.response.json_response({})

    @async_action
    async def api_mass_delete(self, view, **kwargs):
        action = kwargs['_action']
        handler, data = await self.prepare_json_request(view)
        for device_data in data['items']:
            action.add_stat(await handler.delete_one(device_data['_id']))
        return self.response.json_response({})
