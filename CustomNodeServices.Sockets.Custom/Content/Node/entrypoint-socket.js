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

/***/ "./TypeScript/SocketNodeInstanceEntryPoint.ts":
/*!****************************************************!*\
  !*** ./TypeScript/SocketNodeInstanceEntryPoint.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\n// Limit dependencies to core Node modules. This means the code in this file has to be very low-level and unattractive,\r\n// but simplifies things for the consumer of this module.\r\n__webpack_require__(/*! ./Util/OverrideStdOutputs */ \"./TypeScript/Util/OverrideStdOutputs.ts\");\r\nvar net = __webpack_require__(/*! net */ \"net\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar readline = __webpack_require__(/*! readline */ \"readline\");\r\nvar ArgsUtil_1 = __webpack_require__(/*! ./Util/ArgsUtil */ \"./TypeScript/Util/ArgsUtil.ts\");\r\nvar ExitWhenParentExits_1 = __webpack_require__(/*! ./Util/ExitWhenParentExits */ \"./TypeScript/Util/ExitWhenParentExits.ts\");\r\nvar virtualConnectionServer = __webpack_require__(/*! ./VirtualConnections/VirtualConnectionServer */ \"./TypeScript/VirtualConnections/VirtualConnectionServer.ts\");\r\n// Webpack doesn't support dynamic requires for files not present at compile time, so grab a direct\r\n// reference to Node's runtime 'require' function.\r\nvar dynamicRequire = eval('require');\r\nvar scriptHolder = {};\r\n// Signal to the .NET side when we're ready to accept invocations\r\nvar server = net.createServer().on('listening', function () {\r\n    console.log('[Microsoft.AspNetCore.NodeServices:Listening]');\r\n});\r\n// Each virtual connection represents a separate invocation\r\nvirtualConnectionServer.createInterface(server).on('connection', function (connection) {\r\n    readline.createInterface(connection, null).on('line', function (line) {\r\n        try {\r\n            var invocation = JSON.parse(line);\r\n            var invokedFunction = undefined;\r\n            if (scriptHolder[invocation.moduleName]) {\r\n                invokedFunction = scriptHolder[invocation.moduleName];\r\n            }\r\n            else {\r\n                var resolvedPath = path.resolve(process.cwd(), invocation.moduleName);\r\n                var invokedModule = dynamicRequire(resolvedPath);\r\n                invokedFunction = invocation.exportedFunctionName ? invokedModule[invocation.exportedFunctionName] : invokedModule;\r\n                scriptHolder[invocation.moduleName] = invokedFunction;\r\n            }\r\n            // Get a reference to the function to invoke\r\n            //const invocation = JSON.parse(line) as RpcInvocation;\r\n            //const invokedModule = dynamicRequire(path.resolve(process.cwd(), invocation.moduleName));\r\n            //const invokedFunction = invocation.exportedFunctionName ? invokedModule[invocation.exportedFunctionName] : invokedModule;\r\n            if (!invokedFunction) {\r\n                throw new Error('The module \"' + invocation.moduleName + '\" has no export named \"' + invocation.exportedFunctionName + '\"');\r\n            }\r\n            // Prepare a callback for accepting non-streamed JSON responses\r\n            var hasInvokedCallback_1 = false;\r\n            var invocationCallback = function (errorValue, successValue) {\r\n                if (hasInvokedCallback_1) {\r\n                    throw new Error('Cannot supply more than one result. The callback has already been invoked,'\r\n                        + ' or the result stream has already been accessed');\r\n                }\r\n                hasInvokedCallback_1 = true;\r\n                connection.end(JSON.stringify({\r\n                    result: successValue,\r\n                    errorMessage: errorValue && (errorValue.message || errorValue),\r\n                    errorDetails: errorValue && (errorValue.stack || null)\r\n                }));\r\n            };\r\n            // Also support streamed binary responses\r\n            Object.defineProperty(invocationCallback, 'stream', {\r\n                enumerable: true,\r\n                get: function () {\r\n                    hasInvokedCallback_1 = true;\r\n                    return connection;\r\n                }\r\n            });\r\n            // Actually invoke it, passing through any supplied args\r\n            invokedFunction.apply(null, [invocationCallback].concat(invocation.args));\r\n        }\r\n        catch (ex) {\r\n            connection.end(JSON.stringify({\r\n                errorMessage: ex.message,\r\n                errorDetails: ex.stack\r\n            }));\r\n        }\r\n    });\r\n});\r\n// Begin listening now. The underlying transport varies according to the runtime platform.\r\n// On Windows it's Named Pipes; on Linux/OSX it's Domain Sockets.\r\nvar useWindowsNamedPipes = /^win/.test(process.platform);\r\nvar parsedArgs = ArgsUtil_1.parseArgs(process.argv);\r\nvar listenAddress = (useWindowsNamedPipes ? '\\\\\\\\.\\\\pipe\\\\' : '/tmp/') + parsedArgs.listenAddress;\r\nserver.listen(listenAddress);\r\nExitWhenParentExits_1.exitWhenParentExits(parseInt(parsedArgs.parentPid), /* ignoreSigint */ true);\r\n\n\n//# sourceURL=webpack:///./TypeScript/SocketNodeInstanceEntryPoint.ts?");

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

/***/ "./TypeScript/VirtualConnections/VirtualConnection.ts":
/*!************************************************************!*\
  !*** ./TypeScript/VirtualConnections/VirtualConnection.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    }\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nexports.__esModule = true;\r\nvar stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\n/**\r\n * Represents a virtual connection. Multiple virtual connections may be multiplexed over a single physical socket connection.\r\n */\r\nvar VirtualConnection = /** @class */ (function (_super) {\r\n    __extends(VirtualConnection, _super);\r\n    function VirtualConnection(_beginWriteCallback) {\r\n        var _this = _super.call(this) || this;\r\n        _this._beginWriteCallback = _beginWriteCallback;\r\n        _this._flowing = false;\r\n        _this._receivedDataQueue = [];\r\n        return _this;\r\n    }\r\n    VirtualConnection.prototype._read = function () {\r\n        this._flowing = true;\r\n        // Keep pushing data until we run out, or the underlying framework asks us to stop.\r\n        // When we finish, the 'flowing' state is detemined by whether more data is still being requested.\r\n        while (this._flowing && this._receivedDataQueue.length > 0) {\r\n            var nextChunk = this._receivedDataQueue.shift();\r\n            this._flowing = this.push(nextChunk);\r\n        }\r\n    };\r\n    VirtualConnection.prototype._write = function (chunk, encodingIfString, callback) {\r\n        if (typeof chunk === 'string') {\r\n            chunk = new Buffer(chunk, encodingIfString);\r\n        }\r\n        this._beginWriteCallback(chunk, callback);\r\n    };\r\n    VirtualConnection.prototype.onReceivedData = function (dataOrNullToSignalEOF) {\r\n        if (this._flowing) {\r\n            this._flowing = this.push(dataOrNullToSignalEOF);\r\n        }\r\n        else {\r\n            this._receivedDataQueue.push(dataOrNullToSignalEOF);\r\n        }\r\n    };\r\n    return VirtualConnection;\r\n}(stream_1.Duplex));\r\nexports.VirtualConnection = VirtualConnection;\r\n\n\n//# sourceURL=webpack:///./TypeScript/VirtualConnections/VirtualConnection.ts?");

/***/ }),

/***/ "./TypeScript/VirtualConnections/VirtualConnectionServer.ts":
/*!******************************************************************!*\
  !*** ./TypeScript/VirtualConnections/VirtualConnectionServer.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\nvar events_1 = __webpack_require__(/*! events */ \"events\");\r\nvar VirtualConnection_1 = __webpack_require__(/*! ./VirtualConnection */ \"./TypeScript/VirtualConnections/VirtualConnection.ts\");\r\n// Keep this in sync with the equivalent constant in the .NET code. Both sides split up their transmissions into frames with this max length,\r\n// and both will reject longer frames.\r\nvar MaxFrameBodyLength = 16 * 1024;\r\n/**\r\n * Accepts connections to a net.Server and adapts them to behave as multiplexed connections. That is, for each physical socket connection,\r\n * we track a list of 'virtual connections' whose API is a Duplex stream. The remote clients may open and close as many virtual connections\r\n * as they wish, reading and writing to them independently, without the overhead of establishing new physical connections each time.\r\n */\r\nfunction createInterface(server) {\r\n    var emitter = new events_1.EventEmitter();\r\n    server.on('connection', function (socket) {\r\n        // For each physical socket connection, maintain a set of virtual connections. Issue a notification whenever\r\n        // a new virtual connections is opened.\r\n        var childSockets = new VirtualConnectionsCollection(socket, function (virtualConnection) {\r\n            emitter.emit('connection', virtualConnection);\r\n        });\r\n    });\r\n    return emitter;\r\n}\r\nexports.createInterface = createInterface;\r\n/**\r\n * Tracks the 'virtual connections' associated with a single physical socket connection.\r\n */\r\nvar VirtualConnectionsCollection = /** @class */ (function () {\r\n    function VirtualConnectionsCollection(_socket, _onVirtualConnectionCallback) {\r\n        var _this = this;\r\n        this._socket = _socket;\r\n        this._onVirtualConnectionCallback = _onVirtualConnectionCallback;\r\n        this._currentFrameHeader = null;\r\n        this._virtualConnections = {};\r\n        // If the remote end closes the physical socket, treat all the virtual connections as being closed remotely too\r\n        this._socket.on('close', function () {\r\n            Object.getOwnPropertyNames(_this._virtualConnections).forEach(function (id) {\r\n                // A 'null' frame signals that the connection was closed remotely\r\n                _this._virtualConnections[id].onReceivedData(null);\r\n            });\r\n        });\r\n        this._socket.on('readable', this._onIncomingDataAvailable.bind(this));\r\n    }\r\n    /**\r\n     * This is called whenever the underlying socket signals that it may have some data available to read. It will synchronously read as many\r\n     * message frames as it can from the underlying socket, opens virtual connections as needed, and dispatches data to them.\r\n     */\r\n    VirtualConnectionsCollection.prototype._onIncomingDataAvailable = function () {\r\n        var exhaustedAllData = false;\r\n        while (!exhaustedAllData) {\r\n            // We might already have a pending frame header from the previous time this method ran, but if not, that's the next thing we need to read\r\n            if (this._currentFrameHeader === null) {\r\n                this._currentFrameHeader = this._readNextFrameHeader();\r\n            }\r\n            if (this._currentFrameHeader === null) {\r\n                // There's not enough data to fill a frameheader, so wait until more arrives later\r\n                // The next attempt to read from the socket will start from the same place this one did (incomplete reads don't consume any data)\r\n                exhaustedAllData = true;\r\n            }\r\n            else {\r\n                var frameBodyLength = this._currentFrameHeader.bodyLength;\r\n                var frameBodyOrNull = frameBodyLength > 0 ? this._socket.read(this._currentFrameHeader.bodyLength) : null;\r\n                if (frameBodyOrNull !== null || frameBodyLength === 0) {\r\n                    // We have a complete frame header+body pair, so we can now dispatch this to a virtual connection. We set _currentFrameHeader back to null\r\n                    // so that the next thing we try to read is the next frame header.\r\n                    var headerCopy = this._currentFrameHeader;\r\n                    this._currentFrameHeader = null;\r\n                    this._onReceivedCompleteFrame(headerCopy, frameBodyOrNull);\r\n                }\r\n                else {\r\n                    // There's not enough data to fill the pending frame body, so wait until more arrives later\r\n                    // The next attempt to read from the socket will start from the same place this one did (incomplete reads don't consume any data)\r\n                    exhaustedAllData = true;\r\n                }\r\n            }\r\n        }\r\n    };\r\n    VirtualConnectionsCollection.prototype._onReceivedCompleteFrame = function (header, bodyIfNotEmpty) {\r\n        // An incoming zero-length frame signals that there's no more data to read.\r\n        // Signal this to the Node stream APIs by pushing a 'null' chunk to it.\r\n        var virtualConnection = this._getOrOpenVirtualConnection(header);\r\n        virtualConnection.onReceivedData(header.bodyLength > 0 ? bodyIfNotEmpty : null);\r\n    };\r\n    VirtualConnectionsCollection.prototype._getOrOpenVirtualConnection = function (header) {\r\n        if (this._virtualConnections.hasOwnProperty(header.connectionIdString)) {\r\n            // It's an existing virtual connection\r\n            return this._virtualConnections[header.connectionIdString];\r\n        }\r\n        else {\r\n            // It's a new one\r\n            return this._openVirtualConnection(header);\r\n        }\r\n    };\r\n    VirtualConnectionsCollection.prototype._openVirtualConnection = function (header) {\r\n        var _this = this;\r\n        var beginWriteCallback = function (data, writeCompletedCallback) {\r\n            // Only send nonempty frames, since empty ones are a signal to close the virtual connection\r\n            if (data.length > 0) {\r\n                _this._sendFrame(header.connectionIdBinary, data, writeCompletedCallback);\r\n            }\r\n        };\r\n        var newVirtualConnection = new VirtualConnection_1.VirtualConnection(beginWriteCallback);\r\n        newVirtualConnection.on('end', function () {\r\n            // The virtual connection was closed remotely. Clean up locally.\r\n            _this._onVirtualConnectionWasClosed(header.connectionIdString);\r\n        });\r\n        newVirtualConnection.on('finish', function () {\r\n            // The virtual connection was closed locally. Clean up locally, and notify the remote that we're done.\r\n            _this._onVirtualConnectionWasClosed(header.connectionIdString);\r\n            _this._sendFrame(header.connectionIdBinary, new Buffer(0));\r\n        });\r\n        this._virtualConnections[header.connectionIdString] = newVirtualConnection;\r\n        this._onVirtualConnectionCallback(newVirtualConnection);\r\n        return newVirtualConnection;\r\n    };\r\n    /**\r\n     * Attempts to read a complete frame header, synchronously, from the underlying socket.\r\n     * If not enough data is available synchronously, returns null without consuming any data from the socket.\r\n     */\r\n    VirtualConnectionsCollection.prototype._readNextFrameHeader = function () {\r\n        var headerBuf = this._socket.read(12);\r\n        if (headerBuf !== null) {\r\n            // We have enough data synchronously\r\n            var connectionIdBinary = headerBuf.slice(0, 8);\r\n            var connectionIdString = connectionIdBinary.toString('hex');\r\n            var bodyLength = headerBuf.readInt32LE(8);\r\n            if (bodyLength < 0 || bodyLength > MaxFrameBodyLength) {\r\n                // Throwing here is going to bring down the whole process, so this cannot be allowed to happen in real use.\r\n                // But it won't happen in real use, because this is only used with our .NET client, which doesn't violate this rule.\r\n                throw new Error('Illegal frame body length: ' + bodyLength);\r\n            }\r\n            return { connectionIdBinary: connectionIdBinary, connectionIdString: connectionIdString, bodyLength: bodyLength };\r\n        }\r\n        else {\r\n            // Not enough bytes are available synchronously, so none were consumed\r\n            return null;\r\n        }\r\n    };\r\n    VirtualConnectionsCollection.prototype._sendFrame = function (connectionIdBinary, data, callback) {\r\n        // For all sends other than the last one, only invoke the callback if it failed.\r\n        // Also, only invoke the callback at most once.\r\n        var hasInvokedCallback = false;\r\n        var finalCallback = callback && (function (error) {\r\n            if (!hasInvokedCallback) {\r\n                hasInvokedCallback = true;\r\n                callback(error);\r\n            }\r\n        });\r\n        var notFinalCallback = callback && (function (error) {\r\n            if (error) {\r\n                finalCallback(error);\r\n            }\r\n        });\r\n        // The amount of data we're writing might exceed MaxFrameBodyLength, so split into frames as needed.\r\n        // Note that we always send at least one frame, even if it's empty (because that's the close-virtual-connection signal).\r\n        // If needed, this could be changed to send frames asynchronously, so that large sends could proceed in parallel\r\n        // (though that would involve making a clone of 'data', to avoid the risk of it being mutated during the send).\r\n        var bytesSent = 0;\r\n        do {\r\n            var nextFrameBodyLength = Math.min(MaxFrameBodyLength, data.length - bytesSent);\r\n            var isFinalChunk = (bytesSent + nextFrameBodyLength) === data.length;\r\n            this._socket.write(connectionIdBinary, notFinalCallback);\r\n            this._sendInt32LE(nextFrameBodyLength, notFinalCallback);\r\n            this._socket.write(data.slice(bytesSent, bytesSent + nextFrameBodyLength), isFinalChunk ? finalCallback : notFinalCallback);\r\n            bytesSent += nextFrameBodyLength;\r\n        } while (bytesSent < data.length);\r\n    };\r\n    /**\r\n     * Sends a number serialized in the correct format for .NET to receive as a System.Int32\r\n     */\r\n    VirtualConnectionsCollection.prototype._sendInt32LE = function (value, callback) {\r\n        var buf = new Buffer(4);\r\n        buf.writeInt32LE(value, 0);\r\n        this._socket.write(buf, callback);\r\n    };\r\n    VirtualConnectionsCollection.prototype._onVirtualConnectionWasClosed = function (id) {\r\n        if (this._virtualConnections.hasOwnProperty(id)) {\r\n            delete this._virtualConnections[id];\r\n        }\r\n    };\r\n    return VirtualConnectionsCollection;\r\n}());\r\n\n\n//# sourceURL=webpack:///./TypeScript/VirtualConnections/VirtualConnectionServer.ts?");

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./TypeScript/SocketNodeInstanceEntryPoint ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./TypeScript/SocketNodeInstanceEntryPoint */\"./TypeScript/SocketNodeInstanceEntryPoint.ts\");\n\n\n//# sourceURL=webpack:///multi_./TypeScript/SocketNodeInstanceEntryPoint?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline\");\n\n//# sourceURL=webpack:///external_%22readline%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ })

/******/ })));