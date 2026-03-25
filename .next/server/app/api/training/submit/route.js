"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/training/submit/route";
exports.ids = ["app/api/training/submit/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftraining%2Fsubmit%2Froute&page=%2Fapi%2Ftraining%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftraining%2Fsubmit%2Froute.ts&appDir=F%3A%5CChinaq%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CChinaq&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftraining%2Fsubmit%2Froute&page=%2Fapi%2Ftraining%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftraining%2Fsubmit%2Froute.ts&appDir=F%3A%5CChinaq%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CChinaq&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_Chinaq_app_api_training_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/training/submit/route.ts */ \"(rsc)/./app/api/training/submit/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/training/submit/route\",\n        pathname: \"/api/training/submit\",\n        filename: \"route\",\n        bundlePath: \"app/api/training/submit/route\"\n    },\n    resolvedPagePath: \"F:\\\\Chinaq\\\\app\\\\api\\\\training\\\\submit\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_Chinaq_app_api_training_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/training/submit/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ0cmFpbmluZyUyRnN1Ym1pdCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdHJhaW5pbmclMkZzdWJtaXQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0cmFpbmluZyUyRnN1Ym1pdCUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDQ2hpbmFxJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1GJTNBJTVDQ2hpbmFxJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNBO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHNrLWxlYXJuaW5nLz8wYWY3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkY6XFxcXENoaW5hcVxcXFxhcHBcXFxcYXBpXFxcXHRyYWluaW5nXFxcXHN1Ym1pdFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdHJhaW5pbmcvc3VibWl0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdHJhaW5pbmcvc3VibWl0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS90cmFpbmluZy9zdWJtaXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJGOlxcXFxDaGluYXFcXFxcYXBwXFxcXGFwaVxcXFx0cmFpbmluZ1xcXFxzdWJtaXRcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3RyYWluaW5nL3N1Ym1pdC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftraining%2Fsubmit%2Froute&page=%2Fapi%2Ftraining%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftraining%2Fsubmit%2Froute.ts&appDir=F%3A%5CChinaq%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CChinaq&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/training/submit/route.ts":
/*!******************************************!*\
  !*** ./app/api/training/submit/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function POST(request) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const userId = session.user.id;\n    try {\n        const body = await request.json();\n        const { questionId, answer, sessionType } = body;\n        if (!questionId || answer === undefined) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Missing questionId or answer\"\n            }, {\n                status: 400\n            });\n        }\n        const question = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.question.findUnique({\n            where: {\n                id: questionId\n            }\n        });\n        if (!question) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Question not found\"\n            }, {\n                status: 404\n            });\n        }\n        const isCorrect = answer.trim() === question.correctAnswer.trim();\n        // Create ErrorRecord if wrong\n        if (!isCorrect) {\n            const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.errorRecord.findFirst({\n                where: {\n                    userId,\n                    questionId,\n                    sourceType: \"training\"\n                }\n            });\n            if (!existing) {\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.errorRecord.create({\n                    data: {\n                        userId,\n                        sourceType: \"training\",\n                        questionId\n                    }\n                });\n            }\n        }\n        // Record DailyStats\n        const today = new Date();\n        today.setHours(0, 0, 0, 0);\n        const statsUpdate = {\n            questionsAnswered: {\n                increment: 1\n            }\n        };\n        if (isCorrect) {\n            statsUpdate.correctAnswers = {\n                increment: 1\n            };\n            statsUpdate.xpEarned = {\n                increment: 5\n            };\n        }\n        // Increment session-type-specific minutes\n        if (sessionType === \"listening\") {\n            statsUpdate.listeningMins = {\n                increment: 0\n            };\n        } else if (sessionType === \"reading\") {\n            statsUpdate.readingMins = {\n                increment: 0\n            };\n        } else if (sessionType === \"writing\") {\n            statsUpdate.writingMins = {\n                increment: 0\n            };\n        }\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.dailyStats.upsert({\n            where: {\n                userId_date: {\n                    userId,\n                    date: today\n                }\n            },\n            create: {\n                userId,\n                date: today,\n                questionsAnswered: 1,\n                correctAnswers: isCorrect ? 1 : 0,\n                xpEarned: isCorrect ? 5 : 0\n            },\n            update: statsUpdate\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            correct: isCorrect,\n            correctAnswer: question.correctAnswer,\n            explanation: question.explanation ?? \"\"\n        });\n    } catch (error) {\n        console.error(\"Training submit error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to submit answer\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVNLLGFBQWE7WUFDckN3QixhQUFhN0IsU0FBUzZCLFdBQVcsSUFBSTtRQUN2QztJQUNGLEVBQUUsT0FBT3ZDLE9BQU87UUFDZHdDLFFBQVF4QyxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPUixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMEIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDL0U7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hzay1sZWFybmluZy8uL2FwcC9hcGkvdHJhaW5pbmcvc3VibWl0L3JvdXRlLnRzPzY3N2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gIGlmICghc2Vzc2lvbikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXG4gIH1cblxuICBjb25zdCB1c2VySWQgPSAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWRcblxuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIGNvbnN0IHsgcXVlc3Rpb25JZCwgYW5zd2VyLCBzZXNzaW9uVHlwZSB9ID0gYm9keSBhcyB7XG4gICAgICBxdWVzdGlvbklkOiBzdHJpbmdcbiAgICAgIGFuc3dlcjogc3RyaW5nXG4gICAgICBzZXNzaW9uVHlwZTogc3RyaW5nXG4gICAgfVxuXG4gICAgaWYgKCFxdWVzdGlvbklkIHx8IGFuc3dlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcXVlc3Rpb25JZCBvciBhbnN3ZXInIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IHByaXNtYS5xdWVzdGlvbi5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSB9KVxuICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnUXVlc3Rpb24gbm90IGZvdW5kJyB9LCB7IHN0YXR1czogNDA0IH0pXG4gICAgfVxuXG4gICAgY29uc3QgaXNDb3JyZWN0ID0gYW5zd2VyLnRyaW0oKSA9PT0gcXVlc3Rpb24uY29ycmVjdEFuc3dlci50cmltKClcblxuICAgIC8vIENyZWF0ZSBFcnJvclJlY29yZCBpZiB3cm9uZ1xuICAgIGlmICghaXNDb3JyZWN0KSB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5lcnJvclJlY29yZC5maW5kRmlyc3Qoe1xuICAgICAgICB3aGVyZTogeyB1c2VySWQsIHF1ZXN0aW9uSWQsIHNvdXJjZVR5cGU6ICd0cmFpbmluZycgfSxcbiAgICAgIH0pXG4gICAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5lcnJvclJlY29yZC5jcmVhdGUoe1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6ICd0cmFpbmluZycsXG4gICAgICAgICAgICBxdWVzdGlvbklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVjb3JkIERhaWx5U3RhdHNcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKVxuXG4gICAgY29uc3Qgc3RhdHNVcGRhdGU6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgICAgcXVlc3Rpb25zQW5zd2VyZWQ6IHsgaW5jcmVtZW50OiAxIH0sXG4gICAgfVxuICAgIGlmIChpc0NvcnJlY3QpIHtcbiAgICAgIHN0YXRzVXBkYXRlLmNvcnJlY3RBbnN3ZXJzID0geyBpbmNyZW1lbnQ6IDEgfVxuICAgICAgc3RhdHNVcGRhdGUueHBFYXJuZWQgPSB7IGluY3JlbWVudDogNSB9XG4gICAgfVxuXG4gICAgLy8gSW5jcmVtZW50IHNlc3Npb24tdHlwZS1zcGVjaWZpYyBtaW51dGVzXG4gICAgaWYgKHNlc3Npb25UeXBlID09PSAnbGlzdGVuaW5nJykge1xuICAgICAgc3RhdHNVcGRhdGUubGlzdGVuaW5nTWlucyA9IHsgaW5jcmVtZW50OiAwIH1cbiAgICB9IGVsc2UgaWYgKHNlc3Npb25UeXBlID09PSAncmVhZGluZycpIHtcbiAgICAgIHN0YXRzVXBkYXRlLnJlYWRpbmdNaW5zID0geyBpbmNyZW1lbnQ6IDAgfVxuICAgIH0gZWxzZSBpZiAoc2Vzc2lvblR5cGUgPT09ICd3cml0aW5nJykge1xuICAgICAgc3RhdHNVcGRhdGUud3JpdGluZ01pbnMgPSB7IGluY3JlbWVudDogMCB9XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLmRhaWx5U3RhdHMudXBzZXJ0KHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZF9kYXRlOiB7IHVzZXJJZCwgZGF0ZTogdG9kYXkgfSB9LFxuICAgICAgY3JlYXRlOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgZGF0ZTogdG9kYXksXG4gICAgICAgIHF1ZXN0aW9uc0Fuc3dlcmVkOiAxLFxuICAgICAgICBjb3JyZWN0QW5zd2VyczogaXNDb3JyZWN0ID8gMSA6IDAsXG4gICAgICAgIHhwRWFybmVkOiBpc0NvcnJlY3QgPyA1IDogMCxcbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IHN0YXRzVXBkYXRlLFxuICAgIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgY29ycmVjdDogaXNDb3JyZWN0LFxuICAgICAgY29ycmVjdEFuc3dlcjogcXVlc3Rpb24uY29ycmVjdEFuc3dlcixcbiAgICAgIGV4cGxhbmF0aW9uOiBxdWVzdGlvbi5leHBsYW5hdGlvbiA/PyAnJyxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RyYWluaW5nIHN1Ym1pdCBlcnJvcjonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBzdWJtaXQgYW5zd2VyJyB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJQT1NUIiwicmVxdWVzdCIsInNlc3Npb24iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ1c2VySWQiLCJ1c2VyIiwiaWQiLCJib2R5IiwicXVlc3Rpb25JZCIsImFuc3dlciIsInNlc3Npb25UeXBlIiwidW5kZWZpbmVkIiwicXVlc3Rpb24iLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc0NvcnJlY3QiLCJ0cmltIiwiY29ycmVjdEFuc3dlciIsImV4aXN0aW5nIiwiZXJyb3JSZWNvcmQiLCJmaW5kRmlyc3QiLCJzb3VyY2VUeXBlIiwiY3JlYXRlIiwiZGF0YSIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwic3RhdHNVcGRhdGUiLCJxdWVzdGlvbnNBbnN3ZXJlZCIsImluY3JlbWVudCIsImNvcnJlY3RBbnN3ZXJzIiwieHBFYXJuZWQiLCJsaXN0ZW5pbmdNaW5zIiwicmVhZGluZ01pbnMiLCJ3cml0aW5nTWlucyIsImRhaWx5U3RhdHMiLCJ1cHNlcnQiLCJ1c2VySWRfZGF0ZSIsImRhdGUiLCJ1cGRhdGUiLCJjb3JyZWN0IiwiZXhwbGFuYXRpb24iLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/training/submit/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                if (!isValid) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFxRDtBQUNZO0FBQ3BDO0FBQ1E7QUFFOUIsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVUsT0FBTztnQkFFMUQsTUFBTUUsT0FBTyxNQUFNViwrQ0FBTUEsQ0FBQ1UsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNLLE1BQU0sT0FBTztnQkFFbEIsTUFBTUcsVUFBVSxNQUFNZCx1REFBYyxDQUFDSyxZQUFZSSxRQUFRLEVBQUVFLEtBQUtLLFlBQVk7Z0JBQzVFLElBQUksQ0FBQ0YsU0FBUyxPQUFPO2dCQUVyQixPQUFPO29CQUNMRyxJQUFJTixLQUFLTSxFQUFFO29CQUNYWCxPQUFPSyxLQUFLTCxLQUFLO29CQUNqQkYsTUFBTU8sS0FBS1AsSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDRGMsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlcsTUFBTUwsRUFBRSxHQUFHTixLQUFLTSxFQUFFO1lBQ3BCO1lBQ0EsT0FBT0s7UUFDVDtRQUNBLE1BQU1KLFNBQVEsRUFBRUEsT0FBTyxFQUFFSSxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsU0FBU0osUUFBUVAsSUFBSSxFQUFFO2dCQUN6Qk8sUUFBUVAsSUFBSSxDQUFDTSxFQUFFLEdBQUdLLE1BQU1MLEVBQUU7WUFDNUI7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7SUFDQUssT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUM7QUFFRCxpRUFBZTlCLGdEQUFRQSxDQUFDSSxZQUFZQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHNrLWxlYXJuaW5nLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaClcbiAgICAgICAgaWYgKCFpc1ZhbGlkKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbiAmJiBzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1ZhbGlkIiwiY29tcGFyZSIsInBhc3N3b3JkSGFzaCIsImlkIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0osZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHNrLWxlYXJuaW5nLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/P1xuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6IFsncXVlcnknXSxcbiAgfSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftraining%2Fsubmit%2Froute&page=%2Fapi%2Ftraining%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftraining%2Fsubmit%2Froute.ts&appDir=F%3A%5CChinaq%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CChinaq&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();