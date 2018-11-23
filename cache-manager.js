const CACHE_MANAGE_KEY = "CACHE_MANAGE_KEY";

/**
 * 管理已缓存的数据的key及其时间信息
 * @param {string} cacheKey 缓存的key
 * @param {string} version 缓存的版本
 * @param {number} createTime 缓存的创建时间戳
 * @param {number} maxAge 最大存储时间，单位为秒，-1表示永久存储
 */
function manageCache(cacheKey, version, createTime, maxAge = -1) {
  let cached = localStorage.getItem(CACHE_MANAGE_KEY);
  cached = cached ? JSON.parse(cached) : Object.create(null);
  cached[cacheKey] = {
    key: cacheKey,
    version: version,
    createTime: createTime,
    maxAge: maxAge
  }
  localStorage.setItem(CACHE_MANAGE_KEY, JSON.stringify(cached));
}

/**
 * 清理已过期的缓存
 */
function cleanCache() {
  let cached = localStorage.getItem(CACHE_MANAGE_KEY);
  if (cached) {
    cached = JSON.parse(cached);
    for (let key in cached) {
      let { createTime = 0, maxAge = 0 } = cached[key];
      if (maxAge >= 0 && (createTime + maxAge * 1000) < Date.now()) {
        localStorage.removeItem(key);
        delete cached[key];
      }
    }
    localStorage.setItem(CACHE_MANAGE_KEY, JSON.stringify(cached));
  }
}

/**
 * 缓存请求的数据到localStorage
 * @param {string} cacheKey 缓存的key
 * @param {function} request 请求
 * @param {string} version 缓存的版本
 * @param {number} maxAge 最大存储时间，单位为秒，-1表示永久存储
 */
export function cache(cacheKey, request, version = 0, maxAge = -1) {
  return new Promise((resolve, reject) => {
    cleanCache();
    let cached = localStorage.getItem(cacheKey);
    if (cached) {
      cached = JSON.parse(cached);
      if (cached.version === version) {
        resolve(cached.res);
        return;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }
    request().then(res => {
      let createTime = Date.now();
      localStorage.setItem(cacheKey, JSON.stringify({
        res: res,
        createTime,
        version,
        maxAge
      }));
      manageCache(cacheKey, version, createTime, maxAge);
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

