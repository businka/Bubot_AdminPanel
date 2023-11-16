from bubot_admin_panel.buject.OcfResource.OcfResource import OcfResource
from bubot.core.ResourceLink import ResourceLink
from bubot.core.ObjApi import ObjApi
from bubot.buject.OcfDevice.subtype.Device.Device import Device
from bubot_helpers.ActionDecorator import async_action


class OcfResourceApi(ObjApi):
    handler = OcfResource

    def __init__(self, response, **kwargs):
        super().__init__(response, **kwargs)
        self.filter_fields['rt'] = self.filter_rt

    @async_action
    async def api_find_devices(self, view, **kwargs):
        async def notify(message):
            message['percent'] = percent
            await view.notify(message)

        handler, data = await self.prepare_json_request(view)
        items = data['items']
        if items is None:  # ищем все устройства
            items = await handler.query(data['filter'])
        count = len(items)
        devices = []
        for i, item in enumerate(items):
            if count > 2:
                percent = (i + 1) * 100 / count
            else:
                percent = None
            device = Device.init_from_config(class_name=item['id'])
            devices += await device.find_devices(notify=notify)
        # for elem in devices:
        #     new_device = Device.init_from_config(elem)
        #     new_device.save_config()
        #     di = new_device.get_device_id()
        # await view.device.action_add_device({'di': di, 'dmno': device.__class__.__name__})
        # raise Exception('bbbad')
        return self.response.json_response(devices)

    @async_action
    async def api_read(self, view, **kwargs):
        handler, data = await self.prepare_json_request(view)
        res_link = ResourceLink.init_from_link(data)
        result = await res_link.retrieve(view.device)
        return self.response.json_response(result)

    @async_action
    async def api_update(self, view, **kwargs):
        handler, data = await self.prepare_json_request(view)
        res_link = ResourceLink.init_from_link(data)
        await res_link.update(view.device, data['res'])
        return self.response.json_response(data['res'])
        # if result.operation == 'changed':
        #     return self.response.json_response(result.cn)
        # else:
        #     return self.response.json_response(result.cn, status=501)  # todo сделать контроль исключений при случае
        #
    @staticmethod
    def filter_rt(filter, key, filter_value):
        filter['res.rt'] = {'$elemMatch': {'$eq': filter_value}}

    @staticmethod
    async def api_list(request):
        result = dict(
            items=[]
        )
        if not request.query.get('items_only'):
            result['headers'] = [
                {
                    'label': 'Resource',
                    'field': 'title',
                    'name': 'name'
                },
                {
                    'label': 'OcfDevice',
                    'field': 'device',
                    'name': 'device'
                }
            ]
        self = request.app['device']
        if not self.resources:
            self.resources = await self.discovery_resource()
        for di in self.resources:
            device = self.resources[di]
            for href in device.links:
                if href[0:4] == '/oic':
                    continue
                link = device.links[href]
                name = device.name if device.name else device.di
                item = Helper.copy(link.data)
                item['id'] = '{0}{1}'.format(link.anchor, link.href)
                item['title'] = link.name
                item['device']: name
                result['items'].append(item)
        return json_response(result)

    @staticmethod
    async def api_get(request):
        self = request.app['device']
        if not self.resources:
            self.resources = await self.discovery_resource()
        uri = request.query.get('id')
        resource = DeviceLink.get_resource_by_uri(self.resources, uri)
        data = await resource.retrieve(self)
        data['_actions'] = [
            dict(
                id='update',
                icon='save'
            )
        ]
        return json_response(data)

    @staticmethod
    async def api_post(request):
        self = request.app['device']
        data = await request.json()
        data.pop('_actions')
        if not self.resources:
            self.resources = await self.discovery_resource()
        uri = request.query.get('id')
        resource = DeviceLink.get_resource_by_uri(self.resources, uri)
        result = await self.request('update', resource.data, data)
        return Response()

    @async_action
    async def api_request(self, view, **kwargs):
        self = ws.device
        if not self.resources:
            self.resources = await self.discovery_resource()
        resource = DeviceLink.get_resource_by_uri(self.resources, to)
        result = await self.request(op, resource, data)
        await ws.ws.send_json(result.to_dict())

    @async_action
    async def api_observe(self, view, **kwargs):
        self = ws.device
        if not self.resources:
            self.resources = await self.discovery_resource()
        resource = DeviceLink.get_resource_by_uri(self.resources, to)
        # if resource.observe:
        #     return
        await self.observe(resource, ws.device.on_notify_response)
        resource.observe = True