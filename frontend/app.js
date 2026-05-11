const API_BASE = "http://localhost:8080/api";
const PLAN_KEY = "voyage.currentPlan";

const interests = ["历史", "美食", "自然", "购物", "休闲", "拍照"];
const paceLabels = { relaxed: "轻松慢游", balanced: "均衡体验", compact: "高效打卡" };
const stateLabels = {
  RELAXED: "轻松",
  STABLE: "平稳",
  FATIGUED: "偏紧凑",
  OVERLOADED: "太累",
};

const mockSpots = [
  spot(1, "武侯祠", "武侯区", "历史文化", 50, 2.5, 96, ["历史", "拍照"], false, 0.56, 0.62, 0.58, 0.38, 0.1, "三国文化核心景点，适合作为成都人文路线起点。", 21, 58),
  spot(2, "锦里古街", "武侯区", "美食街区", 0, 1.8, 91, ["美食", "购物", "拍照"], false, 0.42, 0.32, 0.78, 0.5, 0.28, "紧邻武侯祠，适合衔接小吃与夜景，但节假日人流较多。", 25, 62),
  spot(3, "杜甫草堂", "青羊区", "历史文化", 50, 2.5, 92, ["历史", "自然", "休闲"], false, 0.48, 0.64, 0.42, 0.22, 0.24, "诗意园林与文化展陈结合，游览节奏相对舒缓。", 38, 45),
  spot(4, "宽窄巷子", "青羊区", "历史街区", 0, 2, 89, ["历史", "美食", "购物", "拍照"], false, 0.4, 0.36, 0.82, 0.44, 0.18, "成都老街巷代表，适合拍照和休闲，高峰时段会比较拥挤。", 52, 48),
  spot(5, "人民公园", "青羊区", "公园休闲", 0, 1.2, 86, ["休闲", "自然"], true, 0.16, 0.12, 0.28, 0.08, 0.88, "茶馆、湖边和慢步道很适合放慢节奏。", 48, 57),
  spot(6, "春熙路", "锦江区", "购物商圈", 0, 1.8, 94, ["购物", "美食", "拍照"], false, 0.42, 0.24, 0.86, 0.34, 0.16, "核心商圈，覆盖度高，但人流和停留时间容易增加疲惫感。", 68, 58),
  spot(7, "太古里", "锦江区", "休闲商圈", 0, 1.6, 93, ["购物", "美食", "休闲", "拍照"], true, 0.26, 0.18, 0.62, 0.2, 0.64, "开放式街区和餐饮密集，可作为购物路线里的短休息。", 73, 54),
  spot(8, "成都博物馆", "青羊区", "博物馆", 0, 2.2, 88, ["历史", "拍照"], false, 0.28, 0.78, 0.48, 0.3, 0.12, "展陈丰富，适合文化偏好用户，但连续参观会比较耗神。", 56, 42),
  spot(9, "文殊院", "青羊区", "历史文化", 0, 1.8, 84, ["历史", "休闲", "美食"], false, 0.32, 0.46, 0.36, 0.16, 0.3, "寺院街区节奏平稳，周边小吃适合轻松衔接。", 64, 34),
  spot(10, "东郊记忆", "成华区", "艺术街区", 0, 2, 82, ["拍照", "购物", "休闲"], false, 0.44, 0.38, 0.52, 0.18, 0.22, "工业风街区，适合拍照和文创体验。", 82, 39),
  spot(11, "鹤鸣茶社", "青羊区", "茶馆休息", 0, 0.9, 83, ["休闲", "美食"], true, 0.08, 0.08, 0.3, 0.06, 0.95, "人民公园内的代表性茶社，适合安排 40 分钟中途休息。", 47, 60),
  spot(12, "建设路小吃街", "成华区", "美食街区", 0, 1.5, 87, ["美食", "购物"], false, 0.36, 0.18, 0.76, 0.42, 0.2, "夜间美食选择丰富，适合收尾，但排队概率较高。", 77, 33),
  spot(13, "望平街咖啡带", "锦江区", "咖啡休息", 0, 1, 80, ["休闲", "美食"], true, 0.1, 0.1, 0.34, 0.08, 0.86, "河边咖啡与轻餐集中，适合跨区移动后的短暂停留。", 70, 44),
  spot(14, "青羊宫", "青羊区", "历史文化", 10, 1.5, 79, ["历史", "休闲"], false, 0.3, 0.42, 0.28, 0.1, 0.28, "文化氛围轻松，可和杜甫草堂、人民公园形成低压力路线。", 40, 54),
  spot(15, "奎星楼街", "青羊区", "美食街区", 0, 1.4, 85, ["美食", "休闲", "拍照"], false, 0.3, 0.2, 0.66, 0.34, 0.24, "餐饮与小店密集，适合晚间慢逛。", 50, 42),
];

const travelMinutes = [
  [0, 12, 28, 18, 24, 20, 30, 32, 16, 36, 14, 26, 34, 22, 20],
  [12, 0, 24, 14, 18, 16, 26, 28, 12, 34, 10, 24, 32, 18, 16],
  [28, 24, 0, 22, 20, 28, 36, 18, 26, 42, 26, 30, 44, 16, 22],
  [18, 14, 22, 0, 16, 14, 24, 26, 18, 32, 12, 20, 30, 16, 12],
  [24, 18, 20, 16, 0, 12, 18, 22, 24, 30, 18, 16, 26, 14, 16],
  [20, 16, 28, 14, 12, 0, 16, 24, 22, 26, 18, 14, 24, 18, 14],
  [30, 26, 36, 24, 18, 16, 0, 28, 34, 20, 28, 18, 18, 24, 22],
  [32, 28, 18, 26, 22, 24, 28, 0, 30, 38, 30, 26, 36, 20, 26],
  [16, 12, 26, 18, 24, 22, 34, 30, 0, 40, 14, 28, 36, 22, 20],
  [36, 34, 42, 32, 30, 26, 20, 38, 40, 0, 34, 22, 16, 32, 30],
  [14, 10, 26, 12, 18, 18, 28, 30, 14, 34, 0, 22, 32, 18, 14],
  [26, 24, 30, 20, 16, 14, 18, 26, 28, 22, 22, 0, 20, 18, 20],
  [34, 32, 44, 30, 26, 24, 18, 36, 36, 16, 32, 20, 0, 30, 28],
  [22, 18, 16, 16, 14, 18, 24, 20, 22, 32, 18, 18, 30, 0, 16],
  [20, 16, 22, 12, 16, 14, 22, 26, 20, 30, 14, 20, 28, 16, 0],
];

const app = {
  spots: [...mockSpots],
  selectedInterests: ["历史", "美食", "拍照"],
  rhythm: {
    pace: "balanced",
    walkingTolerance: "medium",
    crowdSensitivity: "medium",
    comfortPreference: "comfort",
  },
  plan: null,
  versions: [],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function spot(id, name, district, category, ticketPrice, stayDuration, popularity, tags, isRecoveryNode, physicalLoad, cognitiveLoad, crowdLoad, queueLoad, recoveryValue, description, x, y) {
  return {
    id,
    name,
    city: "成都",
    district,
    category,
    ticketPrice,
    stayDuration,
    popularity,
    tags,
    isRecoveryNode,
    physicalLoad,
    cognitiveLoad,
    crowdLoad,
    queueLoad,
    recoveryValue,
    description,
    x,
    y,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
  };
}

async function init() {
  await loadSpots();
  app.plan = loadPlan();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "planner") initPlanner();
  if (page === "result") initResult();
  if (page === "detail") initDetail();
  if (page === "adjust") initAdjust();
}

async function loadSpots() {
  try {
    const response = await fetch(`${API_BASE}/spots?city=成都`);
    const body = await response.json();
    if (body.success && Array.isArray(body.data) && body.data.length) {
      app.spots = body.data.map((item, index) => ({ ...item, x: mockSpots[index]?.x || 50, y: mockSpots[index]?.y || 50 }));
    }
  } catch {
    app.spots = [...mockSpots];
  }
}

function initHome() {
  renderMiniMap("#home-map", null, { preview: true });
}

function initPlanner() {
  renderInterestChips();
  bindSegmented();
  renderPlannerMap();
  $("#planner-form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitGenerate();
  });
  $("#load-demo")?.addEventListener("click", loadDemo);
  $("#parse-demand")?.addEventListener("click", parseDemand);
  initResizable(); // 初始化可调节分栏
}

function initResult() {
  ensurePlan();
  renderResultPage();
}

function initDetail() {
  ensurePlan();
  renderDetailPage();
}

function initAdjust() {
  ensurePlan();
  bindSegmented();
  renderAdjustPage();
}

function ensurePlan() {
  if (!app.plan) {
    app.plan = generateMockPlan(defaultDemand());
    savePlan(app.plan);
  }
}

function bindSegmented() {
  $$(".segmented").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      group.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
      app.rhythm[group.dataset.group] = button.dataset.value;
      renderPlannerMap();
    });
  });
}

function renderInterestChips() {
  const container = $("#interest-chips");
  if (!container) return;
  container.innerHTML = interests
    .map((interest) => `<button type="button" class="chip ${app.selectedInterests.includes(interest) ? "active" : ""}" data-interest="${interest}">${interest}</button>`)
    .join("");

  $$("#interest-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const set = new Set(app.selectedInterests);
      set.has(chip.dataset.interest) ? set.delete(chip.dataset.interest) : set.add(chip.dataset.interest);
      app.selectedInterests = Array.from(set);
      chip.classList.toggle("active");
      renderPlannerMap();
    });
  });
}

function renderPlannerMap() {
  const demand = collectDemand({ quiet: true });
  const previewSpots = app.spots
    .filter((item) => item.city === "成都")
    .map((item) => ({ spot: item, score: scoreSpot(item, demand), reason: reasonSpot(item, demand) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  renderMiniMap("#planner-map", { days: [{ nodes: previewSpots.map((item, index) => node(item, 540 + index * 70, 50, "RELAXED", "STABLE", 28, isRecovery(item.spot), item.spot.description)) }] }, { preview: true });
  const list = $("#planner-preview-list");
  if (!list) return;
  list.innerHTML = previewSpots
    .map((item) => `<li><strong>${item.spot.name}</strong><span>${isRecovery(item.spot) ? "适合作为中途休息" : item.reason}</span></li>`)
    .join("");
}

function renderResultPage() {
  const plan = app.plan;
  const restCount = allNodes(plan).filter((item) => item.isRecoveryNode).length;
  $("#result-summary").innerHTML = `
    <div class="summary-card wide">
      <p class="eyebrow">Route Overview</p>
      <h1>${plan.demand.destination} ${plan.demand.days} 日路线</h1>
      <p>${plan.summary}</p>
      <div class="summary-metrics">
        <div><span>预计花费</span><strong>${Math.round(plan.totalCost)} 元</strong></div>
        <div><span>总时长</span><strong>${round(plan.totalHours)} 小时</strong></div>
        <div><span>整体节奏</span><strong>${paceLabels[plan.demand.pace]}</strong></div>
        <div><span>中途休息</span><strong>${restCount} 处</strong></div>
      </div>
    </div>
  `;
  renderMiniMap("#result-map", plan);
  $("#result-days").innerHTML = plan.days.map(renderDaySummary).join("");
  $("#result-insights").innerHTML = renderInsights(plan);
}

function renderDaySummary(day) {
  const restCount = (day.nodes || []).filter((item) => item.isRecoveryNode).length;
  return `
    <article class="route-card">
      <div class="route-card-head">
        <div>
          <p>Day ${day.dayNo}</p>
          <h3>${dayTitle(day)}</h3>
        </div>
        <span class="state-pill ${stateClass(day.rhythmState)}">${stateLabels[day.rhythmState]}</span>
      </div>
      <div class="day-tip">
        <span>${riskText(day.fatigueRisk)}</span>
        ${riskBar(day.fatigueRisk)}
      </div>
      <p>${restCount ? `安排了 ${restCount} 个中途休息点，让当天不至于一路赶。` : "当天路线比较顺，不需要额外休息点。"}</p>
      <div class="route-actions">
        <a class="secondary-link" href="detail.html?day=${day.dayNo}">查看当天详情</a>
      </div>
    </article>
  `;
}

function renderDetailPage() {
  const dayNo = Number(new URLSearchParams(location.search).get("day")) || 1;
  const day = app.plan.days.find((item) => item.dayNo === dayNo) || app.plan.days[0];
  $("#detail-heading").innerHTML = `
    <p class="eyebrow">Day ${day.dayNo}</p>
    <h1>${dayTitle(day)}</h1>
    <p>${riskText(day.fatigueRisk)}，全程约 ${round(day.totalHours)} 小时，交通约 ${Math.round(day.travelMinutes)} 分钟。</p>
  `;
  renderMiniMap("#detail-map", { ...app.plan, days: [day] });
  $("#detail-timeline").innerHTML = (day.nodes || []).map(renderTimelineNode).join("");
  $("#detail-explain").innerHTML = `
    <article class="insight-card">
      <h3>为什么这样安排</h3>
      <p>${day.interventions?.length ? day.interventions.join(" ") : "当天景点之间移动比较顺，所以以路线连贯和游玩体验为主。"}</p>
      ${riskBar(day.fatigueRisk)}
    </article>
  `;
}

function renderTimelineNode(nodeItem) {
  const item = nodeItem.item?.spot || nodeItem.spot || {};
  return `
    <article class="timeline-card ${nodeItem.isRecoveryNode ? "rest" : ""}">
      <time>${nodeItem.arriveTime}<span>${nodeItem.leaveTime}</span></time>
      <div>
        <div class="node-title">
          <h3>${item.name}</h3>
          <span>${nodeItem.isRecoveryNode ? "中途休息点" : item.category || "景点"}</span>
        </div>
        <p>${nodeItem.isRecoveryNode ? restReason(nodeItem) : naturalReason(nodeItem)}</p>
        <em>${stateLabels[nodeItem.stateBefore]} 到 ${stateLabels[nodeItem.stateAfter]} · ${riskText(nodeItem.fatigueRisk)}</em>
      </div>
    </article>
  `;
}

function renderAdjustPage() {
  const plan = app.plan;
  renderMiniMap("#adjust-map", plan);
  $("#adjust-summary").innerHTML = `
    <h1>把路线调到更适合你</h1>
    <p>当前是 ${paceLabels[plan.demand.pace]}，共 ${plan.days.length} 天。你可以直接放慢节奏、增加休息点，或删掉不想去的地方。</p>
  `;
  const selectedOptions = plan.selected.map((item) => `<option value="${item.spot.id}">${item.spot.name}</option>`).join("");
  $("#adjust-form").innerHTML = `
    <div class="quick-actions large">
      <button type="button" data-action="lighter">改轻松一点</button>
      <button type="button" data-action="moreRecovery">增加休息点</button>
      <button type="button" data-action="lessWalking">减少步行</button>
      <button type="button" data-action="shortenDay">缩短当天路线</button>
    </div>
    <label>
      预算
      <input id="adjust-budget" type="number" min="300" step="100" value="${plan.demand.budget}" />
    </label>
    <label>
      旅行风格
      <select id="adjust-pace">
        <option value="relaxed" ${plan.demand.pace === "relaxed" ? "selected" : ""}>轻松慢游</option>
        <option value="balanced" ${plan.demand.pace === "balanced" ? "selected" : ""}>均衡体验</option>
        <option value="compact" ${plan.demand.pace === "compact" ? "selected" : ""}>高效打卡</option>
      </select>
    </label>
    <label>
      删除一个不想去的地方
      <select id="remove-spot"><option value="">不删除</option>${selectedOptions}</select>
    </label>
    <button class="primary-btn" type="submit">重新生成路线</button>
  `;
  $$(".quick-actions button").forEach((button) => button.addEventListener("click", () => submitReplan(button.dataset.action)));
  $("#adjust-form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitReplan("");
  });
}

function renderInsights(plan) {
  return `
    <section class="insight-card">
      <p class="eyebrow">Why This Route</p>
      <h3>为什么这样安排</h3>
      <div class="insight-list">
        ${plan.days.map((day) => `<p><strong>Day ${day.dayNo}</strong>${day.interventions?.length ? day.interventions.join(" ") : "当天移动比较顺，不需要额外加休息。"}</p>`).join("")}
      </div>
    </section>
  `;
}

function renderMiniMap(selector, plan, options = {}) {
  const container = $(selector);
  if (!container) return;
  const nodes = plan ? allNodes(plan) : mockSpots.slice(0, 8).map((item, index) => node({ spot: item, score: 0.7, reason: item.description }, 540 + index * 50, 45, "RELAXED", "STABLE", 30, item.isRecoveryNode, item.description));
  container.innerHTML = `
    <div class="map-canvas">
      <div class="map-river"></div>
      <div class="map-road road-a"></div>
      <div class="map-road road-b"></div>
      ${nodes.map((nodeItem, index) => renderMapPin(nodeItem, index, options)).join("")}
      <div class="map-legend">
        <span><i></i>景点</span>
        <span><i class="rest-dot"></i>中途休息</span>
      </div>
    </div>
  `;
}

function renderMapPin(nodeItem, index) {
  const item = nodeItem.item?.spot || nodeItem.spot || {};
  const x = item.x || 50;
  const y = item.y || 50;
  return `
    <button class="map-pin ${nodeItem.isRecoveryNode || isRecovery(item) ? "rest" : ""}" style="left:${x}%;top:${y}%;" type="button" title="${item.name}">
      <span>${index + 1}</span>
      <strong>${item.name}</strong>
    </button>
  `;
}

function loadDemo() {
  $("#rawText").value = "我想去成都玩 3 天，预算 1600，喜欢历史、美食和拍照，希望不要太累，中午能安排茶馆休息，也不想排太久队。";
  $("#destination").value = "成都";
  $("#days").value = 3;
  $("#budget").value = 1600;
  $("#constraints").value = "中午休息，避免连续安排太累的地方";
  app.selectedInterests = ["历史", "美食", "拍照"];
  app.rhythm = { pace: "balanced", walkingTolerance: "medium", crowdSensitivity: "high", comfortPreference: "comfort" };
  $("#needNoonRest").checked = true;
  syncSegmented();
  renderInterestChips();
  renderPlannerMap();
}

async function parseDemand() {
  const text = $("#rawText").value.trim();
  if (!text) return;
  try {
    const body = await postJson(`${API_BASE}/demand/parse`, { text });
    if (body.success) {
      applyParsedDemand(body.data);
      return;
    }
  } catch {
    // Backend is optional for static preview.
  }
  applyParsedDemand(localParse(text));
}

function localParse(text) {
  const matchBudget = text.match(/预算\s*(\d+)|(\d+)\s*元/);
  return {
    destination: "成都",
    days: Number((text.match(/(\d+)\s*天/) || [])[1]) || 3,
    budget: Number(matchBudget?.[1] || matchBudget?.[2]) || 1600,
    interests: interests.filter((item) => text.includes(item)),
    pace: text.includes("轻松") || text.includes("不累") || text.includes("慢") ? "relaxed" : text.includes("多玩") || text.includes("打卡") || text.includes("紧凑") ? "compact" : "balanced",
    walkingTolerance: text.includes("少走路") ? "low" : "medium",
    crowdSensitivity: text.includes("排队") || text.includes("拥挤") || text.includes("人多") ? "high" : "medium",
    comfortPreference: text.includes("多玩") || text.includes("打卡") ? "coverage" : "comfort",
    needNoonRest: text.includes("午休") || text.includes("休息") || text.includes("茶馆") || text.includes("咖啡"),
    constraints: text,
  };
}

function applyParsedDemand(data) {
  $("#destination").value = data.destination || "成都";
  $("#days").value = data.days || 3;
  $("#budget").value = data.budget || 1600;
  $("#constraints").value = data.constraints || $("#constraints").value;
  app.selectedInterests = data.interests?.length ? data.interests : app.selectedInterests;
  app.rhythm.pace = data.pace || app.rhythm.pace;
  app.rhythm.walkingTolerance = data.walkingTolerance || app.rhythm.walkingTolerance;
  app.rhythm.crowdSensitivity = data.crowdSensitivity || app.rhythm.crowdSensitivity;
  app.rhythm.comfortPreference = data.comfortPreference || app.rhythm.comfortPreference;
  $("#needNoonRest").checked = Boolean(data.needNoonRest);
  syncSegmented();
  renderInterestChips();
  renderPlannerMap();
}

function syncSegmented() {
  $$(".segmented").forEach((group) => {
    group.querySelectorAll("button").forEach((button) => button.classList.toggle("active", app.rhythm[group.dataset.group] === button.dataset.value));
  });
}

function collectDemand(options = {}) {
  const fallback = defaultDemand();
  return {
    rawText: $("#rawText")?.value.trim() || fallback.rawText,
    destination: $("#destination")?.value.trim() || "成都",
    days: Number($("#days")?.value) || fallback.days,
    budget: Number($("#budget")?.value) || fallback.budget,
    interests: app.selectedInterests.length ? app.selectedInterests : ["历史"],
    pace: app.rhythm.pace,
    constraints: $("#constraints")?.value.trim() || "",
    walkingTolerance: app.rhythm.walkingTolerance,
    needNoonRest: $("#needNoonRest")?.checked ?? true,
    crowdSensitivity: app.rhythm.crowdSensitivity,
    comfortPreference: app.rhythm.comfortPreference,
    quiet: options.quiet,
  };
}

async function submitGenerate() {
  const demand = collectDemand();
  try {
    const body = await postJson(`${API_BASE}/plans/generate`, demand);
    app.plan = body.success ? normalizeRemotePlan(body.data) : generateMockPlan(demand);
  } catch {
    app.plan = generateMockPlan(demand);
  }
  savePlan(app.plan);
  location.href = "result.html";
}

async function submitReplan(adjustmentType = "") {
  const demand = app.plan?.demand || defaultDemand();
  const payload = {
    demand,
    parentPlanId: app.plan?.parentPlanId || app.plan?.id || null,
    versionNo: app.plan?.versionNo || 1,
    newBudget: Number($("#adjust-budget")?.value) || demand.budget,
    newPace: $("#adjust-pace")?.value || demand.pace,
    adjustmentType,
    removeSpotId: Number($("#remove-spot")?.value) || null,
  };
  try {
    const body = await postJson(`${API_BASE}/plans/replan`, payload);
    app.plan = body.success ? normalizeRemotePlan(body.data) : generateMockPlan({ ...payload.demand, budget: payload.newBudget, pace: payload.newPace }, payload);
  } catch {
    app.plan = generateMockPlan({ ...payload.demand, budget: payload.newBudget, pace: payload.newPace }, payload);
  }
  savePlan(app.plan);
  location.href = "result.html";
}

function normalizeRemotePlan(plan) {
  return {
    ...plan,
    days: (plan.days || []).map((day) => ({
      ...day,
      rhythmState: day.rhythmState || stateFromRisk(day.fatigueRisk || day.fatigue?.score || 30),
      fatigueRisk: day.fatigueRisk ?? Math.round(day.fatigue?.score || 30),
      nodes: (day.nodes || []).map((nodeItem) => {
        const spotItem = nodeItem.item?.spot || nodeItem.spot || {};
        const local = mockSpots.find((item) => item.name === spotItem.name || item.id === spotItem.id);
        return { ...nodeItem, item: { ...(nodeItem.item || {}), spot: { ...spotItem, x: local?.x || 50, y: local?.y || 50 } } };
      }),
    })),
  };
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

function generateMockPlan(inputDemand, options = {}) {
  const demand = normalizeDemand(inputDemand, options);
  const candidates = app.spots
    .filter((item) => item.city === demand.destination && !isRecovery(item) && item.id !== Number(options.removeSpotId))
    .map((item) => ({ spot: item, score: scoreSpot(item, demand), reason: reasonSpot(item, demand) }))
    .sort((a, b) => b.score - a.score || b.spot.popularity - a.spot.popularity);
  const maxSpots = demand.pace === "compact" ? 4 : demand.pace === "relaxed" ? 2 : 3;
  const selected = candidates.slice(0, Math.max(demand.days * 2, demand.days * maxSpots - 1));
  const days = Array.from({ length: demand.days }, (_, index) => ({ dayNo: index + 1, items: [] }));
  selected.forEach((item, index) => {
    if (days[index % days.length].items.length < maxSpots) days[index % days.length].items.push(item);
  });

  const plannedDays = days.map((day) => buildMockDay(day, demand));
  const totalCost = selected.reduce((sum, item) => sum + item.spot.ticketPrice, 0) + plannedDays.reduce((sum, day) => sum + Math.round(day.travelMinutes * 0.8), 0) + demand.days * 220;
  const totalHours = plannedDays.reduce((sum, day) => sum + day.totalHours, 0);
  const match = selected.length ? Math.round((selected.reduce((sum, item) => sum + item.score, 0) / selected.length) * 100) : 0;
  const restCount = plannedDays.flatMap((day) => day.nodes).filter((nodeItem) => nodeItem.isRecoveryNode).length;
  return {
    id: `ROUTE-${Date.now().toString().slice(-5)}`,
    demand,
    selected,
    days: plannedDays,
    totalCost,
    totalHours: round(totalHours),
    match,
    summary: `${demand.destination}${demand.days}日路线：安排 ${selected.length} 个主要地点，穿插 ${restCount} 个中途休息点。`,
    explanations: ["优先把想玩的地方串起来，再根据步行、排队和当天节奏插入休息。"],
    parentPlanId: options.parentPlanId || null,
    versionNo: (options.versionNo || 0) + 1,
  };
}

function buildMockDay(day, demand) {
  let risk = demand.pace === "relaxed" ? 16 : demand.pace === "compact" ? 28 : 22;
  let minute = 9 * 60;
  let travel = 20;
  const nodes = [];
  const interventions = [];
  const ordered = [...day.items].sort((a, b) => a.spot.id - b.spot.id);

  ordered.forEach((item, index) => {
    const transfer = index === 0 ? 20 : travelMinutes[ordered[index - 1].spot.id - 1][item.spot.id - 1];
    if (risk + loadDelta(item.spot, demand, transfer) > 72 || (index > 0 && highLoad(ordered[index - 1].spot) && highLoad(item.spot))) {
      const recovery = nearestRecovery(item.spot, nodes);
      if (recovery) {
        const before = stateFromRisk(risk);
        minute += 12;
        risk = Math.max(16, risk - recovery.recoveryValue * 45);
        nodes.push(node({ spot: recovery, score: 0.8, reason: "这里适合喝茶、散步或坐一会儿，让后半天更舒服。" }, minute, 40, before, stateFromRisk(risk), risk, true, "前面安排较密，先在这里放慢一点。"));
        minute += 40;
        interventions.push(`在 ${item.spot.name} 前加了 ${recovery.name}，避免连续游玩太赶。`);
        travel += 12;
      }
    }
    minute += transfer;
    const before = stateFromRisk(risk);
    risk += loadDelta(item.spot, demand, transfer);
    const stay = Math.round(item.spot.stayDuration * 60);
    nodes.push(node(item, minute, stay, before, stateFromRisk(risk), risk, false, displaySpotReason(item.spot, demand)));
    minute += stay;
    travel += transfer;
  });

  return {
    dayNo: day.dayNo,
    spots: ordered,
    nodes,
    travelMinutes: travel,
    totalHours: round((minute - 9 * 60) / 60),
    fatigue: { label: stateLabels[stateFromRisk(risk)], level: risk > 86 ? "critical" : risk > 68 ? "high" : risk > 38 ? "medium" : "low", score: round(risk) },
    rhythmState: stateFromRisk(risk),
    fatigueRisk: Math.min(100, Math.round(risk)),
    routeReason: "按照相邻距离和当天强度重新平衡路线。",
    interventions,
  };
}

function normalizeDemand(input, options = {}) {
  const demand = { ...input };
  if (options.adjustmentType === "lighter") {
    demand.pace = "relaxed";
    demand.walkingTolerance = "low";
    demand.needNoonRest = true;
    demand.comfortPreference = "comfort";
  }
  if (options.adjustmentType === "moreRecovery") demand.needNoonRest = true;
  if (options.adjustmentType === "lessWalking") demand.walkingTolerance = "low";
  if (options.adjustmentType === "shortenDay") demand.pace = "relaxed";
  if (options.newPace) demand.pace = options.newPace;
  return demand;
}

function node(item, arrive, stayMinutes, before, after, risk, isRecoveryNode, reason) {
  return {
    item,
    arriveTime: time(arrive),
    leaveTime: time(arrive + stayMinutes),
    stateBefore: before,
    stateAfter: after,
    fatigueRisk: round(risk),
    isRecoveryNode,
    reason,
    suggestedStayMinutes: stayMinutes,
  };
}

function defaultDemand() {
  return {
    rawText: "",
    destination: "成都",
    days: 3,
    budget: 1600,
    interests: ["历史", "美食", "拍照"],
    pace: "balanced",
    constraints: "",
    walkingTolerance: "medium",
    needNoonRest: true,
    crowdSensitivity: "medium",
    comfortPreference: "comfort",
  };
}

function savePlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

function loadPlan() {
  try {
    return JSON.parse(localStorage.getItem(PLAN_KEY));
  } catch {
    return null;
  }
}

function allNodes(plan) {
  return (plan?.days || []).flatMap((day) => day.nodes || []);
}

function scoreSpot(item, demand) {
  const matched = demand.interests.filter((interest) => item.tags?.includes(interest)).length / Math.max(demand.interests.length, 1);
  const budget = item.ticketPrice <= demand.budget / Math.max(demand.days, 1) / 2 ? 1 : 0.65;
  let penalty = 0;
  if (demand.walkingTolerance === "low") penalty += item.physicalLoad * 0.1;
  if (demand.crowdSensitivity === "high") penalty += (item.crowdLoad + item.queueLoad) * 0.08;
  if (demand.comfortPreference === "comfort") penalty += (item.physicalLoad + item.cognitiveLoad + item.crowdLoad + item.queueLoad) * 0.03;
  return Math.max(0.2, Math.min(0.99, matched * 0.52 + (item.popularity / 100) * 0.24 + budget * 0.16 - penalty));
}

function reasonSpot(item, demand) {
  const matched = demand.interests.filter((interest) => item.tags?.includes(interest));
  return matched.length ? `符合你想看的 ${matched.join("、")}，并且适合放进这趟路线。` : "作为同城补充地点，让路线更完整。";
}

function displaySpotReason(item, demand) {
  if (item.crowdLoad > 0.72 && demand.crowdSensitivity === "high") return "这里人气高，所以没有连续安排太多同类地点。";
  if (item.cognitiveLoad > 0.68) return "这里适合慢慢看，后面会留出缓冲时间。";
  if (item.physicalLoad > 0.52 && demand.walkingTolerance === "low") return "这里会有一些步行，路线会在前后安排得更松。";
  return "和前后地点顺路，游玩强度比较可控。";
}

function loadDelta(item, demand, transfer) {
  let value = item.physicalLoad * 22 + item.cognitiveLoad * 16 + item.crowdLoad * 14 + item.queueLoad * 12 + transfer * 0.18;
  if (demand.walkingTolerance === "low") value += item.physicalLoad * 14;
  if (demand.crowdSensitivity === "high") value += (item.crowdLoad + item.queueLoad) * 10;
  if (demand.pace === "relaxed") value *= 1.1;
  return value;
}

function nearestRecovery(target, existingNodes) {
  return app.spots
    .filter((item) => isRecovery(item) && !existingNodes.some((nodeItem) => nodeItem.item.spot.id === item.id))
    .sort((a, b) => travelMinutes[target.id - 1][a.id - 1] - travelMinutes[target.id - 1][b.id - 1])[0];
}

function highLoad(item) {
  return item.physicalLoad + item.cognitiveLoad + item.crowdLoad + item.queueLoad >= 2.05;
}

function stateFromRisk(risk) {
  if (risk < 34) return "RELAXED";
  if (risk < 62) return "STABLE";
  if (risk < 86) return "FATIGUED";
  return "OVERLOADED";
}

function dayTitle(day) {
  const names = (day.nodes || []).filter((nodeItem) => !nodeItem.isRecoveryNode).slice(0, 2).map((nodeItem) => nodeItem.item?.spot?.name).filter(Boolean);
  return names.length ? names.join(" + ") : "自由探索";
}

function restReason(nodeItem) {
  return nodeItem.reason || "这里适合坐下来休息，让后面的行程不那么赶。";
}

function naturalReason(nodeItem) {
  return nodeItem.reason || "和前后地点顺路，适合安排在这个时间段。";
}

function riskText(value = 0) {
  if (value < 38) return "今天比较轻松";
  if (value < 68) return "节奏平稳";
  if (value < 86) return "略微偏赶";
  return "建议放慢一点";
}

function riskBar(value) {
  return `<div class="risk-bar"><span style="width:${Math.min(100, Math.max(0, value))}%"></span><strong>${Math.round(value)}%</strong></div>`;
}

function stateClass(value) {
  return String(value || "").toLowerCase();
}

function isRecovery(item) {
  return Boolean(item?.isRecoveryNode ?? item?.recoveryNode);
}

function time(minute) {
  const value = minute % (24 * 60);
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function round(value) {
  return Math.round(value * 10) / 10;
}

// ===== 可调节分栏功能 =====
function initResizable() {
  const resizer = document.getElementById('resizer');
  const leftPanel = document.getElementById('left-panel');
  const container = document.getElementById('resizable-section');
  
  if (!resizer || !leftPanel || !container) return;
  
  let isResizing = false;
  let startX = 0;
  let startLeftWidth = 0;
  
  resizer.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isResizing = true;
    startX = e.clientX;
    startLeftWidth = leftPanel.offsetWidth;
    resizer.classList.add('resizing');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const overlay = document.createElement('div');
    overlay.className = 'resizing-overlay';
    overlay.id = 'resizing-overlay';
    document.body.appendChild(overlay);
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    let newWidth = startLeftWidth + deltaX;
    const containerWidth = container.offsetWidth;
    
    if (newWidth < 300) newWidth = 300;
    if (newWidth > containerWidth - 400) newWidth = containerWidth - 400;
    
    leftPanel.style.flex = '0 0 ' + newWidth + 'px';
  });
  
  document.addEventListener('mouseup', function() {
    if (!isResizing) return;
    isResizing = false;
    resizer.classList.remove('resizing');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    
    const overlay = document.getElementById('resizing-overlay');
    if (overlay) overlay.remove();
  });
  
  // 双击重置
  resizer.addEventListener('dblclick', function() {
    leftPanel.style.flex = '0 0 430px';
  });
}

init();
