from bubot.Ocf.Helper import find_schemas
from bubot.core.Obj import Obj
from bubot_helpers.ActionDecorator import async_action, action
from bubot_helpers.JsonSchema4 import JsonSchema4
from bubot_helpers.JsonSchemaLoader import JsonSchemaLoader


class OcfSchema(Obj):
    name = 'OcfSchema'
    schemas_cache = {}
    schemas_dir = []
    file = __file__
    uuid_id = True
    schema_loader = None

    async def list(self, **kwargs):
        raise NotImplemented
        # drivers, schemas = Device.find_drivers()
        # result = []
        # for name in drivers:
        #     try:
        #         # if self.drivers[name].get('data') is None:
        #         driver = Device.init_from_config(class_name=name)
        #         # self.drivers[name]['handler'] = _device
        #         result.append(dict(
        #             id=name,
        #             name=name,
        #             links=driver.data,
        #             _actions=driver.get_install_actions()
        #         ))
        #     except Exception as e:
        #         pass
        #
        # return result
        # result = {}
        # cursor = self.client[db][name].find(
        #     filter=kwargs.get('filter', None),
        #     projection=kwargs.get('projection', None),
        #     skip=kwargs.get('skip', 0),
        #     limit=kwargs.get('limit', 0)
        # )
        # sort = kwargs.get('sort')
        # if sort:
        #     cursor.sort(sort)
        # result = await cursor.to_list(length=1000)
        # await cursor.close()

    @async_action
    async def find_by_id(self, _id, **kwargs):
        if not self.schemas_dir:
            self.schemas_dir = find_schemas()
            self.schema_loader = JsonSchemaLoader(self.schemas_dir, schema_file_extension='.json')
        self.data = self.get_schema_by_rt(_id.split('+'))
        return self

    @action
    def get_schema_by_rt(self, rt, **kwargs):
        json_schema = JsonSchema4(self.schema_loader, self.schemas_cache)
        return json_schema.load_from_rt(rt)
