"""Read-only audit of existing project links; never rewrites their URLs."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import json

ROOT = Path(__file__).resolve().parents[1]


def check(url):
    if not urlparse(url).scheme:
        target = ROOT / url
        if target.is_dir(): target /= "index.html"
        result = {"url": url, "status": "local-ok" if target.is_file() else "local-missing"}
        public = check("https://nocturnnn.github.io/Portfolio/" + url)
        result["publicStatus"] = public["status"]
        return result
    try:
        request = Request(url, headers={"User-Agent": "Mozilla/5.0 (Portfolio link validation)"})
        with urlopen(request, timeout=15) as response:
            return {"url": url, "status": response.status, "finalUrl": response.url}
    except HTTPError as error:
        return {"url": url, "status": error.code}
    except (URLError, TimeoutError, OSError) as error:
        return {"url": url, "status": "unverified", "reason": str(error)}


if __name__ == "__main__":
    projects = json.loads((ROOT / "data/projects.json").read_text(encoding="utf-8"))
    urls = list(dict.fromkeys([p["link"] for p in projects] + ["https://www.nocturnshop.com/", "https://github.com/Nocturnnn", "https://www.linkedin.com/in/mateus-vitor-2a3ba7335/", "https://nocturnnn.github.io/Portfolio/"]))
    with ThreadPoolExecutor(max_workers=6) as executor:
        results = list(executor.map(check, urls))
    (ROOT / "docs/link-validation.json").write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for result in results:
        print(result["status"], result["url"])
    print(f"Audited {len(results)} links. 403/429/999 and timeouts are unverified, not necessarily broken.")
