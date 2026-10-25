#!/usr/bin/env python3
"""Sapphire Wednesday: loopback-only, dependency-free local launcher."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, unquote
from urllib.request import urlopen
import json
import sys
import threading
import webbrowser

ROOT = Path(__file__).resolve().parent
PORT = 8743
URL = f"http://127.0.0.1:{PORT}"

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.headers.get('Host') not in (f'127.0.0.1:{PORT}', f'localhost:{PORT}'):
            self.send_error(403)
            return
        path = unquote(urlsplit(self.path).path)
        if path == '/api/health':
            data = json.dumps({'app':'sapphire-wednesday-deluxe','version':1,
                'games':{g:(ROOT/'roms'/f'{g}.gba').is_file() for g in ('sapphire','ruby')}}).encode()
            self.send_response(200)
            self.send_header('Content-Type','application/json')
            self.send_header('Content-Length',str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        target = (ROOT / path.lstrip('/')).resolve()
        if not target.is_relative_to(ROOT) or any(p.startswith('.') for p in Path(path).parts):
            self.send_error(403)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','no-referrer')
        self.send_header('Cache-Control','no-cache')
        super().end_headers()

    def list_directory(self, path):
        self.send_error(403, 'Directory browsing is disabled')

def main():
    try:
        server = ThreadingHTTPServer(('127.0.0.1',PORT),Handler)
    except OSError:
        try:
            with urlopen(URL+'/api/health', timeout=2) as response:
                if json.load(response).get('app') == 'sapphire-wednesday-deluxe':
                    if '--open' in sys.argv: webbrowser.open(URL)
                    print('Sapphire Wednesday is already running at '+URL)
                    return
        except Exception:
            pass
        raise SystemExit(f'Port {PORT} is busy. Close the app using that port, then launch again.')
    if '--open' in sys.argv:
        threading.Timer(0.5,lambda:webbrowser.open(URL)).start()
    print('Sapphire Wednesday is ready: '+URL, flush=True)
    print('Keep this window open while playing. Press Control+C to stop.', flush=True)
    try: server.serve_forever()
    except KeyboardInterrupt: pass
    finally: server.server_close()

if __name__ == '__main__': main()
