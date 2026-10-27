// SPDX-License-Identifier: MIT
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p));
const catalog=JSON.parse(read('catalog.json')),data=read('packs/asmr-ja-zh.json'),pack=JSON.parse(data);
const version=v=>typeof v==='string'&&/^(0|[1-9]\d{0,4})\.(0|[1-9]\d{0,4})\.(0|[1-9]\d{0,4})$/.test(v);
assert.equal(catalog.kind,'asmr-translation-pack-catalog');assert.equal(catalog.version,1);assert.equal(catalog.id,'rogent-asmr-ja-zh');assert.ok(catalog.releases.length>0&&catalog.releases.length<=100);
const seen=new Set();for(const r of catalog.releases){assert.ok(version(r.version)&&version(r.minAppVersion)&&!seen.has(r.version));seen.add(r.version);assert.ok(Number.isSafeInteger(r.bytes)&&r.bytes>1&&r.bytes<=8*1024*1024);assert.match(r.sha256,/^[a-f0-9]{64}$/);assert.equal(r.url,`https://raw.githubusercontent.com/RoGent-Z/asmr-zh-translation-pack/refs/tags/v${r.version}/packs/asmr-ja-zh.json`);}
assert.equal(pack.kind,'asmr-local-phrase-pack');assert.equal(pack.version,1);assert.equal(pack.package.id,catalog.id);assert.equal(pack.package.license,'CC-BY-SA-4.0');assert.ok(version(pack.package.version));
const current=catalog.releases.find(r=>r.version===pack.package.version);assert.ok(current);assert.equal(current.bytes,data.length);assert.equal(current.sha256,createHash('sha256').update(data).digest('hex'));assert.equal(current.dictionaryVersion,pack.package.dictionaryVersion);assert.equal(current.phrases,pack.entries.length);assert.equal(current.glosses,pack.glosses.length);assert.ok(pack.entries.length<=10000&&pack.glosses.length<=10000);
const ids=new Set();for(const g of pack.glosses){assert.match(g.entryId,/^\d{1,12}$/);assert.ok(!ids.has(g.entryId));ids.add(g.entryId);assert.ok(typeof g.target==='string'&&g.target.length>0&&g.target.length<=160);assert.ok(Number.isSafeInteger(g.support)&&g.support>=5&&Number.isSafeInteger(g.occurrences)&&g.occurrences>=g.support);assert.deepEqual(Object.keys(g).sort(),['entryId','occurrences','support','target']);}
const phrases=new Set();for(const p of pack.entries){assert.ok(typeof p.source==='string'&&p.source.length>=3&&p.source.length<=128&&!phrases.has(p.source));phrases.add(p.source);assert.ok(typeof p.target==='string'&&p.target.length>0&&p.target.length<=160&&Number.isSafeInteger(p.support)&&p.support>=2&&Number.isSafeInteger(p.occurrences)&&p.occurrences>=p.support);}
for(const p of ['LICENSE','NOTICE.md','UPSTREAM-NOTICE.txt','README.md','FORMAT.md','CHANGELOG.md','LICENSE-CODE'])assert.ok(read(p).length>20);
assert.ok(!data.includes(Buffer.from('http')),'package must not contain source URLs');assert.ok(!data.includes(Buffer.from('RJ0')),'package must not contain work IDs');assert.ok(!data.includes(Buffer.from('holdout')),'private evaluation metadata omitted');
console.log(JSON.stringify({passed:true,version:pack.package.version,phrases:pack.entries.length,glosses:pack.glosses.length,bytes:data.length,sha256:current.sha256,historyVersions:catalog.releases.length}));
