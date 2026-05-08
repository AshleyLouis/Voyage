const interests = ["历史", "美食", "自然", "购物", "休闲", "拍照"];

const spots = [
  {
    id: 1,
    name: "故宫博物院",
    city: "北京",
    category: "历史文化",
    ticket: 60,
    duration: 4,
    open: "08:30",
    close: "17:00",
    popularity: 98,
    tags: ["历史", "拍照"],
    desc: "红墙金瓦与宫廷历史，是第一次到北京最值得安排的核心景点。",
    image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "天坛公园",
    city: "北京",
    category: "历史文化",
    ticket: 34,
    duration: 2.5,
    open: "06:00",
    close: "21:00",
    popularity: 88,
    tags: ["历史", "休闲", "拍照"],
    desc: "建筑庄重、园区舒展，适合放在上午或午后慢慢游览。",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "颐和园",
    city: "北京",
    category: "自然风景",
    ticket: 30,
    duration: 3.5,
    open: "06:30",
    close: "20:00",
    popularity: 92,
    tags: ["自然", "历史", "拍照"],
    desc: "湖景、长廊和皇家园林结合，适合自然与拍照偏好的旅行者。",
    image: "https://images.unsplash.com/photo-1625904835715-e9d2f9f23e89?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "南锣鼓巷",
    city: "北京",
    category: "美食街区",
    ticket: 0,
    duration: 2,
    open: "10:00",
    close: "22:00",
    popularity: 84,
    tags: ["美食", "购物", "休闲"],
    desc: "胡同、小吃和文创店集中，适合晚间补充城市生活体验。",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "什刹海",
    city: "北京",
    category: "休闲夜游",
    ticket: 0,
    duration: 2,
    open: "09:00",
    close: "23:00",
    popularity: 82,
    tags: ["休闲", "美食", "拍照"],
    desc: "水岸、胡同和夜景氛围轻松，适合作为一天行程的收尾。",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "王府井",
    city: "北京",
    category: "购物美食",
    ticket: 0,
    duration: 2,
    open: "10:00",
    close: "22:00",
    popularity: 86,
    tags: ["购物", "美食"],
    desc: "商业街区交通方便，适合安排餐饮、购物和自由活动。",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "八达岭长城",
    city: "北京",
    category: "历史自然",
    ticket: 40,
    duration: 5,
    open: "06:30",
    close: "19:00",
    popularity: 95,
    tags: ["历史", "自然", "拍照"],
    desc: "北京标志性景点，适合单独安排半天以上，体力消耗偏高。",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "798 艺术区",
    city: "北京",
    category: "艺术休闲",
    ticket: 0,
    duration: 2.5,
    open: "10:00",
    close: "19:00",
    popularity: 80,
    tags: ["休闲", "拍照", "购物"],
    desc: "展览、咖啡馆和工业风街区，适合年轻人和拍照路线。",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "西湖",
    city: "杭州",
    category: "自然风景",
    ticket: 0,
    duration: 4,
    open: "00:00",
    close: "23:59",
    popularity: 96,
    tags: ["自然", "休闲", "拍照"],
    desc: "湖景和城市生活相连，适合轻松型旅行与拍照路线。",
    image: "https://images.unsplash.com/photo-1628237214979-37d2a2258041?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "河坊街",
    city: "杭州",
    category: "美食街区",
    ticket: 0,
    duration: 2,
    open: "09:00",
    close: "22:00",
    popularity: 82,
    tags: ["美食", "购物", "历史"],
    desc: "传统街区和小吃集中，适合安排在西湖路线后的晚间。",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
  },
];

const travelMinutes = [
  [0, 18, 42, 15, 12, 10, 90, 35, 300, 310],
  [18, 0, 48, 28, 25, 16, 95, 42, 305, 315],
  [42, 48, 0, 38, 32, 45, 72, 58, 285, 296],
  [15, 28, 38, 0, 8, 14, 86, 30, 302, 312],
  [12, 25, 32, 8, 0, 16, 80, 32, 300, 311],
  [10, 16, 45, 14, 16, 0, 92, 38, 306, 316],
  [90, 95, 72, 86, 80, 92, 0, 96, 260, 270],
  [35, 42, 58, 30, 32, 38, 96, 0, 318, 328],
  [300, 305, 285, 302, 300, 306, 260, 318, 0, 22],
  [310, 315, 296, 312, 311, 316, 270, 328, 22, 0],
];

const paceConfig = {
  relaxed: { label: "慢慢逛", maxHours: 6, maxSpots: 2, fatigue: 0.78 },
  balanced: { label: "舒服均衡", maxHours: 8, maxSpots: 3, fatigue: 1 },
  compact: { label: "多玩一些", maxHours: 10, maxSpots: 4, fatigue: 1.2 },
};

const state = {
  demand: {
    rawText: "",
    destination: "北京",
    days: 3,
    budget: 1800,
    interests: ["历史", "美食", "拍照"],
    pace: "balanced",
    constraints: "",
  },
  plan: null,
  versions: [],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function init() {
  renderInterestChips();
  renderFilters();
  renderDestinations();
  bindEvents();
}

function bindEvents() {
  $("#hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#destination").value = $("#hero-destination").value || "北京";
    $("#days").value = $("#hero-days").value || 3;
    $("#budget").value = $("#hero-budget").value || 1800;
    collectDemand();
    generatePlan("快速规划");
    $("#plan").scrollIntoView({ behavior: "smooth" });
  });

  $("#planner-form").addEventListener("submit", (event) => {
    event.preventDefault();
    collectDemand();
    generatePlan("初始方案");
    $("#plan").scrollIntoView({ behavior: "smooth" });
  });

  $("#load-demo").addEventListener("click", loadDemo);
  $("#parse-demand").addEventListener("click", parseRawText);
  $("#spot-search").addEventListener("input", renderDestinations);
  $("#city-filter").addEventListener("change", renderDestinations);
  $("#category-filter").addEventListener("change", renderDestinations);

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.toggle("active", item === tab));
      $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `${tab.dataset.tab}-panel`));
    });
  });

  $("#replan-form").addEventListener("submit", (event) => {
    event.preventDefault();
    replan();
  });
}

function renderInterestChips() {
  $("#interest-chips").innerHTML = interests
    .map((interest) => {
      const active = state.demand.interests.includes(interest) ? " active" : "";
      return `<button type="button" class="chip${active}" data-interest="${interest}">${interest}</button>`;
    })
    .join("");

  $$("#interest-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const selected = new Set(state.demand.interests);
      selected.has(chip.dataset.interest) ? selected.delete(chip.dataset.interest) : selected.add(chip.dataset.interest);
      state.demand.interests = Array.from(selected);
      chip.classList.toggle("active");
    });
  });
}

function renderFilters() {
  const cities = [...new Set(spots.map((spot) => spot.city))];
  const categories = [...new Set(spots.map((spot) => spot.category))];
  $("#city-filter").innerHTML += cities.map((city) => `<option value="${city}">${city}</option>`).join("");
  $("#category-filter").innerHTML += categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function renderDestinations() {
  const query = $("#spot-search").value.trim().toLowerCase();
  const city = $("#city-filter").value;
  const category = $("#category-filter").value;
  const filtered = spots.filter((spot) => {
    const text = [spot.name, spot.city, spot.category, ...spot.tags].join(" ").toLowerCase();
    return (!query || text.includes(query)) && (city === "all" || spot.city === city) && (category === "all" || spot.category === category);
  });

  $("#destination-grid").innerHTML = filtered
    .map(
      (spot) => `
        <article class="destination-card">
          <div class="destination-image" style="--image:url('${spot.image}')">
            <span>${spot.city} · ${spot.category}</span>
          </div>
          <div class="destination-body">
            <h3>${spot.name}</h3>
            <p>${spot.desc}</p>
            <div class="meta-row">
              <span>${spot.duration} 小时</span>
              <span>门票 ${spot.ticket} 元</span>
              <span>热度 ${spot.popularity}</span>
            </div>
            <div class="tag-row">${spot.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          </div>
        </article>
      `,
    )
    .join("");
}

function collectDemand() {
  state.demand = {
    rawText: $("#rawText").value.trim(),
    destination: $("#destination").value.trim() || "北京",
    days: Number($("#days").value) || 1,
    budget: Number($("#budget").value) || 1000,
    interests: state.demand.interests.length ? state.demand.interests : ["历史"],
    pace: $("#pace").value,
    constraints: $("#constraints").value.trim(),
  };
}

function loadDemo() {
  $("#rawText").value = "我想去北京玩 3 天，预算 1800，喜欢历史、美食和拍照，希望不要太累，晚上可以安排休闲街区。";
  $("#destination").value = "北京";
  $("#days").value = 3;
  $("#budget").value = 1800;
  $("#pace").value = "balanced";
  $("#constraints").value = "晚上安排休闲街区";
  state.demand.interests = ["历史", "美食", "拍照"];
  renderInterestChips();
}

function parseRawText() {
  const text = $("#rawText").value.trim();
  if (!text) return;

  const city = ["北京", "杭州"].find((item) => text.includes(item));
  const daysMatch = text.match(/(\d+)\s*天/);
  const budgetMatch = text.match(/预算\s*(\d+)|(\d+)\s*元/);
  const parsedInterests = interests.filter((item) => text.includes(item));

  if (city) $("#destination").value = city;
  if (daysMatch) $("#days").value = daysMatch[1];
  if (budgetMatch) $("#budget").value = budgetMatch[1] || budgetMatch[2];
  if (/轻松|慢|不累|少走路/.test(text)) $("#pace").value = "relaxed";
  if (/紧凑|多玩|充实/.test(text)) $("#pace").value = "compact";
  if (/均衡|适中/.test(text)) $("#pace").value = "balanced";
  if (parsedInterests.length) {
    state.demand.interests = parsedInterests;
    renderInterestChips();
  }
}

function scoreSpot(spot, demand, mustId) {
  const matchCount = demand.interests.filter((interest) => spot.tags.includes(interest)).length;
  const interestScore = matchCount / Math.max(demand.interests.length, 1);
  const popularityScore = spot.popularity / 100;
  const budgetScore = spot.ticket <= demand.budget / Math.max(demand.days, 1) / 2 ? 1 : 0.65;
  const mustBoost = mustId && spot.id === Number(mustId) ? 0.3 : 0;
  return Math.min(0.99, interestScore * 0.56 + popularityScore * 0.26 + budgetScore * 0.18 + mustBoost);
}

function shortestDistances(matrix) {
  const dist = matrix.map((row) => row.slice());
  for (let k = 0; k < dist.length; k += 1) {
    for (let i = 0; i < dist.length; i += 1) {
      for (let j = 0; j < dist.length; j += 1) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
  return dist;
}

function generatePlan(reason, overrides = {}) {
  const demand = { ...state.demand, ...overrides };
  const candidates = spots.filter((spot) => spot.city === demand.destination && spot.id !== Number(overrides.removeId));
  const scored = candidates
    .map((spot) => ({ ...spot, score: scoreSpot(spot, demand, overrides.mustId) }))
    .sort((a, b) => b.score - a.score || b.popularity - a.popularity);

  const count = Math.min(scored.length, Math.max(demand.days * 2, demand.days * paceConfig[demand.pace].maxSpots - 1));
  const selected = scored.slice(0, count);
  const dist = shortestDistances(travelMinutes);
  const days = splitIntoDays(selected, demand, dist);
  const totalTicket = selected.reduce((sum, spot) => sum + spot.ticket, 0);
  const transportCost = days.reduce((sum, day) => sum + Math.round(day.travelMinutes * 0.8), 0);
  const foodAndLocal = demand.days * 260;
  const totalCost = totalTicket + transportCost + foodAndLocal;
  const totalHours = days.reduce((sum, day) => sum + day.totalHours, 0);
  const match = selected.length ? Math.round((selected.reduce((sum, spot) => sum + spot.score, 0) / selected.length) * 100) : 0;

  state.plan = {
    id: `Trip ${state.versions.length + 1}`,
    demand,
    selected,
    days,
    totalCost,
    totalHours,
    match,
  };

  state.versions.unshift({
    id: state.plan.id,
    reason,
    summary: `${demand.destination} ${demand.days} 天 · ${selected.length} 个景点 · 约 ${Math.round(totalCost)} 元`,
  });

  renderPlan();
}

function splitIntoDays(selected, demand, dist) {
  const config = paceConfig[demand.pace];
  const days = Array.from({ length: demand.days }, (_, index) => ({
    dayNo: index + 1,
    spots: [],
  }));

  selected.forEach((spot, index) => {
    const target = days[index % days.length];
    if (target.spots.length < config.maxSpots) target.spots.push(spot);
  });

  return days.map((day) => {
    const ordered = orderByNearby(day.spots, dist);
    const travelMinutes = ordered.reduce((sum, spot, index) => {
      if (index === 0) return sum + 20;
      return sum + dist[ordered[index - 1].id - 1][spot.id - 1];
    }, 0);
    const totalHours = ordered.reduce((sum, spot) => sum + spot.duration, 0) + travelMinutes / 60;
    return {
      ...day,
      spots: ordered,
      travelMinutes,
      totalHours,
      pace: getPaceLevel(totalHours, ordered.length, demand.pace),
    };
  });
}

function orderByNearby(daySpots, dist) {
  const waiting = [...daySpots];
  const ordered = [];
  let current = waiting.shift();
  if (!current) return ordered;
  ordered.push(current);

  while (waiting.length) {
    waiting.sort((a, b) => dist[current.id - 1][a.id - 1] - dist[current.id - 1][b.id - 1]);
    current = waiting.shift();
    ordered.push(current);
  }

  return ordered;
}

function getPaceLevel(hours, count, pace) {
  const score = (hours / paceConfig[pace].maxHours + count / paceConfig[pace].maxSpots) * 50 * paceConfig[pace].fatigue;
  if (score < 70) return { label: "舒适", className: "" };
  if (score < 96) return { label: "适中", className: "medium" };
  return { label: "较满", className: "high" };
}

function renderPlan() {
  const plan = state.plan;
  $("#plan-status").textContent = `${plan.demand.destination} ${plan.demand.days} 天路线已生成，可以继续调整。`;
  $("#summary-card").innerHTML = `
    <h3>${plan.demand.destination} ${plan.demand.days} 日灵感路线</h3>
    <div class="summary-list">
      <div><span>预计花费</span><strong>${Math.round(plan.totalCost)} 元</strong></div>
      <div><span>兴趣匹配</span><strong>${plan.match}%</strong></div>
      <div><span>行程节奏</span><strong>${paceConfig[plan.demand.pace].label}</strong></div>
      <div><span>游玩时长</span><strong>${plan.totalHours.toFixed(1)} 小时</strong></div>
    </div>
  `;

  renderRoute();
  renderRecommendedSpots();
  renderAdjustOptions();
  renderVersions();
}

function renderRoute() {
  $("#route-panel").innerHTML = `
    <div class="day-grid">
      ${state.plan.days
        .map((day) => {
          let hour = 9;
          const items = day.spots
            .map((spot) => {
              const start = `${String(Math.floor(hour)).padStart(2, "0")}:${hour % 1 ? "30" : "00"}`;
              hour += spot.duration + 0.6;
              return `
                <div class="timeline-item">
                  <time>${start}</time>
                  <div>
                    <strong>${spot.name}</strong>
                    <span>${spot.category} · ${spot.duration} 小时 · ${spot.ticket} 元</span>
                  </div>
                </div>
              `;
            })
            .join("");

          return `
            <article class="day-card">
              <div class="day-head">
                <h3>Day ${day.dayNo}</h3>
                <span class="pace-pill ${day.pace.className}">${day.pace.label}</span>
              </div>
              <div class="timeline">${items || "<p>当天留作自由探索。</p>"}</div>
              <div class="meta-row">
                <span>${day.totalHours.toFixed(1)} 小时</span>
                <span>交通约 ${Math.round(day.travelMinutes)} 分钟</span>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderRecommendedSpots() {
  $("#spots-panel").innerHTML = `
    <div class="recommend-grid">
      ${state.plan.selected
        .map(
          (spot) => `
            <article class="recommend-card">
              <div class="destination-image" style="--image:url('${spot.image}')">
                <span>${spot.category}</span>
              </div>
              <div class="recommend-body">
                <h3>${spot.name}</h3>
                <span class="score">匹配度 ${Math.round(spot.score * 100)}%</span>
                <p>${spot.desc}</p>
                <div class="tag-row">${spot.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAdjustOptions() {
  $("#new-budget").value = Math.max(300, Math.round(state.plan.demand.budget - 200));
  $("#new-pace").value = state.plan.demand.pace;
  $("#remove-spot").innerHTML =
    `<option value="">不删除景点</option>` +
    state.plan.selected.map((spot) => `<option value="${spot.id}">${spot.name}</option>`).join("");
  $("#must-spot").innerHTML =
    `<option value="">不添加景点</option>` +
    spots
      .filter((spot) => spot.city === state.plan.demand.destination)
      .map((spot) => `<option value="${spot.id}">${spot.name}</option>`)
      .join("");
}

function renderVersions() {
  $("#version-list").innerHTML = state.versions
    .map((version) => `<div><strong>${version.id} · ${version.reason}</strong><span>${version.summary}</span></div>`)
    .join("");
}

function replan() {
  if (!state.plan) {
    collectDemand();
  } else {
    state.demand = { ...state.plan.demand };
  }

  state.demand.budget = Number($("#new-budget").value) || state.demand.budget;
  state.demand.pace = $("#new-pace").value;
  $("#budget").value = state.demand.budget;
  $("#pace").value = state.demand.pace;

  generatePlan("已调整", {
    budget: state.demand.budget,
    pace: state.demand.pace,
    removeId: $("#remove-spot").value,
    mustId: $("#must-spot").value,
  });
}

init();
