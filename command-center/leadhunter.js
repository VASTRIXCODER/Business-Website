/* AIATWORK Command Center — LeadHunter API helper
   Backend: https://leadhunter-production-b3a8.up.railway.app
   ──────────────────────────────────────────────────────── */
window.LH = {
  baseUrl: 'https://leadhunter-production-b3a8.up.railway.app',

  async _get(path) {
    const r = await fetch(this.baseUrl + path);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  },

  async _post(path, body) {
    const r = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok && r.status !== 409) throw new Error(data.error || ('HTTP ' + r.status));
    return data;
  },

  // List leads with filters / sort / paging
  async fetchLeads(params = {}) {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') p.append(k, v);
    });
    return this._get('/api/leads?' + p.toString());
  },

  // Aggregate stats: total, no_website, hot, avg_score, by_industry[]
  async stats()        { return this._get('/api/stats'); },
  async industries()   { return this._get('/api/industries'); },
  async scrapeStatus() { return this._get('/api/scrape/status'); },
  async scrapeStart(body) { return this._post('/api/scrape/start', body); },
  async scrapeStop()   { return this._post('/api/scrape/stop'); },
};
