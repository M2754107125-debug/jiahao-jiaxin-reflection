#!/usr/bin/env python3
"""Dependency-free reproducible release; source questionnaire is never edited."""
from pathlib import Path
import hashlib, json, re, shutil, subprocess, tempfile
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
def digest(data): return hashlib.sha256(data).hexdigest()
def run(*args, cwd=ROOT): subprocess.run(args, cwd=cwd, check=True)
def build():
    run('node', 'test-regression.mjs')
    if DIST.exists(): shutil.rmtree(DIST)
    DIST.mkdir()
    assets = {}
    for source in ['model.mjs', 'style.css', 'theory.svg']:
        data = (ROOT/source).read_bytes()
        name = f'{Path(source).stem}.{digest(data)[:12]}' + ('.js' if source.endswith('.mjs') else Path(source).suffix)
        (DIST/name).write_bytes(data); assets[source] = name
    app = (ROOT/'app.mjs').read_text()
    app, n = re.subn(r"\./model\.mjs(?:\?[^'\"]*)?", './'+assets['model.mjs'], app)
    assert n == 1, 'Unexpected model imports; review builder'
    assets['app.mjs'] = 'app.'+digest(app.encode())[:12]+'.js'
    (DIST/assets['app.mjs']).write_text(app)
    html = (ROOT/'index.html').read_text()
    for source in ['style.css','theory.svg','app.mjs']:
        html, n = re.subn(re.escape(source)+r'(?:\?[^"\s>]*)?', assets[source], html)
        assert n == 1, source
    # Visible fallback without altering application or storage behavior.
    html = html.replace('<main id="app" tabindex="-1"></main>', '<main id="app" tabindex="-1"><p>正在加载自我观察工具。若长时间停留，请刷新或检查网络。</p><noscript>本工具需要开启 JavaScript；答案仅在浏览器内计算。</noscript></main>')
    (DIST/'index.html').write_text(html)
    (DIST/'.nojekyll').touch()
    (DIST/'404.html').write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>页面不存在</title><h1>页面不存在</h1><p>请使用发布者提供的完整网站首页地址。</p></html>')
    # Check all literal HTML/CSS/module dependencies, excluding fragment-only links.
    refs = re.findall(r'(?:src|href)=["\']([^"\']+)', html)
    refs += re.findall(r'from\s+["\']([^"\']+)', app)
    refs += re.findall(r'url\(["\']?([^\)"\']+)', (ROOT/'style.css').read_text())
    for ref in refs:
        if ref.startswith(('#','data:')): continue
        assert not re.match(r'(?:[a-z]+:|/)', ref), f'Non-portable dependency: {ref}'
        target = (DIST/ref.split('?')[0]).resolve()
        assert target.is_relative_to(DIST.resolve()) and target.is_file(), f'Missing asset: {ref}'
    # Run the original regression suite against the actual generated modules.
    with tempfile.TemporaryDirectory() as temp:
        tmp = Path(temp)
        for file in DIST.glob('*.js'): shutil.copy(file,tmp/file.name)
        (tmp/'package.json').write_text('{"type":"module"}')
        test = (ROOT/'test-regression.mjs').read_text().replace('./model.mjs','./'+assets['model.mjs']).replace('./app.mjs','./'+assets['app.mjs'])
        (tmp/'test.mjs').write_text(test)
        run('node','test.mjs',cwd=tmp)
        for name in [assets['model.mjs'],assets['app.mjs']]: run('node','--check',name,cwd=tmp)
    files = {f.name:{'sha256':digest(f.read_bytes()),'bytes':f.stat().st_size} for f in sorted(DIST.iterdir())}
    manifest = {'source_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(), 'assets':assets,'files':files}
    (DIST/'release-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print('PASS: relative links, module syntax, source and built regression suites; bytes:',sum(x['bytes'] for x in files.values()))
if __name__ == '__main__': build()
