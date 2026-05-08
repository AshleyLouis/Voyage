# Voyage 个性化旅游系统后端

这是根据 `一.docx` 与《个性化旅游系统_补充分工与核心算法版》整理出的 Spring Boot 后端实现，面向同级 `Front-end` 页面做接口适配。

## 已实现模块

- 自然语言需求解析：`POST /api/demand/parse`
- 景点查询与详情：`GET /api/spots`、`GET /api/spots/{id}`
- 单人行程生成：`POST /api/plans/generate`
- 动态重规划：`POST /api/plans/replan`
- 群体协同规划：`POST /api/group-plans/generate`
- 前端元数据：`GET /api/meta`

## 核心算法落地

- 哈希查找：景点 ID、城市、类别、标签索引在 `SpotRepository` 中构建。
- Top-K 排序：`TopKPriorityQueue` 使用优先队列保留高匹配候选景点。
- Floyd-Warshall：`FloydShortestPath` 预处理任意两景点最短交通时间。
- TSP 状态压缩 DP：`TspDpPlanner` 优化每日多景点访问顺序。
- 疲劳度控制：`FatigueCalculator` 结合总时长、景点数、交通时间和节奏类型输出疲劳等级。

## 运行方式

本机安装 Maven 后，在本目录运行：

```bash
mvn spring-boot:run
```

默认服务地址：

```text
http://localhost:8080
```

## 示例请求

```bash
curl -X POST http://localhost:8080/api/plans/generate \
  -H "Content-Type: application/json" \
  -d "{\"destination\":\"北京\",\"days\":3,\"budget\":1800,\"interests\":[\"历史\",\"美食\",\"拍照\"],\"pace\":\"balanced\",\"constraints\":\"晚上安排休闲街区\"}"
```

## 前端联调建议

当前前端仍把景点数据和算法写在 `app.js` 中。联调时可以逐步替换：

1. 页面初始化时请求 `GET /api/meta` 和 `GET /api/spots`。
2. 智能填写按钮改为请求 `POST /api/demand/parse`。
3. 生成路线改为请求 `POST /api/plans/generate`。
4. 调整方案改为请求 `POST /api/plans/replan`。

返回结构统一为：

```json
{
  "success": true,
  "data": {},
  "message": "ok"
}
```
