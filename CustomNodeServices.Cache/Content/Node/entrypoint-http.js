(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./TypeScript/HttpNodeInstanceEntryPoint.ts":
/*!**************************************************!*\
  !*** ./TypeScript/HttpNodeInstanceEntryPoint.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\n// Limit dependencies to core Node modules. This means the code in this file has to be very low-level and unattractive,\r\n// but simplifies things for the consumer of this module.\r\n__webpack_require__(/*! ./Util/PatchModuleResolutionLStat */ \"./TypeScript/Util/PatchModuleResolutionLStat.ts\");\r\n__webpack_require__(/*! ./Util/OverrideStdOutputs */ \"./TypeScript/Util/OverrideStdOutputs.ts\");\r\nvar http = __webpack_require__(/*! http */ \"http\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar ArgsUtil_1 = __webpack_require__(/*! ./Util/ArgsUtil */ \"./TypeScript/Util/ArgsUtil.ts\");\r\nvar ExitWhenParentExits_1 = __webpack_require__(/*! ./Util/ExitWhenParentExits */ \"./TypeScript/Util/ExitWhenParentExits.ts\");\r\nvar perf_hooks_1 = __webpack_require__(/*! perf_hooks */ \"perf_hooks\");\r\n// Webpack doesn't support dynamic requires for files not present at compile time, so grab a direct\r\n// reference to Node's runtime 'require' function.\r\nvar dynamicRequire = eval('require');\r\nvar scriptHolder = {};\r\nvar t0 = 0, t1 = 0;\r\nvar server = http.createServer(function (req, res) {\r\n    readRequestBodyAsJson(req, function (bodyJson) {\r\n        var hasSentResult = false;\r\n        var callback = function (errorValue, successValue) {\r\n            if (!hasSentResult) {\r\n                hasSentResult = true;\r\n                if (errorValue) {\r\n                    respondWithError(res, errorValue);\r\n                }\r\n                else if (typeof successValue !== 'string') {\r\n                    // Arbitrary object/number/etc - JSON-serialize it\r\n                    var successValueJson = void 0;\r\n                    try {\r\n                        successValueJson = JSON.stringify(successValue);\r\n                    }\r\n                    catch (ex) {\r\n                        // JSON serialization error - pass it back to .NET\r\n                        respondWithError(res, ex);\r\n                        return;\r\n                    }\r\n                    res.setHeader('Content-Type', 'application/json');\r\n                    res.end(successValueJson);\r\n                }\r\n                else {\r\n                    // String - can bypass JSON-serialization altogether\r\n                    t1 = perf_hooks_1.performance.now();\r\n                    respondWithError(res, new Error('took ' + (t1 - t0) + ' ms'));\r\n                    res.setHeader('Content-Type', 'text/plain');\r\n                    res.end(successValue);\r\n                }\r\n            }\r\n        };\r\n        // Support streamed responses\r\n        Object.defineProperty(callback, 'stream', {\r\n            enumerable: true,\r\n            get: function () {\r\n                if (!hasSentResult) {\r\n                    hasSentResult = true;\r\n                    res.setHeader('Content-Type', 'application/octet-stream');\r\n                }\r\n                return res;\r\n            }\r\n        });\r\n        try {\r\n            var func = undefined;\r\n            var cached = false;\r\n            //var t0 = performance.now();\r\n            if (scriptHolder[bodyJson.moduleName]) {\r\n                func = scriptHolder[bodyJson.moduleName];\r\n                cached = true;\r\n            }\r\n            else {\r\n                var resolvedPath = path.resolve(process.cwd(), bodyJson.moduleName);\r\n                var invokedModule = dynamicRequire(resolvedPath);\r\n                func = bodyJson.exportedFunctionName ? invokedModule[bodyJson.exportedFunctionName] : invokedModule;\r\n                scriptHolder[bodyJson.moduleName] = func;\r\n                cached = false;\r\n            }\r\n            //var t1 = performance.now();\r\n            //throw new Error('Cached: ' + cached + ' and took ' + (t1 - t0) + ' ms');\r\n            if (!func) {\r\n                throw new Error('The module \"' + bodyJson.moduleName + '\" has no export named \"' + bodyJson.exportedFunctionName + '\"');\r\n            }\r\n            //t0 = performance.now();\r\n            func.apply(null, [callback, cached].concat(bodyJson.args));\r\n        }\r\n        catch (synchronousException) {\r\n            callback(synchronousException, null);\r\n        }\r\n    });\r\n});\r\nvar parsedArgs = ArgsUtil_1.parseArgs(process.argv);\r\nvar requestedPortOrZero = parsedArgs.port || 0; // 0 means 'let the OS decide'\r\nserver.listen(requestedPortOrZero, 'localhost', function () {\r\n    var serverAddress = server.address();\r\n    // Signal to HttpNodeHost which loopback IP address (IPv4 or IPv6) and port it should make its HTTP connections on\r\n    console.log('[Microsoft.AspNetCore.NodeServices.HttpNodeHost:Listening on {' + serverAddress.address + '} port ' + serverAddress.port + '\\]');\r\n    // Signal to the NodeServices base class that we're ready to accept invocations\r\n    console.log('[Microsoft.AspNetCore.NodeServices:Listening]');\r\n});\r\nExitWhenParentExits_1.exitWhenParentExits(parseInt(parsedArgs.parentPid), /* ignoreSigint */ true);\r\nfunction readRequestBodyAsJson(request, callback) {\r\n    var requestBodyAsString = '';\r\n    request.on('data', function (chunk) { requestBodyAsString += chunk; });\r\n    request.on('end', function () {\r\n        t0 = perf_hooks_1.performance.now();\r\n        callback(JSON.parse(requestBodyAsString));\r\n    });\r\n}\r\nfunction respondWithError(res, errorValue) {\r\n    res.statusCode = 500;\r\n    res.end(JSON.stringify({\r\n        errorMessage: errorValue.message || errorValue,\r\n        errorDetails: errorValue.stack || null\r\n    }));\r\n}\r\n\n\n//# sourceURL=webpack:///./TypeScript/HttpNodeInstanceEntryPoint.ts?");

/***/ }),

/***/ "./TypeScript/Util/ArgsUtil.ts":
/*!*************************************!*\
  !*** ./TypeScript/Util/ArgsUtil.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\nfunction parseArgs(args) {\r\n    // Very simplistic parsing which is sufficient for the cases needed. We don't want to bring in any external\r\n    // dependencies (such as an args-parsing library) to this file.\r\n    var result = {};\r\n    var currentKey = null;\r\n    args.forEach(function (arg) {\r\n        if (arg.indexOf('--') === 0) {\r\n            var argName = arg.substring(2);\r\n            result[argName] = undefined;\r\n            currentKey = argName;\r\n        }\r\n        else if (currentKey) {\r\n            result[currentKey] = arg;\r\n            currentKey = null;\r\n        }\r\n    });\r\n    return result;\r\n}\r\nexports.parseArgs = parseArgs;\r\n\n\n//# sourceURL=webpack:///./TypeScript/Util/ArgsUtil.ts?");

/***/ }),

/***/ "./TypeScript/Util/ExitWhenParentExits.ts":
/*!************************************************!*\
  !*** ./TypeScript/Util/ExitWhenParentExits.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/*\r\nIn general, we want the Node child processes to be terminated as soon as the parent .NET processes exit,\r\nbecause we have no further use for them. If the .NET process shuts down gracefully, it will run its\r\nfinalizers, one of which (in OutOfProcessNodeInstance.cs) will kill its associated Node process immediately.\r\n\r\nBut if the .NET process is terminated forcefully (e.g., on Linux/OSX with 'kill -9'), then it won't have\r\nany opportunity to shut down its child processes, and by default they will keep running. In this case, it's\r\nup to the child process to detect this has happened and terminate itself.\r\n\r\nThere are many possible approaches to detecting when a parent process has exited, most of which behave\r\ndifferently between Windows and Linux/OS X:\r\n\r\n - On Windows, the parent process can mark its child as being a 'job' that should auto-terminate when\r\n   the parent does (http://stackoverflow.com/a/4657392). Not cross-platform.\r\n - The child Node process can get a callback when the parent disconnects (process.on('disconnect', ...)).\r\n   But despite http://stackoverflow.com/a/16487966, no callback fires in any case I've tested (Windows / OS X).\r\n - The child Node process can get a callback when its stdin/stdout are disconnected, as described at\r\n   http://stackoverflow.com/a/15693934. This works well on OS X, but calling stdout.resume() on Windows\r\n   causes the process to terminate prematurely.\r\n - I don't know why, but on Windows, it's enough to invoke process.stdin.resume(). For some reason this causes\r\n   the child Node process to exit as soon as the parent one does, but I don't see this documented anywhere.\r\n - You can poll to see if the parent process, or your stdin/stdout connection to it, is gone\r\n   - You can directly pass a parent process PID to the child, and then have the child poll to see if it's\r\n     still running (e.g., using process.kill(pid, 0), which doesn't kill it but just tests whether it exists,\r\n     as per https://nodejs.org/api/process.html#process_process_kill_pid_signal)\r\n   - Or, on each poll, you can try writing to process.stdout. If the parent has died, then this will throw.\r\n     However I don't see this documented anywhere. It would be nice if you could just poll for whether or not\r\n     process.stdout is still connected (without actually writing to it) but I haven't found any property whose\r\n     value changes until you actually try to write to it.\r\n\r\nOf these, the only cross-platform approach that is actually documented as a valid strategy is simply polling\r\nto check whether the parent PID is still running. So that's what we do here.\r\n*/\r\nexports.__esModule = true;\r\nvar pollIntervalMs = 1000;\r\nfunction exitWhenParentExits(parentPid, ignoreSigint) {\r\n    setInterval(function () {\r\n        if (!processExists(parentPid)) {\r\n            // Can't log anything at this point, because out stdout was connected to the parent,\r\n            // but the parent is gone.\r\n            process.exit();\r\n        }\r\n    }, pollIntervalMs);\r\n    if (ignoreSigint) {\r\n        // Pressing ctrl+c in the terminal sends a SIGINT to all processes in the foreground process tree.\r\n        // By default, the Node process would then exit before the .NET process, because ASP.NET implements\r\n        // a delayed shutdown to allow ongoing requests to complete.\r\n        //\r\n        // This is problematic, because if Node exits first, the CopyToAsync code in ConditionalProxyMiddleware\r\n        // will experience a read fault, and logs a huge load of errors. Fortunately, since the Node process is\r\n        // already set up to shut itself down if it detects the .NET process is terminated, all we have to do is\r\n        // ignore the SIGINT. The Node process will then terminate automatically after the .NET process does.\r\n        //\r\n        // A better solution would be to have WebpackDevMiddleware listen for SIGINT and gracefully close any\r\n        // ongoing EventSource connections before letting the Node process exit, independently of the .NET\r\n        // process exiting. However, doing this well in general is very nontrivial (see all the discussion at\r\n        // https://github.com/nodejs/node/issues/2642).\r\n        process.on('SIGINT', function () {\r\n            console.log('Received SIGINT. Waiting for .NET process to exit...');\r\n        });\r\n    }\r\n}\r\nexports.exitWhenParentExits = exitWhenParentExits;\r\nfunction processExists(pid) {\r\n    try {\r\n        // Sending signal 0 - on all platforms - tests whether the process exists. As long as it doesn't\r\n        // throw, that means it does exist.\r\n        process.kill(pid, 0);\r\n        return true;\r\n    }\r\n    catch (ex) {\r\n        // If the reason for the error is that we don't have permission to ask about this process,\r\n        // report that as a separate problem.\r\n        if (ex.code === 'EPERM') {\r\n            throw new Error(\"Attempted to check whether process \" + pid + \" was running, but got a permissions error.\");\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./TypeScript/Util/ExitWhenParentExits.ts?");

/***/ }),

/***/ "./TypeScript/Util/OverrideStdOutputs.ts":
/*!***********************************************!*\
  !*** ./TypeScript/Util/OverrideStdOutputs.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// When Node writes to stdout/strerr, we capture that and convert the lines into calls on the\r\n// active .NET ILogger. But by default, stdout/stderr don't have any way of distinguishing\r\n// linebreaks inside log messages from the linebreaks that delimit separate log messages,\r\n// so multiline strings will end up being written to the ILogger as multiple independent\r\n// log messages. This makes them very hard to make sense of, especially when they represent\r\n// something like stack traces.\r\n//\r\n// To fix this, we intercept stdout/stderr writes, and replace internal linebreaks with a\r\n// marker token. When .NET receives the lines, it converts the marker tokens back to regular\r\n// linebreaks within the logged messages.\r\n//\r\n// Note that it's better to do the interception at the stdout/stderr level, rather than at\r\n// the console.log/console.error (etc.) level, because this takes place after any native\r\n// message formatting has taken place (e.g., inserting values for % placeholders).\r\nvar findInternalNewlinesRegex = /\\n(?!$)/g;\r\nvar encodedNewline = '__ns_newline__';\r\nencodeNewlinesWrittenToStream(process.stdout);\r\nencodeNewlinesWrittenToStream(process.stderr);\r\nfunction encodeNewlinesWrittenToStream(outputStream) {\r\n    var origWriteFunction = outputStream.write;\r\n    outputStream.write = function (value) {\r\n        // Only interfere with the write if it's definitely a string\r\n        if (typeof value === 'string') {\r\n            var argsClone = Array.prototype.slice.call(arguments, 0);\r\n            argsClone[0] = encodeNewlinesInString(value);\r\n            origWriteFunction.apply(this, argsClone);\r\n        }\r\n        else {\r\n            origWriteFunction.apply(this, arguments);\r\n        }\r\n    };\r\n}\r\nfunction encodeNewlinesInString(str) {\r\n    return str.replace(findInternalNewlinesRegex, encodedNewline);\r\n}\r\n\n\n//# sourceURL=webpack:///./TypeScript/Util/OverrideStdOutputs.ts?");

/***/ }),

/***/ "./TypeScript/Util/PatchModuleResolutionLStat.ts":
/*!*******************************************************!*\
  !*** ./TypeScript/Util/PatchModuleResolutionLStat.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar startsWith = function (str, prefix) { return str.substring(0, prefix.length) === prefix; };\r\nvar appRootDir = process.cwd();\r\nfunction patchedLStat(pathToStatLong, fsReqWrap) {\r\n    try {\r\n        // If the lstat completes without errors, we don't modify its behavior at all\r\n        return origLStat.apply(this, arguments);\r\n    }\r\n    catch (ex) {\r\n        var shouldOverrideError = startsWith(ex.message, 'EPERM') // It's a permissions error\r\n            && typeof appRootDirLong === 'string'\r\n            && startsWith(appRootDirLong, pathToStatLong) // ... for an ancestor directory\r\n            && ex.stack.indexOf('Object.realpathSync ') >= 0; // ... during symlink resolution\r\n        if (shouldOverrideError) {\r\n            // Fake the result to give the same result as an 'lstat' on the app root dir.\r\n            // This stops Node failing to load modules just because it doesn't know whether\r\n            // ancestor directories are symlinks or not. If there's a genuine file\r\n            // permissions issue, it will still surface later when Node actually\r\n            // tries to read the file.\r\n            return origLStat.call(this, appRootDir, fsReqWrap);\r\n        }\r\n        else {\r\n            // In any other case, preserve the original error\r\n            throw ex;\r\n        }\r\n    }\r\n}\r\n;\r\n// It's only necessary to apply this workaround on Windows\r\nvar appRootDirLong = null;\r\nvar origLStat = null;\r\nif (/^win/.test(process.platform)) {\r\n    try {\r\n        // Get the app's root dir in Node's internal \"long\" format (e.g., \\\\?\\C:\\dir\\subdir)\r\n        appRootDirLong = path._makeLong(appRootDir);\r\n        // Actually apply the patch, being as defensive as possible\r\n        var bindingFs = process.binding('fs');\r\n        origLStat = bindingFs.lstat;\r\n        if (typeof origLStat === 'function') {\r\n            bindingFs.lstat = patchedLStat;\r\n        }\r\n    }\r\n    catch (ex) {\r\n        // If some future version of Node throws (e.g., to prevent use of process.binding()),\r\n        // don't apply the patch, but still let the application run.\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./TypeScript/Util/PatchModuleResolutionLStat.ts?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./TypeScript/HttpNodeInstanceEntryPoint ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./TypeScript/HttpNodeInstanceEntryPoint */\"./TypeScript/HttpNodeInstanceEntryPoint.ts\");\n\n\n//# sourceURL=webpack:///multi_./TypeScript/HttpNodeInstanceEntryPoint?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"perf_hooks\");\n\n//# sourceURL=webpack:///external_%22perf_hooks%22?");

/***/ })

/******/ })));