import base64
import os

img_1st = r"C:\Users\abhas\.gemini\antigravity\brain\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\premium_high_performance_tablet_1785920062225.png"
img_2nd = r"C:\Users\abhas\.gemini\antigravity\brain\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\pro_gaming_headset_smartwatch_combo_1785920078187.png"
img_3rd = r"C:\Users\abhas\.gemini\antigravity\brain\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\high_end_smartwatch_1785920095836.png"

with open(img_1st, "rb") as f:
    b64_1st = base64.b64encode(f.read()).decode("utf-8")
with open(img_2nd, "rb") as f:
    b64_2nd = base64.b64encode(f.read()).decode("utf-8")
with open(img_3rd, "rb") as f:
    b64_3rd = base64.b64encode(f.read()).decode("utf-8")

index_path = r"c:\Users\abhas\Downloads\omni-olympiard\omni-olympiard\index.html"
with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace block 1 (2nd Rank)
block_2nd_old = """          <div>
            <span class="podium-rank-badge badge-2nd">🥈 2nd Rank</span>
            <div class="podium-product-wrap">
              <img src="assets/ipad.jpg" alt="Apple iPad Air 5th Gen" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Runner-Up</h3>
            <div class="podium-model">Apple iPad Air (5th Gen)</div>
          </div>"""
block_2nd_new = f"""          <div>
            <span class="podium-rank-badge badge-2nd">🥈 2nd Rank</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,{b64_2nd}" alt="Pro Gaming Headset + AMOLED Smartwatch Combo" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Runner-Up</h3>
            <div class="podium-model">Pro Gaming Headset + AMOLED Smartwatch Combo</div>
          </div>"""
html = html.replace(block_2nd_old, block_2nd_new)

# Replace block 2 (1st Rank)
block_1st_old = """          <div>
            <span class="podium-rank-badge badge-1st">👑 1st Rank Champion</span>
            <div class="podium-product-wrap">
              <img src="assets/macbook.jpg" alt="Apple MacBook Pro M2" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Grand Champion</h3>
            <div class="podium-model">Apple MacBook Pro M2</div>
          </div>"""
block_1st_new = f"""          <div>
            <span class="podium-rank-badge badge-1st">👑 1st Rank Champion</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,{b64_1st}" alt="Premium High-Performance Tablet" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Grand Champion</h3>
            <div class="podium-model">Premium High-Performance Tablet</div>
          </div>"""
html = html.replace(block_1st_old, block_1st_new)

# Replace block 3 (3rd Rank)
block_3rd_old = """          <div>
            <span class="podium-rank-badge badge-3rd">🥉 3rd Rank</span>
            <div class="podium-product-wrap">
              <img src="assets/watch.jpg" alt="Apple Smart Watch" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Achiever</h3>
            <div class="podium-model">Apple Smart Watch</div>
          </div>"""
block_3rd_new = f"""          <div>
            <span class="podium-rank-badge badge-3rd">🥉 3rd Rank</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,{b64_3rd}" alt="High-End Smartwatch" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Achiever</h3>
            <div class="podium-model">High-End Smartwatch</div>
          </div>"""
html = html.replace(block_3rd_old, block_3rd_new)

# Replace block 4 (Next 50)
block_4_old = """          <div class="tier-content">
            <h4>Next 50 Ranks</h4>
            <p>₹1,000 Cash Prize + Gold Medal</p>
            <span class="tier-tag">Class &amp; Subject Wise (Ranks 4–50)</span>
          </div>"""
block_4_new = """          <div class="tier-content">
            <h4>Next 50 Ranks</h4>
            <p>Cash Vouchers, Official Gold Medals, and Certificates of Merit</p>
            <span class="tier-tag">Class &amp; Subject Wise (Ranks 4–50)</span>
          </div>"""
html = html.replace(block_4_old, block_4_new)

# Replace section lead
lead_old = """          Awarded separately for EVERY Class (1–12) and EVERY Olympiad Subject for National Champions!
          Compete to win Apple MacBooks, Apple iPad Airs, Apple Smart Watches, ₹1,000 Cash Prizes &amp; Merit Certificates."""
lead_new = """          Awarded separately for EVERY Class (1–12) and EVERY Olympiad Subject for National Champions!
          Compete to win Premium High-Performance Tablets, Pro Gaming Headsets, AMOLED Smartwatches, Cash Vouchers &amp; Merit Certificates."""
html = html.replace(lead_old, lead_new)

# Replace terms
terms_old = """<p>1st Rank wins an Apple MacBook Pro M2; 2nd Rank wins an Apple iPad Air (5th Gen); 3rd Rank wins an Apple Smart Watch. Ranks 4 to 50 will receive a ₹1,000 Cash Prize, Official Gold Medal, and Certificate of Merit.</p>"""
terms_new = """<p>1st Rank wins a Premium High-Performance Tablet; 2nd Rank wins a Pro Gaming Headset + AMOLED Smartwatch Combo; 3rd Rank wins a High-End Smartwatch. Ranks 4 to 50 will receive Cash Vouchers, Official Gold Medals, and Certificates of Merit.</p>"""
html = html.replace(terms_old, terms_new)

# Replace all access pass bullet point
bullet_old = """<li>✔ Apple MacBooks, iPad Airs, Smartwatches &amp; Medals for toppers</li>"""
bullet_new = """<li>✔ Premium Tablets, Gaming Headsets, Smartwatches &amp; Medals for toppers</li>"""
html = html.replace(bullet_old, bullet_new)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html")
