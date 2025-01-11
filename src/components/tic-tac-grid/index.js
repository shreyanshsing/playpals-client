"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var styles_1 = require("./styles");
var TicTacGrid = function (_a) {
    var mark = _a.mark, gridSymbolAndColors = _a.gridSymbolAndColors;
    return (react_1.default.createElement(material_1.Container, null,
        react_1.default.createElement(material_1.Grid2, { container: true, spacing: 2, mt: 5, mb: 5 }, __spreadArray([], Array(9), true).map(function (_, index) { return (react_1.default.createElement(material_1.Grid2, { key: index, size: 4 },
            react_1.default.createElement(material_1.Box, { sx: (0, styles_1.gridSxProps)(gridSymbolAndColors[index].color), onClick: function () { return mark(index); } },
                react_1.default.createElement(material_1.Typography, { variant: "h2", sx: { color: "black" } }, gridSymbolAndColors[index].symbol)))); }))));
};
exports.default = TicTacGrid;
