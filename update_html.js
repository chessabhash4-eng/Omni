const fs = require('fs');

const img_1st = "C:\\Users\\abhas\\.gemini\\antigravity\\brain\\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\\premium_high_performance_tablet_1785920062225.png";
const img_2nd = "C:\\Users\\abhas\\.gemini\\antigravity\\brain\\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\\pro_gaming_headset_smartwatch_combo_1785920078187.png";
const img_3rd = "C:\\Users\\abhas\\.gemini\\antigravity\\brain\\90319b14-d12b-4da3-8f09-8d2ca2fcc7cc\\high_end_smartwatch_1785920095836.png";

const b64_1st = fs.readFileSync(img_1st, 'base64');
const b64_2nd = fs.readFileSync(img_2nd, 'base64');
const b64_3rd = fs.readFileSync(img_3rd, 'base64');

const index_path = "c:\\Users\\abhas\\Downloads\\omni-olympiard\\omni-olympiard\\index.html";
let html = fs.readFileSync(index_path, 'utf8');

const block_2nd_old = `          <div>
            <span class="podium-rank-badge badge-2nd">🥈 2nd Rank</span>
            <div class="podium-product-wrap">
              <img src="assets/ipad.jpg" alt="Apple iPad Air 5th Gen" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Runner-Up</h3>
            <div class="podium-model">Apple iPad Air (5th Gen)</div>
          </div>`;
const block_2nd_new = `          <div>
            <span class="podium-rank-badge badge-2nd">🥈 2nd Rank</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,${b64_2nd}" alt="Pro Gaming Headset + AMOLED Smartwatch Combo" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Runner-Up</h3>
            <div class="podium-model">Pro Gaming Headset + AMOLED Smartwatch Combo</div>
          </div>`;
html = html.replace(block_2nd_old, block_2nd_new);

const block_1st_old = `          <div>
            <span class="podium-rank-badge badge-1st">👑 1st Rank Champion</span>
            <div class="podium-product-wrap">
              <img src="assets/macbook.jpg" alt="Apple MacBook Pro M2" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Grand Champion</h3>
            <div class="podium-model">Apple MacBook Pro M2</div>
          </div>`;
const block_1st_new = `          <div>
            <span class="podium-rank-badge badge-1st">👑 1st Rank Champion</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,${b64_1st}" alt="Premium High-Performance Tablet" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Grand Champion</h3>
            <div class="podium-model">Premium High-Performance Tablet</div>
          </div>`;
html = html.replace(block_1st_old, block_1st_new);

const block_3rd_old = `          <div>
            <span class="podium-rank-badge badge-3rd">🥉 3rd Rank</span>
            <div class="podium-product-wrap">
              <img src="assets/watch.jpg" alt="Apple Smart Watch" class="podium-product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80';" />
            </div>
            <h3 class="podium-prize-title">Achiever</h3>
            <div class="podium-model">Apple Smart Watch</div>
          </div>`;
const block_3rd_new = `          <div>
            <span class="podium-rank-badge badge-3rd">🥉 3rd Rank</span>
            <div class="podium-product-wrap">
              <img src="data:image/png;base64,${b64_3rd}" alt="High-End Smartwatch" class="podium-product-img" loading="lazy" />
            </div>
            <h3 class="podium-prize-title">Achiever</h3>
            <div class="podium-model">High-End Smartwatch</div>
          </div>`;
html = html.replace(block_3rd_old, block_3rd_new);

const block_4_old = `          <div class="tier-content">
            <h4>Next 50 Ranks</h4>
            <p>₹1,000 Cash Prize + Gold Medal</p>
            <span class="tier-tag">Class &amp; Subject Wise (Ranks 4–50)</span>
          </div>`;
const block_4_new = `          <div class="tier-content">
            <h4>Next 50 Ranks</h4>
            <p>Cash Vouchers, Official Gold Medals, and Certificates of Merit</p>
            <span class="tier-tag">Class &amp; Subject Wise (Ranks 4–50)</span>
          </div>`;
html = html.replace(block_4_old, block_4_new);

const lead_old = `          Awarded separately for EVERY Class (1–12) and EVERY Olympiad Subject for National Champions!\n          Compete to win Apple MacBooks, Apple iPad Airs, Apple Smart Watches, ₹1,000 Cash Prizes &amp; Merit Certificates.`;
const lead_new = `          Awarded separately for EVERY Class (1–12) and EVERY Olympiad Subject for National Champions!\n          Compete to win Premium High-Performance Tablets, Pro Gaming Headsets, AMOLED Smartwatches, Cash Vouchers &amp; Merit Certificates.`;
html = html.replace(lead_old, lead_new);

const terms_old = `<p>1st Rank wins an Apple MacBook Pro M2; 2nd Rank wins an Apple iPad Air (5th Gen); 3rd Rank wins an Apple Smart Watch. Ranks 4 to 50 will receive a ₹1,000 Cash Prize, Official Gold Medal, and Certificate of Merit.</p>`;
const terms_new = `<p>1st Rank wins a Premium High-Performance Tablet; 2nd Rank wins a Pro Gaming Headset + AMOLED Smartwatch Combo; 3rd Rank wins a High-End Smartwatch. Ranks 4 to 50 will receive Cash Vouchers, Official Gold Medals, and Certificates of Merit.</p>`;
html = html.replace(terms_old, terms_new);

const bullet_old = `<li>✔ Apple MacBooks, iPad Airs, Smartwatches &amp; Medals for toppers</li>`;
const bullet_new = `<li>✔ Premium Tablets, Gaming Headsets, Smartwatches &amp; Medals for toppers</li>`;
html = html.replace(bullet_old, bullet_new);

fs.writeFileSync(index_path, html);
console.log('Updated index.html');
