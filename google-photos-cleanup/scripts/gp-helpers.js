// Google Photos helpers for the google-photos-cleanup skill.
// Paste this whole file into one javascript call on a signed-in photos.google.com tab.
// It defines window.GP and stores itself in localStorage.__gp, so after a page reload
// start the next call with:  eval(localStorage.__gp);   (must come before any await).
// These are Google Photos' own undocumented web calls. They can change without notice:
// run GP.selfTest() before relying on them. Last verified: 12 November 2026.
function __gpInit() {
  const W = () => window.WIZ_global_data;
  const GP = (window.GP = { jobs: {}, version: '5.0' });

  // One batchexecute call. Returns parsed data; throws on an error reply.
  GP.rpc = async (id, params) => {
    const body = 'f.req=' + encodeURIComponent(JSON.stringify([[[id, JSON.stringify(params), null, 'generic']]])) +
      '&at=' + encodeURIComponent(W().SNlM0e) + '&';
    const r = await fetch('/_/PhotosUi/data/batchexecute?rpcids=' + id + '&source-path=%2F&f.sid=' + W().FdrFJe +
      '&bl=' + W().cfb2h + '&hl=en&soc-app=165&soc-platform=1&soc-device=1&rt=c', {
      method: 'POST', credentials: 'include', body,
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    });
    const t = await r.text();
    for (const l of t.split('\n')) {
      if (!l.startsWith('[["wrb.fr"')) continue;
      const j = JSON.parse(l)[0];
      if (j[2] == null && j[5]) throw new Error(id + ' refused, code ' + JSON.stringify(j[5]));
      return j[2] ? JSON.parse(j[2]) : null;
    }
    throw new Error(id + ': no reply (HTTP ' + r.status + ')');
  };
  const retry = async (fn, n = 3) => { for (let i = 0; ; i++) { try { return await fn(); } catch (e) { if (i >= n - 1) throw e; await GP.sleep(1500); } } };
  GP.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const chunks = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };
  const item = (x) => ({ id: x[0], u: x[1][0], w: x[1][1], h: x[1][2], t: x[2], k: x[3] });

  // ---------- read ----------
  // All albums: [{id, title, count}]
  GP.albums = async () => {
    const out = []; let tok = null;
    for (let i = 0; i < 60; i++) {
      const d = await retry(() => GP.rpc('Z5xsfc', [tok, null, null, null, 1]));
      (d[0] || []).forEach((a) => { const v = a[a.length - 1] && a[a.length - 1]['72930366']; if (v) out.push({ id: a[0], title: v[1], count: v[3] || 0 }); });
      tok = d[1]; if (!tok) break;
    }
    return out;
  };
  // Items of one album: [{id, u, w, h, t, k}]  (id = media id, k = dedup key, u = thumbnail base URL)
  GP.albumItems = async (albumId) => {
    const out = []; let tok = null;
    for (let i = 0; i < 400; i++) {
      const d = await retry(() => GP.rpc('snAcKc', [albumId, tok, null, null, 1]));
      if (!d) break; (d[1] || []).forEach((x) => out.push(item(x)));
      tok = d[2]; if (!tok) break;
    }
    return out;
  };
  // Whole library, newest first. onItem gets {id,u,w,h,t,k,video,lat,lng}. About 14,000 items per 40 s.
  GP.library = async (onItem, maxPages = 5000) => {
    let tok = null, n = 0;
    for (let i = 0; i < maxPages; i++) {
      const d = await retry(() => GP.rpc('lcxiM', [tok, null, null, null, 1]));
      if (!d) break;
      (d[0] || []).forEach((x) => {
        const it = item(x), last = x[x.length - 1] || {};
        it.video = !!last['76647426'];
        const m = JSON.stringify(last['129168200'] || '').match(/\[\[(-?\d{7,10}),(-?\d{7,10})\]/);
        it.lat = m ? +m[1] / 1e7 : null; it.lng = m ? +m[2] / 1e7 : null;
        onItem(it); n++;
      });
      tok = d[1]; if (!tok) break;
    }
    return n;
  };
  // Details of one item. Takes the media id (AF1Qip…), not the dedup key.
  GP.info = async (mediaId) => {
    const z = await GP.rpc('fDcn4b', [mediaId]); const a = z && z[0]; if (!a) return null;
    const s = JSON.stringify(a);
    // camera make and model; skip the owner tuple, which has the same shape
    const cam = [...s.matchAll(/\["([^"]{2,40})","([^"]{2,60})",null/g)].find((m) => !/^AF1Qip/.test(m[1]) && !/^\d+$/.test(m[2]));
    let place = ''; try { place = a[13][2][0][1][0][0]; } catch (e) {}
    return { id: a[0], description: a[1], filename: a[2], t: a[3], w: a[6], h: a[7], k: a[11],
      lat: a[9] ? a[9][0][0] / 1e7 : null, lng: a[9] ? a[9][0][1] / 1e7 : null, place,
      camera: cam ? cam[1].trim() + ' ' + cam[2].trim() : null };
  };
  // Is each dedup key in Trash? Scans up to maxPages pages of Trash.
  GP.inTrash = async (keys, maxPages = 200) => {
    const left = new Set(keys), found = new Set(); let tok = null;
    for (let i = 0; i < maxPages && left.size; i++) {
      const d = await retry(() => GP.rpc('zy0IHe', [tok, 1])); const s = JSON.stringify(d);
      for (const k of [...left]) if (s.includes(k)) { found.add(k); left.delete(k); }
      tok = d && d[1]; if (!tok) break;
    }
    return { found: [...found], missing: [...left] };
  };

  // ---------- write (each one logs to the change log first) ----------
  GP.log = (entry) => {
    let a = []; try { a = JSON.parse(localStorage.__gp_log || '[]'); } catch (e) {}
    a.push(Object.assign({ at: new Date().toISOString() }, entry)); localStorage.__gp_log = JSON.stringify(a);
  };
  // Offers the change log as a file download. Ask the person before calling this.
  GP.exportLog = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([localStorage.__gp_log || '[]'], { type: 'application/json' }));
    a.download = 'google-photos-change-log-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  };
  // New album holding the given media ids. Returns the album id.
  GP.createAlbum = async (title, mediaIds) => {
    const d = await GP.rpc('OXvT9d', [title, null, 1, mediaIds.map((id) => [[id]])]);
    const id = d[0][0]; GP.log({ op: 'createAlbum', id, title, n: mediaIds.length }); return id;
  };
  GP.addToAlbum = async (mediaIds, albumId) => {
    for (const c of chunks(mediaIds, 100)) await retry(() => GP.rpc('E1Cajb', [c, albumId]));
    GP.log({ op: 'addToAlbum', albumId, n: mediaIds.length });
  };
  // Takes the ids that GP.albumItems returned FOR THAT ALBUM. Never trashes anything.
  GP.removeFromAlbum = async (albumItemIds, note) => {
    for (const c of chunks(albumItemIds, 50)) await retry(() => GP.rpc('ycV3Nd', [c]));
    GP.log({ op: 'removeFromAlbum', note, ids: albumItemIds });
  };
  GP.renameAlbum = async (albumId, title, oldTitle) => {
    GP.log({ op: 'renameAlbum', albumId, old: oldTitle, new: title }); await GP.rpc('SVP9Xd', [albumId, title]);
  };
  // Deletes the album only; its photos stay in the library. Refused (code 3) for albums someone else owns.
  GP.deleteAlbum = async (albumId, title) => {
    GP.log({ op: 'deleteAlbum', albumId, title }); await GP.rpc('nV6Qv', [[albumId]]);
  };
  // Moves items to Trash by dedup key. Removes them from every album and synced phone.
  GP.trash = async (dedupKeys, note) => {
    GP.log({ op: 'trash', note, keys: dedupKeys });
    for (const c of chunks(dedupKeys, 100)) await retry(() => GP.rpc('XwAOJf', [null, 1, c, 3]));
  };
  // Pass the old description so it can be put back.
  GP.setDescription = async (mediaId, text, oldText) => {
    GP.log({ op: 'setDescription', mediaId, old: oldText, new: text }); await GP.rpc('AQNOFd', [mediaId, text]);
  };
  // place = {pid:'ChIJ…', ll:[latE7,lngE7], t:typeEnum} from GP.findPlace. Only for items with no location.
  GP.setLocation = async (dedupKeys, place) => {
    GP.log({ op: 'setLocation', place, keys: dedupKeys });
    for (const c of chunks(dedupKeys, 50))
      await retry(() => GP.rpc('EtUHOe', [c.map((k) => [null, k]), [2, place.ll, null, [null, null, place.t], place.pid]]));
  };
  GP.clearLocation = async (dedupKeys) => {
    GP.log({ op: 'clearLocation', keys: dedupKeys });
    for (const c of chunks(dedupKeys, 50)) await retry(() => GP.rpc('EtUHOe', [c.map((k) => [null, k]), [1]]));
  };
  // Resolve a place name with the Maps library already on the page. Check desc before using it.
  GP.findPlace = async (query, bias) => {
    const T = { locality: 1, administrative_area_level_1: 2, country: 3, premise: 5, natural_feature: 6, sublocality: 7, neighborhood: 7, street_address: 8 };
    const svc = new google.maps.places.AutocompleteService(), ps = new google.maps.places.PlacesService(document.createElement('div'));
    const req = { input: query }; if (bias) req.locationBias = { center: { lat: bias.lat, lng: bias.lng }, radius: bias.radius || 50000 };
    const pr = await new Promise((r) => svc.getPlacePredictions(req, (a) => r(a || [])));
    if (!pr.length) return null;
    const d = await new Promise((r) => ps.getDetails({ placeId: pr[0].place_id, fields: ['geometry'] }, r));
    let t = 4; for (const ty of pr[0].types) if (T[ty]) { t = T[ty]; break; }
    return { pid: pr[0].place_id, ll: [Math.round(d.geometry.location.lat() * 1e7), Math.round(d.geometry.location.lng() * 1e7)], t, desc: pr[0].description };
  };

  // ---------- tools ----------
  // Run a long task in the background: GP.job('scan', async (s) => { ...; s.done++ }). Poll GP.jobs.scan.
  GP.job = (name, fn) => {
    const s = (GP.jobs[name] = { state: 'run', done: 0, started: Date.now() });
    fn(s).then((r) => { s.state = 'done'; s.result = r; }).catch((e) => { s.state = 'error: ' + e; });
    return 'started ' + name;
  };
  // Numbered contact sheet over the page. items: [{u}], opts: {w, h, label(i, item), mark(item) -> css outline}
  GP.sheet = (items, opts = {}) => {
    GP.closeSheet(); const w = opts.w || 96, h = opts.h || 64;
    const d = document.createElement('div'); d.id = '__gp_sheet';
    d.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#fff;overflow:auto;padding:2px;display:flex;flex-wrap:wrap;gap:2px;align-content:flex-start;font:10px sans-serif';
    items.forEach((x, i) => {
      const c = document.createElement('div'); c.style.cssText = 'position:relative;width:' + w + 'px;height:' + h + 'px';
      if (opts.mark && opts.mark(x)) c.style.outline = opts.mark(x);
      const im = document.createElement('img'); im.src = x.u + '=w' + w + '-h' + h + '-c'; im.style.cssText = 'width:' + w + 'px;height:' + h + 'px';
      const s = document.createElement('span'); s.textContent = opts.label ? opts.label(i, x) : i;
      s.style.cssText = 'position:absolute;left:0;top:0;background:#000;color:#ff0;padding:0 2px';
      c.append(im, s); d.appendChild(c);
    });
    document.body.appendChild(d); return items.length;
  };
  GP.closeSheet = () => { const e = document.getElementById('__gp_sheet'); if (e) e.remove(); };
  // 16x16 grey fingerprint of a thumbnail (Uint8Array of 256), and the mean difference of two.
  GP.fingerprint = async (u) => {
    const b = await (await fetch(u + '=w96-h96-c', { credentials: 'include' })).blob(), im = await createImageBitmap(b);
    const cv = new OffscreenCanvas(16, 16), cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, 16, 16);
    const p = cx.getImageData(0, 0, 16, 16).data, a = new Uint8Array(256);
    for (let i = 0; i < 256; i++) a[i] = (p[i * 4] * 0.3 + p[i * 4 + 1] * 0.59 + p[i * 4 + 2] * 0.11) | 0;
    return a;
  };
  GP.diff = (a, b) => { let s = 0; for (let i = 0; i < 256; i++) s += Math.abs(a[i] - b[i]); return s / 256; };
  // Read-only health check of the calls. Run before each sweep.
  GP.selfTest = async () => {
    const r = {}; const al = await GP.albums(); r.albums = al.length;
    const a = al.find((x) => x.count > 0); const it = a ? await GP.albumItems(a.id) : [];
    r.albumItems = it.length; r.itemShape = !!(it[0] && it[0].id && it[0].k && it[0].w && it[0].t);
    r.info = it[0] ? !!(await GP.info(it[0].id)) : false;
    let n = 0; await GP.library(() => n++, 1); r.libraryFirstPage = n;
    r.pass = r.albums > 0 && r.itemShape && r.info && n > 0; return r;
  };
  // End of session: remove everything this skill left in the browser. keep = regex of key names to spare.
  GP.cleanup = (keep) => {
    const ks = Object.keys(localStorage).filter((k) => k.startsWith('__') && !(keep && keep.test(k)));
    ks.forEach((k) => localStorage.removeItem(k)); GP.closeSheet(); return ks.length;
  };
  return 'GP ' + GP.version + ' ready';
}
__gpInit();
try { localStorage.__gp = __gpInit.toString() + ';__gpInit();'; } catch (e) {}
