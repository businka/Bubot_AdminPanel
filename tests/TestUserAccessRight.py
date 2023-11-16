import unittest
import urllib.parse
from aiohttp import FormData
from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop
from bubot_admin_panel.buject.OcfDevice.subtype.WebServer.WebServer import WebServer


class TestUserAccessRight(AioHTTPTestCase):

    async def get_application(self):
        device = WebServer.init_from_file()
        app = await device.run_web_server()
        return app

    # the unittest_run_loop decorator can be used in tandem with
    # the AioHTTPTestCase to simplify running
    # tests that are asynchronous

    async def sign_in(self):
        param = FormData({'login': 'test_add_password', 'password': 'password'})
        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_in_by_password",
            data=param
        )
        return resp

    @unittest_run_loop
    async def test_success_access_to_navigation(self):
        await self.sign_in()
        resp = await self.client.request(
            "GET",
            "/api/AdminPanel/read_navigation",
        )
        if resp.status != 200:
            print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')
        set_cookie = resp.headers.get('Set-Cookie')
        session = urllib.parse.unquote(set_cookie).split(';')
        self.assertEqual('session', session[0][:7], 'set session')
        session = session[0][8:]
        data = await resp.json()
        self.assertEqual(session, data['session'])

        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_in_by_password",
            data=param
        )

        set_cookie2 = resp.headers.get('Set-Cookie')
        data2 = await resp.json()

        if resp.status != 200:
            print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')
        self.assertIsNone(set_cookie2, 'don\'t new session')
        self.assertEqual(session, data['session'], 'return first session')
        self.assertEqual(session, data2['session'])

        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_out",
            data=param
        )
        set_cookie3 = resp.headers.get('Set-Cookie')
        session2 = urllib.parse.unquote(set_cookie3).split(';')
        self.assertEqual('session', session2[0][:7], 'set session')
        session2 = session2[0][8:]
        data3 = await resp.json()
        if resp.status != 200:
            print(await resp.text())
        self.assertEqual('""', session2, 'new_session')
        self.assertEqual(200, resp.status, 'response status')
        self.assertEqual({}, data3)

    @unittest_run_loop
    async def test_add_password(self):
        data = FormData({'login': 'test_add_password', 'password': 'password'})
        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_up_by_password",
            data=data
        )
        print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')

    @unittest_run_loop
    async def test_get_current_user(self):
        data = FormData({'login': 'test_add_password', 'password': 'password'})
        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/auth_by_password",
            data=data
        )
        resp = await self.client.request(
            "GET",
            "/api/AuthService/User/current_user",
        )
        print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')