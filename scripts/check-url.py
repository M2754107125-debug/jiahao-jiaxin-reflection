#!/usr/bin/env python3
"""Run from each network under test. No analytics, uploads or answers."""
import argparse, hashlib, json, time
from urllib.request import urlopen, Request
from urllib.parse import urljoin, urlparse
p=argparse.ArgumentParser(); p.add_argument('url'); args=p.parse_args()
base=args.url
assert base.endswith('/'), 'Use the full website base URL ending with /'
assert urlparse(base).scheme in ('http','https')
def get(path):
    t=time.monotonic()
    with urlopen(Request(urljoin(base,path),headers={'User-Agent':'JX50-release-check/1'}),timeout=30) as r:
        data=r.read(); kind=r.headers.get_content_type()
        assert r.status==200,(path,r.status)
        assert 'attachment' not in r.headers.get('Content-Disposition','').lower(),path
        print(json.dumps({'path':path,'status':r.status,'type':kind,'bytes':len(data),'ms':round((time.monotonic()-t)*1000),'final_url':r.url},ensure_ascii=False))
        return data,kind
manifest=json.loads(get('release-manifest.json')[0])
for path,meta in manifest['files'].items():
    data,kind=get(path)
    assert hashlib.sha256(data).hexdigest()==meta['sha256'],f'Hash mismatch: {path}'
    expected={'.js':{'application/javascript','text/javascript'},'.css':{'text/css'},'.html':{'text/html'},'.svg':{'image/svg+xml'}}
    ext='.'+path.rsplit('.',1)[-1]
    if ext in expected: assert kind in expected[ext],f'Wrong MIME: {path}: {kind}'
print('PASS: HTTP status, MIME, no forced download, release hashes. This is only this machine/network; browser workflow and mainland field tests remain separate.')
