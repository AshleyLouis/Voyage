# 个性化旅游系统数据库说明

本目录先生成数据库结构和示例数据，不改后端接库逻辑。当前后端仍可继续使用内存数据，后续接 MySQL 时可以按这些表做 Entity / Mapper / Repository。

## 文件

- `schema.sql`：数据库、表、主键、外键、索引。
- `seed.sql`：成都主城区核心旅游圈示例数据。
- `amap_fetch_generate.mjs`：调用高德 Web 服务 API 拉取真实 POI，并生成可导入 SQL。
- `generated/`：脚本输出目录。

## 覆盖范围

示例数据以成都主城区为范围，包含：

- 武侯区、青羊区、锦江区、成华区等核心旅游片区；
- 30 个景点/中途休息点；
- 其中 `is_recovery_node = 1` 的地点可作为中途休息点；
- 景点之间核心路径关系；
- 1 条用户需求、1 个示例方案、3 天路线详情。

## 核心表

- `scenic_spot`：景点与中途休息点基础信息。
- `scenic_feature`：兴趣分、强度压力、排队压力、放松价值。
- `route_edge`：景点之间距离、时间、费用和交通方式。
- `user_demand`：用户输入和旅行风格偏好。
- `travel_plan`：方案版本。
- `travel_plan_detail`：每日路线、节点顺序、到离时间、节奏变化和休息点解释。

## 推荐导入顺序

```bash
mysql -u root -p < schema.sql
mysql -u root -p personalized_travel < seed.sql
```

## 使用高德 API 生成真实数据

先在高德开放平台创建 **Web 服务 API** 类型 Key，然后运行：

```powershell
$env:AMAP_KEY="你的高德Web服务Key"
node database/amap_fetch_generate.mjs
```

脚本会输出：

- `database/generated/amap_raw_poi.json`
- `database/generated/amap_scenic_spot.sql`
- `database/generated/amap_route_edge.sql`
- `database/generated/amap_all.sql`

导入真实数据：

```bash
mysql -u root -p personalized_travel < database/generated/amap_all.sql
```

可选环境变量：

- `AMAP_MAX_POIS`：最多保留多少个 POI，默认 `40`
- `AMAP_ROUTE_NODE_LIMIT`：参与路径边生成的节点数量，默认 `25`
- `AMAP_PAGE_LIMIT`：每个关键词翻页数，默认 `1`
- `AMAP_REQUEST_DELAY_MS`：POI 查询间隔，默认 `1000`
- `AMAP_ROUTE_DELAY_MS`：路线查询间隔，默认 `1200`
- `AMAP_MAX_RETRY`：高德限流后的重试次数，默认 `6`

如果出现 `CUQPS_HAS_EXCEEDED_THE_LIMIT 10021`，说明高德接口被限流。先等 1-2 分钟，再用更慢参数重跑：

```powershell
$env:AMAP_REQUEST_DELAY_MS="1500"
$env:AMAP_ROUTE_DELAY_MS="1800"
$env:AMAP_PAGE_LIMIT="1"
$env:AMAP_ROUTE_NODE_LIMIT="20"
node database/amap_fetch_generate.mjs
```

## 与前后端字段关系

前端和后端使用驼峰字段，数据库使用下划线字段：

- `ticketPrice` -> `ticket_price`
- `stayDuration` -> `stay_duration`
- `isRecoveryNode` -> `is_recovery_node`
- `physicalLoad` -> `physical_load`
- `cognitiveLoad` -> `cognitive_load`
- `crowdLoad` -> `crowd_load`
- `queueLoad` -> `queue_load`
- `recoveryValue` -> `recovery_value`
- `walkingTolerance` -> `walking_tolerance`
- `crowdSensitivity` -> `crowd_sensitivity`
- `comfortPreference` -> `comfort_preference`
