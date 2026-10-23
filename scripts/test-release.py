#!/usr/bin/env python3
"""Serve release at root AND subdirectory, verify MIME and exact bytes."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from threading import Thread
import os, shutil, subprocess, tempfile
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
with tempfile.TemporaryDirectory() as tmp:
    shutil.copytree(ROOT/'dist',Path(tmp)/'jiahao-jiaxin-reflection')
    for directory,suffix in [(ROOT/'dist','/'),(Path(tmp),'/jiahao-jiaxin-reflection/')]:
        server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(directory)))
        thread=Thread(target=server.serve_forever,daemon=True);thread.start()
        url=f'http://127.0.0.1:{server.server_port}{suffix}'
        try:
            subprocess.run(['python3',str(ROOT/'scripts/check-url.py'),url],check=True)
            if os.environ.get('BROWSER_TEST')=='1': subprocess.run(['node',str(ROOT/'scripts/browser-test.mjs'),url],check=True)
        finally: server.shutdown();server.server_close();thread.join()
