import urllib.parse
from aiohttp import FormData
from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop
from BubotObj.OcfDevice.subtype.WebServer.WebServer import WebServer


class TestAuthByPassword(AioHTTPTestCase):
    login = 'test_add_password'
    password = 'password'

    @unittest_run_loop
    async def test_get_navigation_without_session(self):
        resp = await self.client.request(
            "GET",
            "/api/AdminPanel/navigation",
        )
        self.assertEqual(401, resp.status, 'response status')

    @unittest_run_loop
    async def test_get_navigation(self):
        session = await self.sign_in_by_password()
        resp = await self.client.request(
            "GET",
            "/api/AdminPanel/navigation",
            headers={'session': session}
        )
        if resp.status != 200:
            print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')

    async def sign_in_by_password(self):
        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_in_by_password",
            data=FormData({'login': self.login, 'password': self.password})
        )
        self.assertEqual(200, resp.status, 'response status')
        session = await resp.json()
        return session['session']

    async def get_application(self):
        device = WebServer.init_from_file()
        app = await device.run_web_server()
        return app
