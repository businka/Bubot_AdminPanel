module.exports = {
  Form: {
    List: {
      'template': 'DataGrid',
      'components': {
        'massOperationsBar': {
          'template': 'MassOperationsBar',
          'selectAll': true,
          'visible': false,
          'items': [
            {
              'name': 'Delete',
              'title': 'Delete'
            },
            {
              'name': 'Export',
              'title': 'Export'
            }
          ]
        },
        'filterBar': {
          'template': 'FilterBar',
          'components': {
            'search': {
              'template': 'SearchForm',
              'filterField': {}
            },
            'filer': {
              'template': 'Filter',
              'filterField': {}
            }
          }
        },
        'toolBar': {
          'template': 'ToolBar',
          'visible': true,
          'massOperationsBar': true,
          'items': [
            {
              'name': 'Add',
              'template': 'ActionBtnDefault',
              'title': 'AddNomenclature',
              'title_ru': '+Номенклатура',
              'title_en': '+Nomenclature',
              'title_cn': '+命名法'

            },
            {
              'name': 'Import',
              'template': 'ActionBtn',
              'title': 'Import',
              'icon': 'mdi-import'
            }
          ]
        }
      },
      'rowTemplate': 'rowViewer',
      'rowActivateHandler': {
        'name': 'RightDrawerFormViewer',
        'form': 'Catalog/OcfDriver/Item'
      },
      'rowKey': 'id',
      'hideHeader': true,
      'mode': {
        'name': 'remote',
        'objType': 'Catalog',
        'objName': 'OcfDriver',
        'objMethod': 'list'
      },
      'columns': [
        {
          'value': 'name',
          'width': '100%',
          'align': 'left',
          'template': 'RowCellDefault',
          'text': 'name',
          'title_ru': 'Название',
          'title_en': 'Name',
          'title_cn': '名称'

        }
      ],
      'inlineActions': {},
      'store': {
        'massOperationsBarVisible': false,
        'massOperationsBar': true,
        'toolBar': true,
        'loading': false,
        'filters': {},
        'editForm': {},
        'error': {},
        'rows': []
      }
    },
    Item: {
      'template': 'OcfDriver',
      'width': '600',
      'mode': {
        'name': 'remote',
        'objType': 'Catalog',
        'objName': 'OcfDriver'
      },
      'components': {
        'defaultAction': {
          'name': 'Add',
          'icon': 'mdi-plus',
          'title': 'Добавить устройство',
          'title_ru': 'Добавить устройство',
          'title_en': 'Add device'
        }
      },
      'store': {
        'item': null,
        'loading': false
      }
    }
  },
  Data: [
    {
      'id': 'WebServer', 'name': 'WebServer', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'Web server',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'WebServer',
          'sv': '0.0.1',
          'di': '4f6f23a9-1793-46a6-8543-d03e23c98098'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': '',
          'drivers': {}
        },
        '/oic/con': {
          'rt': ['bubot.VirtualServer.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'running_devices': [],
          'port': 80
        },
        '/oic/sec/doxm': { 'owned': true }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'SerialServerHF511', 'name': 'SerialServerHF511', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': '',
          'mnmn': 'iot workshop',
          'mnml': 'http://www.iotworkshop.com/',
          'mnmo': 'HF511A'
        },
        '/oic/d': {
          'n': 'Serial server HF511A',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'SerialServerHF511',
          'sv': '0.0.1',
          'di': '082da0bf-1f81-48c4-8756-2a9846ddb620'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['bubot.serialserver.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'host': '',
          'port': 502,
          'web_port': 80,
          'login': 'admin',
          'password': 'admin',
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        },
        '/oic/sec/doxm': { 'owned': true },
        '/modbus_msg': {
          'n': 'Modbus socket',
          'rt': ['bubot.modbus.msg'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'slave': 0,
          'function': 0,
          'pdu': '',
          'answerSize': 0,
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'ModbusMaster', 'name': 'ModbusMaster', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'Device',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'ModbusMaster',
          'sv': '0.0.1',
          'di': '373c3ee6-04db-440a-995b-4326651a37c0'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['bubot.serialserver.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'host': '',
          'port': 502,
          'web_port': 80,
          'login': 'admin',
          'password': 'admin',
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        },
        '/oic/sec/doxm': { 'owned': true },
        '/modbus_msg': {
          'n': 'Modbus socket',
          'rt': ['bubot.modbus.msg'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'slave': 0,
          'function': 0,
          'pdu': '',
          'answerSize': 0,
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'VirtualServer', 'name': 'VirtualServer', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'VirtualServer',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'VirtualServer',
          'sv': '0.0.1',
          'di': '1c691c54-a0e6-4383-86a8-d2c9f74ecb9b'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': '',
          'drivers': {}
        },
        '/oic/con': {
          'rt': ['bubot.VirtualServer.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'running_devices': []
        },
        '/oic/sec/doxm': { 'owned': true }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'DimmerWBMRGBWD', 'name': 'DimmerWBMRGBWD', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': '',
          'mnmn': 'Wirenboard',
          'mnml': 'https://wirenboard.com',
          'mnmo': 'WB-MRGB-D'
        },
        '/oic/d': {
          'n': 'Dimmer WB-MRGB-D',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'DimmerWBMRGBWD',
          'sv': '0.0.1',
          'di': '2e5e1bf1-654a-4941-a4df-3c0b929cf49c'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        },
        '/oic/sec/doxm': { 'owned': true },
        '/brightness': {
          'n': 'Brightness',
          'rt': ['oic.r.light.brightness'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'brightness': 100
        },
        '/color': {
          'n': 'Color',
          'rt': ['oic.r.colour.rgb'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'rgbValue': [0, 0, 0]
        },
        '/power': {
          'n': 'Power',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'RelayWBMR6C', 'name': 'RelayWBMR6C', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': '',
          'mnmn': 'wirenboard',
          'mnml': 'https://wirenboard.com',
          'mnmo': 'WB-MR6C'
        },
        '/oic/d': {
          'n': 'Relay WB-MR6C',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'RelayWBMR6C',
          'sv': '0.0.1',
          'di': 'af975be2-f2b4-44da-9345-ff5ba50ff1ab'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['bubot.modbus.slave.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'master': { 'anchor': '', 'href': '/modbus_msg', 'eps': [] },
          'slave': 0,
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 2
        },
        '/oic/sec/doxm': { 'owned': true },
        '/switch/1': {
          'n': 'Switch 1',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        },
        '/switch/2': {
          'n': 'Switch 2',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        },
        '/switch/3': {
          'n': 'Switch 3',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        },
        '/switch/4': {
          'n': 'Switch 4',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        },
        '/switch/5': {
          'n': 'Switch 5',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        },
        '/switch/6': {
          'n': 'Switch 6',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'ThermostatSML1000', 'name': 'ThermostatSML1000', 'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': '',
          'mnmn': 'wirenboard',
          'mnml': 'https://wirenboard.com',
          'mnmo': 'SML1000'
        },
        '/oic/d': {
          'n': 'Thermostat SML1000',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'ThermostatSML1000',
          'sv': '0.0.1',
          'di': '23c94a01-bc7c-48de-899f-84124944e197'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['bubot.modbus.slave.con', 'oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': [],
          'master': { 'anchor': '', 'href': '/modbus_msg', 'eps': [] },
          'slave': 0,
          'baudRate': 9600,
          'parity': 0,
          'dataBits': 8,
          'stopBits': 1
        },
        '/oic/sec/doxm': { 'owned': true },
        '/power': {
          'n': 'Power',
          'rt': ['oic.r.switch.binary'],
          'if': ['oic.if.baseline', 'oic.if.a'],
          'p': { 'bm': 1 },
          'value': false
        }
      }, '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'ModbusSlave',
      'name': 'ModbusSlave',
      'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'Device',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'ModbusSlave',
          'sv': '0.0.4',
          'di': '34fddc58-1b98-4036-baca-d7d5c5781945'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': []
        },
        '/oic/sec/doxm': { 'owned': true }
      },
      '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }, {
      'id': 'EchoDevice',
      'name': 'EchoDevice',
      'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'TestDevice',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'EchoDevice',
          'sv': '0.0.2',
          'di': 'a6ff267b-dbc7-4394-a910-0ba7b01fceaa'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': '',
          'i': 0,
          'j': 0
        },
        '/oic/con': {
          'rt': ['oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': []
        },
        '/oic/sec/doxm': { 'owned': true }
      },
      '_actions': [{ 'id': 'search_devices', 'icon': 'search', 'title': 'search devices' }, {
        'id': 'add_device',
        'icon': 'add_circle',
        'title': 'add device'
      }]
    }, {
      'id': 'Scheduler',
      'name': 'Scheduler',
      'links': {
        '/oic/res': { 'rt': ['oic.wk.res'], 'if': ['oic.if.ll', 'oic.if.baseline'], 'p': { 'bm': 0 } },
        '/oic/p': {
          'rt': ['oic.wk.p'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'n': 'Platform',
          'mnpv': ''
        },
        '/oic/d': {
          'n': 'Device',
          'rt': ['oic.wk.d'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 1 },
          'dmno': 'Scheduler',
          'sv': '0.0.4',
          'di': '44b365a4-36c3-4d0e-b278-a3a4c406be71'
        },
        '/oic/mnt': {
          'n': 'Maintenance',
          'rt': ['oic.wk.con', 'bubot.mnt', 'oic.r.operational.state'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'machineStates': ['pending', 'idle', 'pendingHeld', 'processing', 'stopped'],
          'currentMachineState': 'pending',
          'status': 'init',
          'message': ''
        },
        '/oic/con': {
          'rt': ['oic.wk.con', 'bubot.con'],
          'if': ['oic.if.baseline'],
          'p': { 'bm': 3 },
          'logLevel': 'error',
          'udpCoapPort': 0,
          'udpCoapIPv4': false,
          'udpCoapIPv6': true,
          'udpCoapIPv4Ssl': false,
          'udpCoapIPv6Ssl': false,
          'listening': [],
          'observed': []
        },
        '/oic/sec/doxm': { 'owned': true }
      },
      '_actions': [{ 'id': 'add_device', 'icon': 'add_circle', 'title': 'add device' }]
    }]
}
